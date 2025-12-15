// Sistema de Rastreamento Catirose - Wheaton Fretados
// Lógica principal da aplicação

// Configurações globais
const CONFIG = {
    MAPBOX_TOKEN: 'pk.eyJ1IjoibGVhbmRyb21vdXJhIiwiYSI6ImNtajZuZDF3aDJib2MzZXB2NmsyandsN24ifQ.LJl9lTtrPXNoUW-Ah-Va9A', // Token público do Mapbox (substituir por token próprio em produção)
    MAP_STYLE: 'mapbox://styles/mapbox/streets-v11',
    INITIAL_ZOOM: 13,
    UPDATE_INTERVAL: 5000, // 5 segundos
    WEBSOCKET_URL: 'wss://catirose-wheaton-socket.example.com', // URL do WebSocket real
    USE_MOCK_DATA: true, // Usar dados simulados enquanto WebSocket não está disponível
    PRIMARY_COLOR: '#0056A8',
    SECONDARY_COLOR: '#00A86B'
};

// Estado da aplicação
const AppState = {
    map: null,
    userLocation: null,
    userMarker: null,
    userAccuracyCircle: null,
    buses: {},
    busMarkers: {},
    busRoutes: {},
    nearestBus: null,
    selectedBus: null,
    isSidebarOpen: false,
    isOnline: true,
    connectionStatus: 'connecting',
    lastUpdate: null,
    activeTab: 'nearest',
    currentUserLocation: null,
    userLocationAccuracy: null
};

// Elementos do DOM
const DOM = {
    map: null,
    userLocationStatus: null,
    connectionStatus: null,
    lastUpdateTime: null,
    centerUserBtn: null,
    toggleSidebar: null,
    sidebar: null,
    closeSidebar: null,
    nearestBusCard: null,
    nearestBusInfo: null,
    nearestLoading: null,
    busSearch: null,
    lineFilter: null,
    busesList: null,
    scheduleLine: null,
    scheduleTable: null,
    itineraryList: null,
    busDetailsModal: null,
    closeModal: null,
    toastContainer: null
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    initializeDOMReferences();
    initializeMap();
    initializeUserLocation();
    initializeEventListeners();
    loadStaticData();
    initializeWebSocket();
    updateUI();
    
    // Atualização periódica
    setInterval(updateRealTimeData, CONFIG.UPDATE_INTERVAL);
});

// Inicializar referências do DOM
function initializeDOMReferences() {
    DOM.map = document.getElementById('map');
    DOM.userLocationStatus = document.getElementById('user-location-status').querySelector('.status-text');
    DOM.connectionStatus = document.getElementById('connection-status').querySelector('.status-text');
    DOM.lastUpdateTime = document.getElementById('update-time');
    DOM.centerUserBtn = document.getElementById('center-user-btn');
    DOM.toggleSidebar = document.getElementById('toggle-sidebar');
    DOM.sidebar = document.getElementById('sidebar');
    DOM.closeSidebar = document.getElementById('close-sidebar');
    DOM.nearestBusCard = document.querySelector('.nearest-bus-card');
    DOM.nearestBusInfo = document.getElementById('nearest-bus-info');
    DOM.nearestLoading = document.getElementById('nearest-loading');
    DOM.busSearch = document.getElementById('bus-search');
    DOM.lineFilter = document.getElementById('line-filter');
    DOM.busesList = document.getElementById('buses-list');
    DOM.scheduleLine = document.getElementById('schedule-line');
    DOM.scheduleTable = document.getElementById('schedule-table').querySelector('tbody');
    DOM.itineraryList = document.getElementById('itinerary-list');
    DOM.busDetailsModal = document.getElementById('bus-details-modal');
    DOM.closeModal = document.getElementById('close-modal');
    DOM.toastContainer = document.getElementById('toast-container');
}

// Inicializar mapa Mapbox
function initializeMap() {
    if (!mapboxgl.accessToken) {
        mapboxgl.accessToken = CONFIG.MAPBOX_TOKEN;
    }
    
    try {
        AppState.map = new mapboxgl.Map({
            container: 'map',
            style: CONFIG.MAP_STYLE,
            center: [-45.9085, -23.1945], // Centro de São José dos Campos
            zoom: CONFIG.INITIAL_ZOOM,
            attributionControl: false
        });
        
        // Adicionar controles de navegação
        AppState.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Adicionar atribuição
        AppState.map.addControl(new mapboxgl.AttributionControl({
            compact: true
        }));
        
        // Quando o mapa carregar
        AppState.map.on('load', () => {
            showToast('Mapa carregado com sucesso!', 'success');
            updateMapMarkers();
        });
        
    } catch (error) {
        console.error('Erro ao carregar mapa:', error);
        showToast('Erro ao carregar o mapa. Recarregue a página.', 'error');
    }
}

// Inicializar geolocalização do usuário
function initializeUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                updateUserLocation(position);
                DOM.userLocationStatus.textContent = 'Ativa';
                DOM.userLocationStatus.style.color = CONFIG.SECONDARY_COLOR;
                
                // Atualizar a cada 30 segundos
                setInterval(() => {
                    navigator.geolocation.getCurrentPosition(updateUserLocation);
                }, 30000);
            },
            (error) => {
                handleLocationError(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
        
        // Watch position para atualizações mais precisas
        navigator.geolocation.watchPosition(
            (position) => updateUserLocation(position),
            (error) => console.error('Erro watchPosition:', error),
            { enableHighAccuracy: true }
        );
    } else {
        DOM.userLocationStatus.textContent = 'Não suportada';
        DOM.userLocationStatus.style.color = '#dc3545';
        showToast('Seu navegador não suporta geolocalização.', 'warning');
    }
}

// Atualizar localização do usuário
function updateUserLocation(position) {
    const { latitude, longitude, accuracy } = position.coords;
    
    AppState.currentUserLocation = {
        lat: latitude,
        lng: longitude
    };
    
    AppState.userLocationAccuracy = accuracy;
    
    // Atualizar ou criar marcador do usuário
    if (!AppState.userMarker) {
        // Criar elemento HTML personalizado para o marcador
        const el = document.createElement('div');
        el.className = 'user-marker';
        el.innerHTML = `
            <div class="pulse-dot"></div>
            <div class="center-dot"></div>
            <div class="tooltip">Você está aqui</div>
        `;
        
        // Criar marcador
        AppState.userMarker = new mapboxgl.Marker({
            element: el,
            anchor: 'center'
        })
        .setLngLat([longitude, latitude])
        .addTo(AppState.map);
        
        // Adicionar círculo de precisão
        AppState.userAccuracyCircle = createAccuracyCircle([longitude, latitude], accuracy);
    } else {
        // Atualizar posição do marcador
        AppState.userMarker.setLngLat([longitude, latitude]);
        
        // Atualizar círculo de precisão
        if (AppState.userAccuracyCircle) {
            AppState.map.getSource('user-accuracy').setData({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            });
        }
    }
    
    // Atualizar informações na sidebar
    updateUserLocationInfo();
    
    // Recalcular ônibus mais próximo
    calculateNearestBus();
}

// Criar círculo de precisão da localização
function createAccuracyCircle(center, accuracy) {
    const radius = accuracy; // em metros
    
    // Adicionar fonte de dados
    if (!AppState.map.getSource('user-accuracy')) {
        AppState.map.addSource('user-accuracy', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: center
                }
            }
        });
        
        // Adicionar layer do círculo
        AppState.map.addLayer({
            id: 'user-accuracy-circle',
            type: 'circle',
            source: 'user-accuracy',
            paint: {
                'circle-radius': {
                    stops: [
                        [0, 0],
                        [20, radius / 2]
                    ],
                    base: 2
                },
                'circle-color': CONFIG.PRIMARY_COLOR,
                'circle-opacity': 0.1,
                'circle-stroke-color': CONFIG.PRIMARY_COLOR,
                'circle-stroke-width': 1,
                'circle-stroke-opacity': 0.3
            }
        });
    }
    
    return AppState.map.getSource('user-accuracy');
}

// Atualizar informações de localização do usuário na sidebar
function updateUserLocationInfo() {
    if (AppState.currentUserLocation) {
        const coordinatesElement = document.getElementById('user-coordinates');
        const accuracyElement = document.getElementById('location-accuracy');
        const updateElement = document.getElementById('location-update');
        
        if (coordinatesElement) {
            coordinatesElement.textContent = 
                `${AppState.currentUserLocation.lat.toFixed(6)}, ${AppState.currentUserLocation.lng.toFixed(6)}`;
        }
        
        if (accuracyElement) {
            accuracyElement.textContent = 
                `${Math.round(AppState.userLocationAccuracy)} metros`;
        }
        
        if (updateElement) {
            updateElement.textContent = 
                new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        }
    }
}

// Manipular erro de geolocalização
function handleLocationError(error) {
    let message = 'Erro desconhecido ao obter localização.';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = 'Permissão de localização negada. Ative em configurações.';
            break;
        case error.POSITION_UNAVAILABLE:
            message = 'Informação de localização indisponível.';
            break;
        case error.TIMEOUT:
            message = 'Tempo esgotado ao obter localização.';
            break;
    }
    
    DOM.userLocationStatus.textContent = 'Erro';
    DOM.userLocationStatus.style.color = '#dc3545';
    showToast(message, 'error');
}

// Inicializar WebSocket para dados em tempo real
function initializeWebSocket() {
    if (!CONFIG.USE_MOCK_DATA) {
        try {
            // Em produção, usar WebSocket real
            const socket = new WebSocket(CONFIG.WEBSOCKET_URL);
            
            socket.onopen = () => {
                AppState.isOnline = true;
                AppState.connectionStatus = 'connected';
                updateConnectionStatus();
                showToast('Conectado ao servidor em tempo real', 'success');
            };
            
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                updateBusPositions(data);
            };
            
            socket.onclose = () => {
                AppState.isOnline = false;
                AppState.connectionStatus = 'disconnected';
                updateConnectionStatus();
                showToast('Conexão perdida. Usando dados simulados.', 'warning');
                
                // Tentar reconectar após 5 segundos
                setTimeout(initializeWebSocket, 5000);
            };
            
            socket.onerror = (error) => {
                console.error('Erro WebSocket:', error);
                AppState.connectionStatus = 'error';
                updateConnectionStatus();
            };
            
        } catch (error) {
            console.error('Erro ao conectar WebSocket:', error);
            AppState.connectionStatus = 'error';
            updateConnectionStatus();
            showToast('Usando dados simulados.', 'info');
        }
    } else {
        // Modo de dados simulados
        AppState.isOnline = false;
        AppState.connectionStatus = 'simulated';
        updateConnectionStatus();
        showToast('Usando dados simulados para demonstração.', 'info');
    }
}

// Atualizar status da conexão
function updateConnectionStatus() {
    const statusElement = DOM.connectionStatus;
    const connectionIcon = document.querySelector('#connection-status i');
    
    switch(AppState.connectionStatus) {
        case 'connected':
            statusElement.textContent = 'Online';
            statusElement.style.color = CONFIG.SECONDARY_COLOR;
            connectionIcon.style.color = CONFIG.SECONDARY_COLOR;
            break;
        case 'connecting':
            statusElement.textContent = 'Conectando...';
            statusElement.style.color = '#ffc107';
            connectionIcon.style.color = '#ffc107';
            break;
        case 'disconnected':
            statusElement.textContent = 'Offline';
            statusElement.style.color = '#dc3545';
            connectionIcon.style.color = '#dc3545';
            break;
        case 'simulated':
            statusElement.textContent = 'Simulado';
            statusElement.style.color = '#6c757d';
            connectionIcon.style.color = '#6c757d';
            break;
        case 'error':
            statusElement.textContent = 'Erro';
            statusElement.style.color = '#dc3545';
            connectionIcon.style.color = '#dc3545';
            break;
    }
}

// Atualizar posições dos ônibus
function updateBusPositions(positionsData) {
    AppState.lastUpdate = new Date();
    
    // Atualizar tempo da última atualização
    if (DOM.lastUpdateTime) {
        DOM.lastUpdateTime.textContent = 
            AppState.lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    
    // Processar atualizações
    positionsData.forEach(busData => {
        const busId = busData.id;
        
        // Atualizar posição no estado
        if (window.posicoesTempoReal) {
            window.posicoesTempoReal[busId] = {
                ...window.posicoesTempoReal[busId],
                ...busData,
                ultimaAtualizacao: new Date()
            };
        }
        
        // Atualizar marcador no mapa
        if (AppState.busMarkers[busId]) {
            // Animação suave de movimento
            const currentPosition = AppState.busMarkers[busId].getLngLat();
            const newPosition = [busData.lng, busData.lat];
            
            // Calcular distância para animação
            const distance = calculateDistance(
                [currentPosition.lng, currentPosition.lat],
                newPosition
            );
            
            // Se a distância for grande, mover diretamente
            if (distance > 1000) {
                AppState.busMarkers[busId].setLngLat(newPosition);
            } else {
                // Animar movimento
                animateMarkerMovement(
                    AppState.busMarkers[busId],
                    currentPosition,
                    newPosition,
                    1000 // 1 segundo
                );
            }
            
            // Atualizar rota e progresso
            updateBusRoute(busId, busData.progresso || 0);
        }
    });
    
    // Recalcular ônibus mais próximo
    calculateNearestBus();
    
    // Atualizar lista de ônibus
    updateBusesList();
}

// Calcular distância entre dois pontos (em metros)
function calculateDistance(point1, point2) {
    const [lng1, lat1] = point1;
    const [lng2, lat2] = point2;
    
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c;
}

// Animar movimento do marcador
function animateMarkerMovement(marker, startPos, endPos, duration) {
    const startTime = Date.now();
    const [startLng, startLat] = [startPos.lng, startPos.lat];
    const [endLng, endLat] = endPos;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Interpolação linear
        const currentLng = startLng + (endLng - startLng) * progress;
        const currentLat = startLat + (endLat - startLat) * progress;
        
        marker.setLngLat([currentLng, currentLat]);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Carregar dados estáticos
function loadStaticData() {
    // Carregar frota de ônibus
    window.frota.forEach(bus => {
        AppState.buses[bus.id] = {
            ...bus,
            position: window.posicoesTempoReal[bus.id] || null,
            marker: null,
            route: null
        };
    });
    
    // Atualizar marcadores no mapa
    updateMapMarkers();
    
    // Carregar lista de ônibus
    updateBusesList();
    
    // Carregar horários
    loadSchedules();
}

// Atualizar marcadores no mapa
function updateMapMarkers() {
    if (!AppState.map || !AppState.map.loaded()) return;
    
    // Remover marcadores existentes
    Object.values(AppState.busMarkers).forEach(marker => marker.remove());
    AppState.busMarkers = {};
    
    // Adicionar marcadores para cada ônibus
    Object.values(AppState.buses).forEach(bus => {
        if (bus.position && bus.status !== 'inativo') {
            createBusMarker(bus);
        }
    });
    
    // Desenhar rotas
    drawBusRoutes();
}

// Criar marcador de ônibus
function createBusMarker(bus) {
    const { id, numero, linha, position } = bus;
    
    // Criar elemento HTML personalizado
    const el = document.createElement('div');
    el.className = 'bus-marker';
    el.dataset.busId = id;
    
    // Verificar se é o ônibus mais próximo
    const isNearest = AppState.nearestBus && AppState.nearestBus.id === id;
    
    // Ícone de ônibus com número
    el.innerHTML = `
        <div class="bus-icon ${isNearest ? 'nearest' : ''}">
            <i class="fas fa-bus"></i>
            <span class="bus-number">${numero}</span>
        </div>
        <div class="bus-tooltip">
            <strong>Ônibus ${numero}</strong><br>
            ${itinerarios[linha]?.nome || 'Linha desconhecida'}
        </div>
    `;
    
    // Criar marcador
    const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
    })
    .setLngLat([position.lng, position.lat])
    .addTo(AppState.map);
    
    // Adicionar popup
    const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false
    }).setHTML(createBusPopupContent(bus));
    
    marker.setPopup(popup);
    
    // Adicionar evento de clique
    el.addEventListener('click', (e) => {
        e.stopPropagation();
        openBusDetailsModal(bus.id);
    });
    
    // Salvar referência
    AppState.busMarkers[id] = marker;
    AppState.buses[id].marker = marker;
    
    return marker;
}

// Criar conteúdo do popup do ônibus
function createBusPopupContent(bus) {
    const linhaInfo = itinerarios[bus.linha];
    const statusInfo = statusOptions[bus.status];
    
    return `
        <div class="bus-popup">
            <h4>Ônibus ${bus.numero}</h4>
            <p><strong>Linha:</strong> ${linhaInfo?.nome || bus.linha}</p>
            <p><strong>Motorista:</strong> ${bus.motorista}</p>
            <p><strong>Status:</strong> <span style="color:${statusInfo.color}">${statusInfo.text}</span></p>
            <p><strong>Progresso:</strong> ${bus.position?.progresso || 0}%</p>
            <button class="btn btn-sm" onclick="window.openBusDetailsModal('${bus.id}')">
                Ver Detalhes
            </button>
        </div>
    `;
}

// Desenhar rotas dos ônibus
function drawBusRoutes() {
    // Remover rotas existentes
    Object.values(AppState.busRoutes).forEach(route => {
        if (route.sourceId) {
            if (AppState.map.getSource(route.sourceId)) {
                AppState.map.removeLayer(route.layerId);
                AppState.map.removeSource(route.sourceId);
            }
        }
    });
    
    // Desenhar rotas para cada linha
    Object.keys(itinerarios).forEach(lineId => {
        const itinerary = itinerarios[lineId];
        
        if (itinerary.pontos && itinerary.pontos.length > 1) {
            drawRouteLine(lineId, itinerary.pontos);
        }
    });
}

// Desenhar linha de rota
function drawRouteLine(lineId, coordinates) {
    const sourceId = `route-${lineId}`;
    const layerId = `route-${lineId}-layer`;
    
    // Criar GeoJSON da rota
    const routeGeoJSON = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: coordinates
        }
    };
    
    // Adicionar fonte
    AppState.map.addSource(sourceId, {
        type: 'geojson',
        data: routeGeoJSON
    });
    
    // Adicionar layer da rota (linha tracejada cinza)
    AppState.map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#6c757d',
            'line-width': 3,
            'line-dasharray': [2, 2],
            'line-opacity': 0.6
        }
    });
    
    // Salvar referência
    AppState.busRoutes[lineId] = {
        sourceId,
        layerId,
        coordinates
    };
}

// Atualizar rota do ônibus (progresso)
function updateBusRoute(busId, progress) {
    const bus = AppState.buses[busId];
    if (!bus || !bus.position) return;
    
    const linha = itinerarios[bus.linha];
    if (!linha || !linha.pontos) return;
    
    // Calcular ponto atual com base no progresso
    const totalPoints = linha.pontos.length;
    const progressIndex = Math.floor((progress / 100) * (totalPoints - 1));
    const completedPoints = linha.pontos.slice(0, progressIndex + 1);
    
    // Criar ou atualizar layer de rota percorrida
    const completedSourceId = `route-completed-${busId}`;
    const completedLayerId = `route-completed-layer-${busId}`;
    
    // Remover layer anterior se existir
    if (AppState.map.getLayer(completedLayerId)) {
        AppState.map.removeLayer(completedLayerId);
    }
    if (AppState.map.getSource(completedSourceId)) {
        AppState.map.removeSource(completedSourceId);
    }
    
    // Adicionar nova rota percorrida
    if (completedPoints.length > 1) {
        const completedGeoJSON = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: completedPoints
            }
        };
        
        AppState.map.addSource(completedSourceId, {
            type: 'geojson',
            data: completedGeoJSON
        });
        
        AppState.map.addLayer({
            id: completedLayerId,
            type: 'line',
            source: completedSourceId,
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': CONFIG.SECONDARY_COLOR,
                'line-width': 4,
                'line-opacity': 0.8
            }
        });
        
        // Colocar acima da rota tracejada
        AppState.map.moveLayer(completedLayerId, `route-${bus.linha}-layer`);
    }
}

// Calcular ônibus mais próximo
function calculateNearestBus() {
    if (!AppState.currentUserLocation || !window.posicoesTempoReal) {
        DOM.nearestLoading.classList.remove('hidden');
        DOM.nearestBusInfo.classList.add('hidden');
        return;
    }
    
    const userPos = AppState.currentUserLocation;
    let nearestBus = null;
    let minDistance = Infinity;
    
    // Encontrar ônibus mais próximo
    Object.entries(window.posicoesTempoReal).forEach(([busId, position]) => {
        const bus = AppState.buses[busId];
        if (!bus || bus.status !== 'em_rota') return;
        
        const distance = calculateDistance(
            [userPos.lng, userPos.lat],
            [position.lng, position.lat]
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestBus = { ...bus, position, distance };
        }
    });
    
    // Atualizar estado
    AppState.nearestBus = nearestBus;
    
    // Atualizar UI
    updateNearestBusCard();
}

// Atualizar card do ônibus mais próximo
function updateNearestBusCard() {
    const nearestBus = AppState.nearestBus;
    
    if (!nearestBus) {
        DOM.nearestLoading.classList.remove('hidden');
        DOM.nearestBusInfo.classList.add('hidden');
        return;
    }
    
    DOM.nearestLoading.classList.add('hidden');
    DOM.nearestBusInfo.classList.remove('hidden');
    
    // Atualizar informações
    document.getElementById('nearest-bus-number').textContent = nearestBus.numero;
    document.getElementById('nearest-bus-line').textContent = 
        itinerarios[nearestBus.linha]?.nome || nearestBus.linha;
    document.getElementById('nearest-bus-driver').textContent = nearestBus.motorista;
    document.getElementById('nearest-bus-distance').textContent = 
        `${Math.round(nearestBus.distance)} metros`;
    
    // Calcular ETA (estimativa simplificada)
    const eta = Math.round(nearestBus.distance / (nearestBus.position.velocidade || 40) * 60);
    document.getElementById('nearest-bus-eta').textContent = 
        `${eta} minutos`;
    
    // Atualizar progresso
    const progress = nearestBus.position.progresso || 0;
    document.getElementById('nearest-bus-progress').textContent = `${progress}%`;
    document.getElementById('nearest-bus-progress-bar').style.width = `${progress}%`;
    
    // Atualizar status
    const statusElement = document.getElementById('nearest-bus-status');
    const statusInfo = statusOptions[nearestBus.status];
    statusElement.textContent = statusInfo.text;
    statusElement.className = `bus-status ${statusInfo.class}`;
    
    // Atualizar marcador no mapa (destacar)
    updateBusMarkerHighlight();
}

// Destacar marcador do ônibus mais próximo
function updateBusMarkerHighlight() {
    // Remover destaque anterior
    document.querySelectorAll('.bus-marker .nearest').forEach(el => {
        el.classList.remove('nearest');
    });
    
    // Destacar novo mais próximo
    if (AppState.nearestBus && AppState.busMarkers[AppState.nearestBus.id]) {
        const markerEl = AppState.busMarkers[AppState.nearestBus.id].getElement();
        const busIcon = markerEl.querySelector('.bus-icon');
        if (busIcon) {
            busIcon.classList.add('nearest');
            
            // Adicionar efeito pulsante
            busIcon.style.animation = 'pulse 2s infinite';
        }
    }
}

// Atualizar lista de ônibus
function updateBusesList() {
    const busesList = DOM.busesList;
    if (!busesList) return;
    
    // Limpar lista
    busesList.innerHTML = '';
    
    // Filtrar ônibus
    const searchTerm = DOM.busSearch ? DOM.busSearch.value.toLowerCase() : '';
    const selectedLine = DOM.lineFilter ? DOM.lineFilter.value : 'all';
    
    let filteredBuses = Object.values(AppState.buses);
    
    // Aplicar filtros
    if (searchTerm) {
        filteredBuses = filteredBuses.filter(bus => 
            bus.numero.toLowerCase().includes(searchTerm) ||
            bus.motorista.toLowerCase().includes(searchTerm) ||
            (itinerarios[bus.linha]?.nome.toLowerCase().includes(searchTerm))
        );
    }
    
    if (selectedLine !== 'all') {
        filteredBuses = filteredBuses.filter(bus => bus.linha === selectedLine);
    }
    
    // Ordenar por proximidade (se usuário estiver localizado)
    if (AppState.currentUserLocation) {
        filteredBuses.sort((a, b) => {
            const posA = window.posicoesTempoReal[a.id];
            const posB = window.posicoesTempoReal[b.id];
            
            if (!posA && !posB) return 0;
            if (!posA) return 1;
            if (!posB) return -1;
            
            const distA = calculateDistance(
                [AppState.currentUserLocation.lng, AppState.currentUserLocation.lat],
                [posA.lng, posA.lat]
            );
            
            const distB = calculateDistance(
                [AppState.currentUserLocation.lng, AppState.currentUserLocation.lat],
                [posB.lng, posB.lat]
            );
            
            return distA - distB;
        });
    }
    
    // Adicionar ônibus à lista
    filteredBuses.forEach(bus => {
        const position = window.posicoesTempoReal[bus.id];
        const linhaInfo = itinerarios[bus.linha];
        const statusInfo = statusOptions[bus.status];
        
        const busItem = document.createElement('div');
        busItem.className = 'bus-item';
        busItem.dataset.busId = bus.id;
        
        // Calcular distância se disponível
        let distanceText = '--';
        if (AppState.currentUserLocation && position) {
            const distance = calculateDistance(
                [AppState.currentUserLocation.lng, AppState.currentUserLocation.lat],
                [position.lng, position.lat]
            );
            distanceText = `${Math.round(distance)}m`;
        }
        
        busItem.innerHTML = `
            <div class="bus-item-header">
                <div class="bus-number">${bus.numero}</div>
                <div class="bus-status ${statusInfo.class}">${statusInfo.text}</div>
            </div>
            <div class="bus-item-info">
                <p><strong>Linha:</strong> ${linhaInfo?.nome || bus.linha}</p>
                <p><strong>Motorista:</strong> ${bus.motorista}</p>
                <p><strong>Distância:</strong> ${distanceText}</p>
                ${position ? `<p><strong>Progresso:</strong> ${position.progresso || 0}%</p>` : ''}
            </div>
        `;
        
        // Adicionar evento de clique
        busItem.addEventListener('click', () => {
            openBusDetailsModal(bus.id);
        });
        
        busesList.appendChild(busItem);
    });
    
    // Mostrar mensagem se não houver resultados
    if (filteredBuses.length === 0) {
        busesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bus-slash"></i>
                <p>Nenhum ônibus encontrado</p>
            </div>
        `;
    }
}

// Carregar horários
function loadSchedules() {
    const lineSelect = DOM.scheduleLine;
    if (!lineSelect) return;
    
    // Evento para alterar linha
    lineSelect.addEventListener('change', updateScheduleTable);
    
    // Carregar tabela inicial
    updateScheduleTable();
}

// Atualizar tabela de horários
function updateScheduleTable() {
    const selectedLine = DOM.scheduleLine.value;
    const scheduleData = horarios[selectedLine];
    const itineraryData = itinerarios[selectedLine];
    
    if (!scheduleData || !DOM.scheduleTable) return;
    
    // Limpar tabela
    DOM.scheduleTable.innerHTML = '';
    
    // Adicionar horários
    scheduleData.forEach((schedule, index) => {
        const row = document.createElement('tr');
        
        // Determinar status baseado no horário atual
        const now = new Date();
        const [hour, minute] = schedule.saida.split(':');
        const scheduleTime = new Date();
        scheduleTime.setHours(parseInt(hour), parseInt(minute), 0, 0);
        
        let status = 'programado';
        let statusClass = '';
        let statusText = 'Programado';
        
        if (now > scheduleTime) {
            const diffMinutes = Math.floor((now - scheduleTime) / (1000 * 60));
            if (diffMinutes <= 5) {
                status = 'no_horario';
                statusClass = 'success';
                statusText = 'No horário';
            } else {
                status = 'atrasado';
                statusClass = 'warning';
                statusText = `Atrasado ${diffMinutes}min`;
            }
        }
        
        row.innerHTML = `
            <td>${schedule.saida}</td>
            <td>${schedule.chegada}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        `;
        
        DOM.scheduleTable.appendChild(row);
    });
    
    // Atualizar itinerário
    updateItineraryList(itineraryData);
}

// Atualizar lista de itinerário
function updateItineraryList(itineraryData) {
    if (!itineraryData || !DOM.itineraryList) return;
    
    DOM.itineraryList.innerHTML = '';
    
    itineraryData.paradas.forEach((parada, index) => {
        const item = document.createElement('div');
        item.className = 'itinerary-item';
        
        // Marcar parada atual (simplificado - na prática seria baseado na posição do ônibus)
        const isActive = index === 3; // Exemplo: parada 3 é a atual
        
        if (isActive) {
            item.classList.add('active');
        }
        
        item.innerHTML = `
            <div class="itinerary-marker">${index + 1}</div>
            <div class="itinerary-info">
                <h5>${parada.nome}</h5>
                <p>${index === 0 ? 'Partida' : index === itineraryData.paradas.length - 1 ? 'Destino final' : 'Parada intermediária'}</p>
            </div>
        `;
        
        DOM.itineraryList.appendChild(item);
    });
}

// Abrir modal de detalhes do ônibus
function openBusDetailsModal(busId) {
    const bus = AppState.buses[busId];
    if (!bus) return;
    
    AppState.selectedBus = bus;
    
    // Mostrar modal
    DOM.busDetailsModal.classList.remove('hidden');
    
    // Carregar conteúdo
    loadBusDetails(bus);
}

// Carregar detalhes do ônibus no modal
function loadBusDetails(bus) {
    const modalContent = document.getElementById('modal-content');
    const modalLoading = document.getElementById('modal-loading');
    
    // Mostrar loading
    modalContent.classList.add('hidden');
    modalLoading.classList.remove('hidden');
    
    // Simular carregamento
    setTimeout(() => {
        const position = window.posicoesTempoReal[bus.id];
        const linhaInfo = itinerarios[bus.linha];
        const statusInfo = statusOptions[bus.status];
        
        // Calcular informações
        let etaText = '--';
        let nextStop = '--';
        
        if (position && linhaInfo) {
            // ETA simplificado
            if (AppState.currentUserLocation) {
                const distance = calculateDistance(
                    [AppState.currentUserLocation.lng, AppState.currentUserLocation.lat],
                    [position.lng, position.lat]
                );
                const eta = Math.round(distance / (position.velocidade || 40) * 60);
                etaText = `${eta} minutos`;
            }
            
            // Próxima parada (simplificado)
            const progress = position.progresso || 0;
            const stopIndex = Math.floor((progress / 100) * linhaInfo.paradas.length);
            nextStop = linhaInfo.paradas[Math.min(stopIndex + 1, linhaInfo.paradas.length - 1)]?.nome || '--';
        }
        
        // Criar conteúdo
        modalContent.innerHTML = `
            <div class="modal-bus-header">
                <div class="modal-bus-number">${bus.numero}</div>
                <div class="modal-bus-status ${statusInfo.class}">${statusInfo.text}</div>
            </div>
            
            <div class="modal-section">
                <h4>Informações do Veículo</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Linha:</strong>
                        <span>${linhaInfo?.nome || bus.linha}</span>
                    </div>
                    <div class="info-item">
                        <strong>Motorista:</strong>
                        <span>${bus.motorista}</span>
                    </div>
                    <div class="info-item">
                        <strong>Modelo:</strong>
                        <span>${bus.modelo}</span>
                    </div>
                    <div class="info-item">
                        <strong>Placa:</strong>
                        <span>${bus.placa}</span>
                    </div>
                    <div class="info-item">
                        <strong>Ano:</strong>
                        <span>${bus.ano}</span>
                    </div>
                    <div class="info-item">
                        <strong>Capacidade:</strong>
                        <span>${bus.capacidade} passageiros</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h4>Status e Localização</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Velocidade:</strong>
                        <span>${position?.velocidade || '--'} km/h</span>
                    </div>
                    <div class="info-item">
                        <strong>Próxima parada:</strong>
                        <span>${nextStop}</span>
                    </div>
                    <div class="info-item">
                        <strong>ETA até você:</strong>
                        <span>${etaText}</span>
                    </div>
                    <div class="info-item">
                        <strong>Última atualização:</strong>
                        <span>${position?.ultimaAtualizacao ? 
                            position.ultimaAtualizacao.toLocaleTimeString('pt-BR') : '--'}</span>
                    </div>
                </div>
                
                <div class="progress-container" style="margin-top: 1rem;">
                    <div class="progress-label">
                        <span>Progresso da rota</span>
                        <span>${position?.progresso || 0}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${position?.progresso || 0}%"></div>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h4>Itinerário</h4>
                <div class="modal-itinerary-list">
                    ${linhaInfo ? linhaInfo.paradas.map((parada, index) => `
                        <div class="modal-itinerary-item ${index === Math.floor(((position?.progresso || 0) / 100) * linhaInfo.paradas.length) ? 'active' : ''}">
                            <div class="modal-itinerary-marker">${index + 1}</div>
                            <div class="modal-itinerary-info">
                                <h5>${parada.nome}</h5>
                                <p>${index === 0 ? 'Partida' : index === linhaInfo.paradas.length - 1 ? 'Destino final' : 'Parada'}</p>
                            </div>
                        </div>
                    `).join('') : '<p>Itinerário não disponível</p>'}
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-secondary" id="center-on-bus">
                    <i class="fas fa-crosshairs"></i> Centralizar no mapa
                </button>
                <button class="btn btn-primary" id="view-full-route">
                    <i class="fas fa-route"></i> Ver rota completa
                </button>
            </div>
        `;
        
        // Esconder loading e mostrar conteúdo
        modalLoading.classList.add('hidden');
        modalContent.classList.remove('hidden');
        
        // Adicionar eventos aos botões
        document.getElementById('center-on-bus').addEventListener('click', () => {
            centerMapOnBus(bus.id);
        });
        
        document.getElementById('view-full-route').addEventListener('click', () => {
            // Em uma implementação completa, isso mostraria a rota completa no mapa
            showToast(`Mostrando rota completa do ônibus ${bus.numero}`, 'info');
        });
    }, 500);
}

// Centralizar mapa no ônibus
function centerMapOnBus(busId) {
    const bus = AppState.buses[busId];
    if (!bus || !bus.position) return;
    
    AppState.map.flyTo({
        center: [bus.position.lng, bus.position.lat],
        zoom: 15,
        essential: true
    });
    
    // Abrir popup do marcador
    if (AppState.busMarkers[busId]) {
        AppState.busMarkers[busId].togglePopup();
    }
}

// Inicializar event listeners
function initializeEventListeners() {
    // Botão centralizar no usuário
    if (DOM.centerUserBtn) {
        DOM.centerUserBtn.addEventListener('click', () => {
            if (AppState.currentUserLocation) {
                AppState.map.flyTo({
                    center: [AppState.currentUserLocation.lng, AppState.currentUserLocation.lat],
                    zoom: 15,
                    essential: true
                });
            } else {
                showToast('Localização do usuário não disponível.', 'warning');
            }
        });
    }
    
    // Toggle sidebar (mobile)
    if (DOM.toggleSidebar) {
        DOM.toggleSidebar.addEventListener('click', toggleSidebar);
    }
    
    if (DOM.closeSidebar) {
        DOM.closeSidebar.addEventListener('click', toggleSidebar);
    }
    
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // Busca de ônibus
    if (DOM.busSearch) {
        DOM.busSearch.addEventListener('input', debounce(updateBusesList, 300));
    }
    
    // Filtro de linha
    if (DOM.lineFilter) {
        DOM.lineFilter.addEventListener('change', updateBusesList);
    }
    
    // Botão centralizar no ônibus mais próximo
    const centerNearestBtn = document.getElementById('center-nearest-btn');
    if (centerNearestBtn) {
        centerNearestBtn.addEventListener('click', () => {
            if (AppState.nearestBus) {
                centerMapOnBus(AppState.nearestBus.id);
            }
        });
    }
    
    // Botão ver rota do mais próximo
    const viewNearestRouteBtn = document.getElementById('view-nearest-route');
    if (viewNearestRouteBtn) {
        viewNearestRouteBtn.addEventListener('click', () => {
            if (AppState.nearestBus) {
                openBusDetailsModal(AppState.nearestBus.id);
            }
        });
    }
    
    // Botão atualizar localização
    const refreshLocationBtn = document.getElementById('refresh-location');
    if (refreshLocationBtn) {
        refreshLocationBtn.addEventListener('click', () => {
            navigator.geolocation.getCurrentPosition(
                updateUserLocation,
                handleLocationError,
                { enableHighAccuracy: true, timeout: 10000 }
            );
            showToast('Atualizando localização...', 'info');
        });
    }
    
    // Fechar modal
    if (DOM.closeModal) {
        DOM.closeModal.addEventListener('click', () => {
            DOM.busDetailsModal.classList.add('hidden');
        });
    }
    
    // Fechar modal ao clicar fora
    DOM.busDetailsModal.addEventListener('click', (e) => {
        if (e.target === DOM.busDetailsModal) {
            DOM.busDetailsModal.classList.add('hidden');
        }
    });
    
    // Controles do mapa
    document.getElementById('zoom-in').addEventListener('click', () => {
        AppState.map.zoomIn();
    });
    
    document.getElementById('zoom-out').addEventListener('click', () => {
        AppState.map.zoomOut();
    });
    
    document.getElementById('fit-bounds').addEventListener('click', () => {
        fitMapToBuses();
    });
}

// Alternar sidebar (mobile)
function toggleSidebar() {
    DOM.sidebar.classList.toggle('active');
    AppState.isSidebarOpen = !AppState.isSidebarOpen;
    
    // Atualizar ícone do hambúrguer
    const icon = DOM.toggleSidebar.querySelector('i');
    if (AppState.isSidebarOpen) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

// Alternar entre abas
function switchTab(tabId) {
    // Atualizar botões ativos
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
    // Atualizar conteúdo das abas
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `${tabId}-tab`);
    });
    
    // Atualizar estado
    AppState.activeTab = tabId;
    
    // Executar ações específicas da aba
    switch(tabId) {
        case 'all-buses':
            updateBusesList();
            break;
        case 'schedules':
            updateScheduleTable();
            break;
    }
}

// Ajustar mapa para mostrar todos os ônibus
function fitMapToBuses() {
    const bounds = new mapboxgl.LngLatBounds();
    
    // Adicionar posição do usuário se disponível
    if (AppState.currentUserLocation) {
        bounds.extend([AppState.currentUserLocation.lng, AppState.currentUserLocation.lat]);
    }
    
    // Adicionar posições dos ônibus
    Object.values(window.posicoesTempoReal).forEach(position => {
        bounds.extend([position.lng, position.lat]);
    });
    
    // Se não houver bounds válidos, usar padrão
    if (bounds.isEmpty()) {
        bounds.extend([-45.9085, -23.1945]); // Centro de São José dos Campos
    }
    
    AppState.map.fitBounds(bounds, {
        padding: 50,
        duration: 1000
    });
}

// Atualizar dados em tempo real (simulado)
function updateRealTimeData() {
    if (CONFIG.USE_MOCK_DATA) {
        // Simular atualizações de posição com movimento mais realista
        Object.keys(window.posicoesTempoReal).forEach(busId => {
            const bus = AppState.buses[busId];
            if (!bus || bus.status !== 'em_rota') return;
            
            const position = window.posicoesTempoReal[busId];
            const linha = itinerarios[bus.linha];
            
            if (linha && linha.pontos && linha.pontos.length > 0) {
                // Progresso mais lento e suave (1-2% por atualização)
                let progress = (position.progresso || 0) + (0.5 + Math.random() * 1.5);
                if (progress > 100) progress = 0;
                
                // Encontrar o ponto exato na rota baseado no progresso
                const totalPoints = linha.pontos.length;
                const segmentIndex = Math.floor((progress / 100) * (totalPoints - 1));
                const segmentProgress = ((progress / 100) * (totalPoints - 1)) - segmentIndex;
                
                // Garantir que estamos dentro dos limites
                const startIndex = Math.min(segmentIndex, totalPoints - 2);
                const endIndex = startIndex + 1;
                
                // Interpolar entre dois pontos da rota
                const startPoint = linha.pontos[startIndex];
                const endPoint = linha.pontos[endIndex];
                
                // Cálculo de interpolação linear (movimento suave entre pontos)
                const newLng = startPoint[0] + (endPoint[0] - startPoint[0]) * segmentProgress;
                const newLat = startPoint[1] + (endPoint[1] - startPoint[1]) * segmentProgress;
                
                // Adicionar variação mínima para parecer mais natural
                const variation = 0.00002; // Aproximadamente 2 metros
                const finalLng = newLng + (Math.random() - 0.5) * variation;
                const finalLat = newLat + (Math.random() - 0.5) * variation;
                
                // Atualizar posição
                window.posicoesTempoReal[busId] = {
                    ...position,
                    lng: finalLng,
                    lat: finalLat,
                    progresso: progress,
                    velocidade: 35 + Math.random() * 25, // 35-60 km/h
                    ultimaAtualizacao: new Date()
                };
                
                // Atualizar no estado da aplicação
                if (AppState.buses[busId]) {
                    AppState.buses[busId].position = window.posicoesTempoReal[busId];
                }
            }
        });
        
        // Atualizar UI (mas sem animação muito rápida)
        updateBusPositions(Object.entries(window.posicoesTempoReal).map(([id, pos]) => ({
            id,
            ...pos
        })));
    }
}
        

// Atualizar UI geral
function updateUI() {
    // Atualizar hora
    updateTime();
    
    // Atualizar a cada minuto
    setInterval(updateTime, 60000);
}

// Atualizar hora atual
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Encontrar elemento da hora (se existir)
    const timeElement = document.querySelector('.current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Mostrar notificação toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Ícone baseado no tipo
    let icon = 'info-circle';
    switch(type) {
        case 'success': icon = 'check-circle'; break;
        case 'warning': icon = 'exclamation-triangle'; break;
        case 'error': icon = 'times-circle'; break;
    }
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    DOM.toastContainer.appendChild(toast);
    
    // Remover após 5 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Adicionar estilos CSS dinâmicos
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos para marcadores */
        .user-marker {
            position: relative;
            width: 40px;
            height: 40px;
        }
        
        .pulse-dot {
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            background-color: ${CONFIG.PRIMARY_COLOR};
            border-radius: 50%;
            opacity: 0.6;
            animation: pulse 2s infinite;
        }
        
        .center-dot {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 20px;
            height: 20px;
            background-color: white;
            border: 3px solid ${CONFIG.PRIMARY_COLOR};
            border-radius: 50%;
        }
        
        .user-marker .tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            color: ${CONFIG.PRIMARY_COLOR};
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            display: none;
        }
        
        .user-marker:hover .tooltip {
            display: block;
        }
        
        .bus-marker {
            position: relative;
            cursor: pointer;
        }
        
        .bus-icon {
            width: 36px;
            height: 36px;
            background-color: ${CONFIG.SECONDARY_COLOR};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            position: relative;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            border: 2px solid white;
        }
        
        .bus-icon.nearest {
            background-color: #FF6B35;
            animation: pulse 2s infinite;
        }
        
        .bus-number {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: white;
            color: ${CONFIG.PRIMARY_COLOR};
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 10px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid ${CONFIG.PRIMARY_COLOR};
        }
        
        .bus-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            display: none;
            z-index: 100;
            border: 1px solid #eee;
        }
        
        .bus-marker:hover .bus-tooltip {
            display: block;
        }
        
        /* Efeito de pulsação */
        @keyframes pulse {
            0% {
                transform: scale(0.95);
                box-shadow: 0 0 0 0 rgba(0, 168, 107, 0.7);
            }
            
            70% {
                transform: scale(1);
                box-shadow: 0 0 0 10px rgba(0, 168, 107, 0);
            }
            
            100% {
                transform: scale(0.95);
                box-shadow: 0 0 0 0 rgba(0, 168, 107, 0);
            }
        }
        
        /* Estilos para popups */
        .mapboxgl-popup-content {
            padding: 15px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
        }
        
        .bus-popup h4 {
            margin-top: 0;
            margin-bottom: 10px;
            color: ${CONFIG.PRIMARY_COLOR};
        }
        
        .bus-popup p {
            margin: 5px 0;
            font-size: 14px;
        }
        
        .btn-sm {
            padding: 4px 12px;
            font-size: 12px;
            margin-top: 10px;
        }
        
        /* Estilos para o modal */
        .modal-bus-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--gray-200);
        }
        
        .modal-bus-number {
            font-size: 2rem;
            font-weight: 700;
            color: ${CONFIG.PRIMARY_COLOR};
        }
        
        .modal-section {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--gray-200);
        }
        
        .modal-section:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .modal-section h4 {
            margin-bottom: 15px;
            color: var(--gray-800);
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        
        .info-item {
            display: flex;
            flex-direction: column;
        }
        
        .info-item strong {
            font-size: 12px;
            color: var(--gray-600);
            margin-bottom: 2px;
        }
        
        .modal-itinerary-list {
            max-height: 200px;
            overflow-y: auto;
        }
        
        .modal-itinerary-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 8px;
            background-color: var(--gray-100);
        }
        
        .modal-itinerary-item.active {
            background-color: rgba(0, 168, 107, 0.1);
            border-left: 3px solid ${CONFIG.SECONDARY_COLOR};
        }
        
        .modal-itinerary-marker {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: var(--gray-400);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: white;
            margin-right: 12px;
            flex-shrink: 0;
        }
        
        .modal-itinerary-item.active .modal-itinerary-marker {
            background-color: ${CONFIG.SECONDARY_COLOR};
        }
        
        .modal-itinerary-info {
            flex: 1;
        }
        
        .modal-itinerary-info h5 {
            font-size: 14px;
            margin: 0 0 2px 0;
        }
        
        .modal-itinerary-info p {
            font-size: 12px;
            color: var(--gray-600);
            margin: 0;
        }
        
        .modal-actions {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        
        /* Status badges */
        .status-badge {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .status-badge.success {
            background-color: rgba(40, 167, 69, 0.1);
            color: #28a745;
        }
        
        .status-badge.warning {
            background-color: rgba(255, 193, 7, 0.1);
            color: #ffc107;
        }
        
        /* Empty state */
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: var(--gray-500);
        }
        
        .empty-state i {
            font-size: 48px;
            margin-bottom: 15px;
        }
    `;
    
    document.head.appendChild(style);
}

// Inicializar estilos dinâmicos
addDynamicStyles();

// Exportar funções globais
window.openBusDetailsModal = openBusDetailsModal;
window.centerMapOnBus = centerMapOnBus;