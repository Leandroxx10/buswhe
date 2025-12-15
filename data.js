// Dados estáticos do sistema de rastreamento Catirose - Wheaton

// Itinerários completos das linhas (coordenadas reais de São José dos Campos)
const itinerarios = {
    "linha-01": {
        nome: "Linha 01 - Wheaton (Vila São Pedro)",
        pontos: [
            // PONTO INICIAL - AV. LUIZ PEQUINI, 688
            [-45.8673, -23.2112], // Av. Luiz Pequini, 688
            
            // Saída: Av. Álvaro Guimarães
            [-45.8695, -23.2098],
            
            // Av. Dom Pedro de Alcântara
            [-45.8721, -23.2079],
            
            // Rua Jardim
            [-45.8745, -23.2055],
            
            // Rua Tiradentes
            [-45.8772, -23.2028],
            
            // Av. Frei Gaspar
            [-45.8798, -23.2001],
            
            // Av. Brigadeiro Faria Lima
            [-45.8825, -23.1973],
            
            // Acesso ao viaduto para Av. Rotary
            [-45.8852, -23.1945],
            
            // Rodovia Anchieta (trecho próximo)
            [-45.8880, -23.1917],
            
            // Retorno: Av. Rotary
            [-45.8855, -23.1940],
            
            // Av. João Firmino
            [-45.8828, -23.1967],
            
            // Rua Tiradentes (retorno)
            [-45.8801, -23.1994],
            
            // Rua Jardim (retorno)
            [-45.8774, -23.2021],
            
            // Av. Dom Pedro de Alcântara (retorno)
            [-45.8747, -23.2048],
            
            // WHEATON BRASIL (Destino)
            [-45.8719, -23.2076], // Wheaton Brasil
            
            // Retorno final: Av. Luiz Pequini, 688
            [-45.8692, -23.2103],
            [-45.8675, -23.2115]
        ],
        paradas: [
            { 
                nome: "Ponto Inicial - Av. Luiz Pequini, 688", 
                coordenadas: [-45.8673, -23.2112],
                tipo: "partida"
            },
            { 
                nome: "Av. Álvaro Guimarães", 
                coordenadas: [-45.8695, -23.2098],
                tipo: "parada"
            },
            { 
                nome: "Av. Dom Pedro de Alcântara", 
                coordenadas: [-45.8721, -23.2079],
                tipo: "parada"
            },
            { 
                nome: "Rua Jardim", 
                coordenadas: [-45.8745, -23.2055],
                tipo: "parada"
            },
            { 
                nome: "Rua Tiradentes", 
                coordenadas: [-45.8772, -23.2028],
                tipo: "parada"
            },
            { 
                nome: "Av. Frei Gaspar", 
                coordenadas: [-45.8798, -23.2001],
                tipo: "parada"
            },
            { 
                nome: "Av. Brigadeiro Faria Lima", 
                coordenadas: [-45.8825, -23.1973],
                tipo: "parada"
            },
            { 
                nome: "Acesso viaduto Av. Rotary", 
                coordenadas: [-45.8852, -23.1945],
                tipo: "parada"
            },
            { 
                nome: "Rodovia Anchieta", 
                coordenadas: [-45.8880, -23.1917],
                tipo: "referencia"
            },
            { 
                nome: "Av. Rotary", 
                coordenadas: [-45.8855, -23.1940],
                tipo: "parada"
            },
            { 
                nome: "Av. João Firmino", 
                coordenadas: [-45.8828, -23.1967],
                tipo: "parada"
            },
            { 
                nome: "Rua Tiradentes (retorno)", 
                coordenadas: [-45.8801, -23.1994],
                tipo: "parada"
            },
            { 
                nome: "Rua Jardim (retorno)", 
                coordenadas: [-45.8774, -23.2021],
                tipo: "parada"
            },
            { 
                nome: "Av. Dom Pedro de Alcântara (retorno)", 
                coordenadas: [-45.8747, -23.2048],
                tipo: "parada"
            },
            { 
                nome: "Wheaton Brasil", 
                coordenadas: [-45.8719, -23.2076],
                tipo: "destino"
            },
            { 
                nome: "Ponto Final - Av. Luiz Pequini, 688", 
                coordenadas: [-45.8675, -23.2115],
                tipo: "chegada"
            }
        ],
        // Horários reais do PDF: 05:05, 13:05, 21:05
        horarios: [
            "05:05", "05:35", "06:05", "06:35", "07:05", "07:35",
            "13:05", "13:35", "14:05", "14:35", "15:05", "15:35",
            "21:05", "21:35", "22:05", "22:35"
        ],
        distancia: "8 km",
        diasOperacao: "2ª a Domingo"
    }
};

// Frota de ônibus
const frota = [
    {
        id: "CAT-001",
        linha: "linha-01",
        numero: "247",
        motorista: "João Silva",
        capacidade: 45,
        status: "em_rota",
        modelo: "Mercedes-Benz OF-1721",
        ano: 2022,
        placa: "ABC-1D23"
    },
    {
        id: "CAT-002",
        linha: "linha-01",
        numero: "248",
        motorista: "Maria Santos",
        capacidade: 45,
        status: "em_rota",
        modelo: "Mercedes-Benz OF-1721",
        ano: 2022,
        placa: "DEF-2G34"
    },
    {
        id: "CAT-003",
        linha: "linha-02",
        numero: "249",
        motorista: "Pedro Oliveira",
        capacidade: 45,
        status: "em_rota",
        modelo: "Volvo B250",
        ano: 2021,
        placa: "GHI-3J45"
    },
    {
        id: "CAT-004",
        linha: "linha-02",
        numero: "250",
        motorista: "Ana Costa",
        capacidade: 45,
        status: "em_rota",
        modelo: "Volvo B250",
        ano: 2021,
        placa: "JKL-4M56"
    },
    {
        id: "CAT-005",
        linha: "linha-03",
        numero: "251",
        motorista: "Carlos Pereira",
        capacidade: 40,
        status: "em_rota",
        modelo: "Marcopolo Torino",
        ano: 2023,
        placa: "MNO-5P67"
    },
    {
        id: "CAT-006",
        linha: "linha-03",
        numero: "252",
        motorista: "Fernanda Lima",
        capacidade: 40,
        status: "em_rota",
        modelo: "Marcopolo Torino",
        ano: 2023,
        placa: "PQR-6S78"
    },
    {
        id: "CAT-007",
        linha: "linha-01",
        numero: "253",
        motorista: "Roberto Alves",
        capacidade: 45,
        status: "em_manutencao",
        modelo: "Mercedes-Benz OF-1721",
        ano: 2022,
        placa: "STU-7T89"
    },
    {
        id: "CAT-008",
        linha: "linha-02",
        numero: "254",
        motorista: "Juliana Martins",
        capacidade: 45,
        status: "disponivel",
        modelo: "Volvo B250",
        ano: 2021,
        placa: "VWX-8U90"
    }
];

// Horários programados
const horarios = {
    "linha-01": [
        { saida: "05:05", chegada: "06:10", periodo: "manha" },
        { saida: "05:35", chegada: "06:40", periodo: "manha" },
        { saida: "06:05", chegada: "07:10", periodo: "manha" },
        { saida: "06:35", chegada: "07:40", periodo: "manha" },
        { saida: "07:05", chegada: "08:10", periodo: "manha" },
        { saida: "07:35", chegada: "08:40", periodo: "manha" },
        { saida: "13:05", chegada: "14:10", periodo: "tarde" },
        { saida: "13:35", chegada: "14:40", periodo: "tarde" },
        { saida: "14:05", chegada: "15:10", periodo: "tarde" },
        { saida: "14:35", chegada: "15:40", periodo: "tarde" },
        { saida: "15:05", chegada: "16:10", periodo: "tarde" },
        { saida: "15:35", chegada: "16:40", periodo: "tarde" },
        { saida: "16:05", chegada: "17:10", periodo: "tarde" },
        { saida: "16:35", chegada: "17:40", periodo: "tarde" },
        { saida: "17:05", chegada: "18:10", periodo: "tarde" },
        { saida: "17:35", chegada: "18:40", periodo: "tarde" }
    ],
    "linha-02": [
        { saida: "05:15", chegada: "06:20", periodo: "manha" },
        { saida: "05:45", chegada: "06:50", periodo: "manha" },
        { saida: "06:15", chegada: "07:20", periodo: "manha" },
        { saida: "06:45", chegada: "07:50", periodo: "manha" },
        { saida: "07:15", chegada: "08:20", periodo: "manha" },
        { saida: "07:45", chegada: "08:50", periodo: "manha" },
        { saida: "13:15", chegada: "14:20", periodo: "tarde" },
        { saida: "13:45", chegada: "14:50", periodo: "tarde" },
        { saida: "14:15", chegada: "15:20", periodo: "tarde" },
        { saida: "14:45", chegada: "15:50", periodo: "tarde" },
        { saida: "15:15", chegada: "16:20", periodo: "tarde" },
        { saida: "15:45", chegada: "16:50", periodo: "tarde" },
        { saida: "16:15", chegada: "17:20", periodo: "tarde" },
        { saida: "16:45", chegada: "17:50", periodo: "tarde" },
        { saida: "17:15", chegada: "18:20", periodo: "tarde" },
        { saida: "17:45", chegada: "18:50", periodo: "tarde" }
    ],
    "linha-03": [
        { saida: "05:25", chegada: "06:30", periodo: "manha" },
        { saida: "05:55", chegada: "07:00", periodo: "manha" },
        { saida: "06:25", chegada: "07:30", periodo: "manha" },
        { saida: "06:55", chegada: "08:00", periodo: "manha" },
        { saida: "07:25", chegada: "08:30", periodo: "manha" },
        { saida: "07:55", chegada: "09:00", periodo: "manha" },
        { saida: "13:25", chegada: "14:30", periodo: "tarde" },
        { saida: "13:55", chegada: "15:00", periodo: "tarde" },
        { saida: "14:25", chegada: "15:30", periodo: "tarde" },
        { saida: "14:55", chegada: "16:00", periodo: "tarde" },
        { saida: "15:25", chegada: "16:30", periodo: "tarde" },
        { saida: "15:55", chegada: "17:00", periodo: "tarde" },
        { saida: "16:25", chegada: "17:30", periodo: "tarde" },
        { saida: "16:55", chegada: "18:00", periodo: "tarde" },
        { saida: "17:25", chegada: "18:30", periodo: "tarde" },
        { saida: "17:55", chegada: "19:00", periodo: "tarde" }
    ]
};

// Status disponíveis
const statusOptions = {
    "em_rota": { text: "Em Rota", color: "#00A86B", class: "active" },
    "disponivel": { text: "Disponível", color: "#0056A8", class: "active" },
    "em_manutencao": { text: "Manutenção", color: "#FF6B35", class: "delayed" },
    "inativo": { text: "Inativo", color: "#6c757d", class: "inactive" }
};

// Dados simulados de posições em tempo real (serão substituídos por WebSocket)
let posicoesTempoReal = {
    "CAT-001": { 
        lat: -23.1915, 
        lng: -45.9090,
        velocidade: 45,
        direcao: 120,
        progresso: 35,
        ultimaAtualizacao: new Date()
    },
    "CAT-002": { 
        lat: -23.1940, 
        lng: -45.9055,
        velocidade: 52,
        direcao: 85,
        progresso: 60,
        ultimaAtualizacao: new Date()
    },
    "CAT-003": { 
        lat: -23.1870, 
        lng: -45.9175,
        velocidade: 38,
        direcao: 200,
        progresso: 25,
        ultimaAtualizacao: new Date()
    },
    "CAT-004": { 
        lat: -23.1925, 
        lng: -45.9110,
        velocidade: 48,
        direcao: 150,
        progresso: 70,
        ultimaAtualizacao: new Date()
    },
    "CAT-005": { 
        lat: -23.1845, 
        lng: -45.9015,
        velocidade: 42,
        direcao: 300,
        progresso: 40,
        ultimaAtualizacao: new Date()
    },
    "CAT-006": { 
        lat: -23.1860, 
        lng: -45.9040,
        velocidade: 55,
        direcao: 20,
        progresso: 55,
        ultimaAtualizacao: new Date()
    }
};

// Exportar dados para uso global
if (typeof window !== 'undefined') {
    window.itinerarios = itinerarios;
    window.frota = frota;
    window.horarios = horarios;
    window.statusOptions = statusOptions;
    window.posicoesTempoReal = posicoesTempoReal;
}