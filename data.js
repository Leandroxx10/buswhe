// Dados estáticos do sistema de rastreamento Catirose - Wheaton

// Itinerários completos das linhas (coordenadas aproximadas de São José dos Campos/SP)
const itinerarios = {
    "linha-01": {
        nome: "Linha 01 - Wheaton",
        pontos: [
            [-45.9125, -23.1896], // Ponto de partida
            [-45.9102, -23.1901],
            [-45.9088, -23.1912],
            [-45.9075, -23.1923],
            [-45.9061, -23.1934],
            [-45.9047, -23.1945],
            [-45.9033, -23.1956],
            [-45.9019, -23.1967],
            [-45.9005, -23.1978],
            [-45.8991, -23.1989], // Wheaton
            [-45.8977, -23.2000],
            [-45.8963, -23.2011],
            [-45.8949, -23.2022],
            [-45.8935, -23.2033]
        ],
        paradas: [
            { nome: "Terminal Central", coordenadas: [-45.9125, -23.1896] },
            { nome: "Av. São João", coordenadas: [-45.9102, -23.1901] },
            { nome: "Rua das Flores", coordenadas: [-45.9088, -23.1912] },
            { nome: "Praça da República", coordenadas: [-45.9075, -23.1923] },
            { nome: "Av. Brasil", coordenadas: [-45.9061, -23.1934] },
            { nome: "Shopping Center", coordenadas: [-45.9047, -23.1945] },
            { nome: "Hospital Municipal", coordenadas: [-45.9033, -23.1956] },
            { nome: "Universidade", coordenadas: [-45.9019, -23.1967] },
            { nome: "Parque Industrial", coordenadas: [-45.9005, -23.1978] },
            { nome: "Wheaton Brasil", coordenadas: [-45.8991, -23.1989] },
            { nome: "Condomínio Portal do Sol", coordenadas: [-45.8977, -23.2000] },
            { nome: "Supermercado", coordenadas: [-45.8963, -23.2011] },
            { nome: "Posto de Saúde", coordenadas: [-45.8949, -23.2022] },
            { nome: "Terminal Leste", coordenadas: [-45.8935, -23.2033] }
        ],
        horarios: ["05:05", "05:35", "06:05", "06:35", "07:05", "07:35", "13:05", "13:35", "14:05", "14:35", "15:05", "15:35", "16:05", "16:35", "17:05", "17:35"]
    },
    "linha-02": {
        nome: "Linha 02 - Industrial",
        pontos: [
            [-45.9200, -23.1850],
            [-45.9185, -23.1862],
            [-45.9170, -23.1874],
            [-45.9155, -23.1886],
            [-45.9140, -23.1898],
            [-45.9125, -23.1910],
            [-45.9110, -23.1922],
            [-45.9095, -23.1934],
            [-45.9080, -23.1946],
            [-45.9065, -23.1958],
            [-45.9050, -23.1970],
            [-45.9035, -23.1982]
        ],
        paradas: [
            { nome: "Terminal Norte", coordenadas: [-45.9200, -23.1850] },
            { nome: "Rua Industrial", coordenadas: [-45.9185, -23.1862] },
            { nome: "Fábrica Textil", coordenadas: [-45.9170, -23.1874] },
            { nome: "Distrito Industrial", coordenadas: [-45.9155, -23.1886] },
            { nome: "Armazéns Gerais", coordenadas: [-45.9140, -23.1898] },
            { nome: "Posto Combustível", coordenadas: [-45.9125, -23.1910] },
            { nome: "Restaurante", coordenadas: [-45.9110, -23.1922] },
            { nome: "Escola Técnica", coordenadas: [-45.9095, -23.1934] },
            { nome: "Parque Tecnológico", coordenadas: [-45.9080, -23.1946] },
            { nome: "Wheaton Brasil", coordenadas: [-45.9065, -23.1958] },
            { nome: "Condomínio Industrial", coordenadas: [-45.9050, -23.1970] },
            { nome: "Terminal Sul", coordenadas: [-45.9035, -23.1982] }
        ],
        horarios: ["05:15", "05:45", "06:15", "06:45", "07:15", "07:45", "13:15", "13:45", "14:15", "14:45", "15:15", "15:45", "16:15", "16:45", "17:15", "17:45"]
    },
    "linha-03": {
        nome: "Linha 03 - Centro",
        pontos: [
            [-45.8950, -23.1800],
            [-45.8965, -23.1812],
            [-45.8980, -23.1824],
            [-45.8995, -23.1836],
            [-45.9010, -23.1848],
            [-45.9025, -23.1860],
            [-45.9040, -23.1872],
            [-45.9055, -23.1884],
            [-45.9070, -23.1896],
            [-45.9085, -23.1908],
            [-45.9100, -23.1920],
            [-45.9115, -23.1932]
        ],
        paradas: [
            { nome: "Terminal Oeste", coordenadas: [-45.8950, -23.1800] },
            { nome: "Praça da Matriz", coordenadas: [-45.8965, -23.1812] },
            { nome: "Catedral", coordenadas: [-45.8980, -23.1824] },
            { nome: "Prefeitura", coordenadas: [-45.8995, -23.1836] },
            { nome: "Fórum", coordenadas: [-45.9010, -23.1848] },
            { nome: "Teatro Municipal", coordenadas: [-45.9025, -23.1860] },
            { nome: "Biblioteca", coordenadas: [-45.9040, -23.1872] },
            { nome: "Museu", coordenadas: [-45.9055, -23.1884] },
            { nome: "Shopping Downtown", coordenadas: [-45.9070, -23.1896] },
            { nome: "Wheaton Brasil", coordenadas: [-45.9085, -23.1908] },
            { nome: "Hospital Santa Casa", coordenadas: [-45.9100, -23.1920] },
            { nome: "Terminal Leste", coordenadas: [-45.9115, -23.1932] }
        ],
        horarios: ["05:25", "05:55", "06:25", "06:55", "07:25", "07:55", "13:25", "13:55", "14:25", "14:55", "15:25", "15:55", "16:25", "16:55", "17:25", "17:55"]
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