// Sistema de Rastreamento Catirose - Wheaton Fretados
// LINHA 8 - APENAS 1 ÔNIBUS - SÃO BERNARDO DO CAMPO

// Itinerário da Linha 8 em SBC
const itinerarios = {
    "linha-08": {
        nome: "Linha 08 - Industrial/Farina/Baeta Neves/Nova Petrópolis",
        pontos: [
            // PONTO INICIAL: Av. São Bernardo x R. dos Vianas, SBC
            [-46.5590, -23.7015],
            
            // ENTRADA - IDA PARA WHEATON
            [-46.5575, -23.7002], // Rua dos Vianas
            [-46.5550, -23.6985], // Av. Luiz Pequini
            [-46.5525, -23.6968], // Rua Helena Secol
            [-46.5500, -23.6950], // Av. Nelson Mandela
            [-46.5475, -23.6932], // Av. Luiz Pequini
            [-46.5450, -23.6915], // Av. Pery Ronchetti
            [-46.5425, -23.6898], // Rua Maria do Carmo
            [-46.5400, -23.6880], // Rua dos Vianas
            [-46.5375, -23.6863], // Rua Itamarati
            [-46.5350, -23.6845], // Rua Joana Degelo
            [-46.5325, -23.6828], // Rua Giacinto Tognato
            [-46.5300, -23.6810], // Rua Celeste Pinchieri
            [-46.5275, -23.6793], // Rua Amadeu Rossignolo
            [-46.5250, -23.6775], // Rua dos Vianas
            [-46.5225, -23.6758], // Av. Princesa Francisca
            [-46.5200, -23.6740], // Av. Imperador D. Pedro II
            [-46.5175, -23.6723], // Rua Giácomo Versolato
            [-46.5150, -23.6705], // Rua Vicente Galafassi
            [-46.5125, -23.6688], // Rua Paschoal Gastaldo
            [-46.5100, -23.6670], // Rua Tiradentes
            [-46.5075, -23.6653], // Rua Américo Brasiliense
            [-46.5050, -23.6635], // Rua Joaquim Nabuco
            [-46.5025, -23.6618], // Av. João Firmino
            [-46.5000, -23.6600], // Av. Álvaro Guimarães
            
            // WHEATON BRASIL SBC
            [-46.4985, -23.6585],
            
            // SAÍDA - VOLTA DO WHEATON
            [-46.5005, -23.6595], // Av. Álvaro Guimarães
            [-46.5030, -23.6613], // Av. João Firmino
            [-46.5055, -23.6630], // Rua Frei Gaspar
            [-46.5080, -23.6648], // Av. Faria Lima
            [-46.5105, -23.6665], // Av. Rotary
            [-46.5130, -23.6683], // Rua Tiradentes
            [-46.5155, -23.6700], // Av. Francisco Prestes Maia
            [-46.5180, -23.6718], // Rua José Benedetti
            [-46.5205, -23.6735], // Rua Giácomo Versolato
            [-46.5230, -23.6753], // Rua Vicente Galafassi
            [-46.5255, -23.6770], // Av. Wallace Simonsen
            [-46.5280, -23.6788], // Trav. Beniamino Gigli
            [-46.5305, -23.6805], // Av. D. Pedro de Alcântara
            [-46.5330, -23.6823], // Av. Pery Ronchetti
            [-46.5355, -23.6840], // Rua Érico Verissimo
            [-46.5380, -23.6858], // Rua dos Vianas
            [-46.5405, -23.6875], // Rua Itamarati
            [-46.5430, -23.6893], // Rua Joana Degelo
            [-46.5455, -23.6910], // Rua Giacinto Tognato
            [-46.5480, -23.6928], // Rua Reducíno Germano
            [-46.5505, -23.6945], // Voltando
            [-46.5530, -23.6963], // Voltando
            [-46.5555, -23.6980], // Voltando
            [-46.5580, -23.6998], // Voltando
            
            // PONTO FINAL
            [-46.5595, -23.7010]
        ],
        paradas: [
            { nome: "Ponto Inicial - Av. São Bernardo x R. dos Vianas", coordenadas: [-46.5590, -23.7015], tipo: "partida" },
            { nome: "Wheaton Brasil SBC", coordenadas: [-46.4985, -23.6585], tipo: "destino" },
            { nome: "Ponto Final - Rua dos Vianas x Av. São Bernardo", coordenadas: [-46.5595, -23.7010], tipo: "chegada" }
        ],
        // Horários reais do PDF
        horarios: ["05:00", "07:00", "12:55", "21:00"],
        cidade: "São Bernardo do Campo - SP"
    }
};

// FROTA: APENAS 1 ÔNIBUS
const frota = [
    {
        id: "CAT-008",
        linha: "linha-08",
        numero: "008",
        motorista: "Motorista da Linha 08",
        capacidade: 45,
        status: "em_rota",
        modelo: "Mercedes-Benz",
        ano: 2023,
        placa: "CAT-8A08",
        cidade: "SBC"
    }
];

// Horários programados
const horarios = {
    "linha-08": [
        { saida: "05:00", chegada: "06:20" },
        { saida: "07:00", chegada: "08:20" },
        { saida: "12:55", chegada: "14:15" },
        { saida: "21:00", chegada: "22:20" }
    ]
};

// Status
const statusOptions = {
    "em_rota": { text: "Em Rota", color: "#00A86B", class: "active" }
};

// Dados simulados: APENAS 1 ÔNIBUS
let posicoesTempoReal = {
    "CAT-008": { 
        lat: -23.6968, // Começa na Rua Helena Secol
        lng: -46.5525,
        velocidade: 40,
        progresso: 20,
        ultimaAtualizacao: new Date()
    }
};

// Exportar dados
if (typeof window !== 'undefined') {
    window.itinerarios = itinerarios;
    window.frota = frota;
    window.horarios = horarios;
    window.statusOptions = statusOptions;
    window.posicoesTempoReal = posicoesTempoReal;
}