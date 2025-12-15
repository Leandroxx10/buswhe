// Sistema de Rastreamento Catirose - Wheaton Fretados
// DADOS SOMENTE DA LINHA 8

// Itinerário completo da Linha 8 (coordenadas aproximadas de São José dos Campos)
const itinerarios = {
    "linha-08": {
        nome: "Linha 08 - Industrial/Farina/Baeta Neves/Nova Petrópolis",
        pontos: [
            // PONTO INICIAL: Av. São Bernardo x R. dos Vianas
            [-45.8452, -23.2251],
            
            // === ENTRADA - IDA PARA WHEATON ===
            // Rua dos Vianas
            [-45.8470, -23.2235],
            // Av. Luiz Pequini (Assembléia)
            [-45.8495, -23.2210],
            // Rua Helena Aparecida Secol
            [-45.8520, -23.2185],
            // Av. Nelson Mandela
            [-45.8545, -23.2160],
            // Av. Luiz Pequini
            [-45.8570, -23.2135],
            // Av. Pery Ronchetti
            [-45.8595, -23.2110],
            // Rua Maria do Carmo da Silva
            [-45.8620, -23.2085],
            // Rua dos Vianas (trecho)
            [-45.8645, -23.2060],
            // Rua Itamarati
            [-45.8670, -23.2035],
            // Rua Joana Zanólia Degelo
            [-45.8695, -23.2010],
            // Rua Giacinto Tognato
            [-45.8720, -23.1985],
            // Rua Celeste Pinchieri
            [-45.8745, -23.1960],
            // Rua Amadeu Rossignolo
            [-45.8770, -23.1935],
            // Rua dos Vianas
            [-45.8795, -23.1910],
            // Av. Princesa Francisca Carolina
            [-45.8820, -23.1885],
            // Av. Imperador D. Pedro II
            [-45.8845, -23.1860],
            // Rua Giácomo Versolato
            [-45.8870, -23.1835],
            // Rua Vicente Galafassi
            [-45.8895, -23.1810],
            // Rua Paschoal Gastaldo
            [-45.8920, -23.1785],
            // Rua Tiradentes
            [-45.8945, -23.1760],
            // Rua Américo Brasiliense
            [-45.8970, -23.1735],
            // Rua Joaquim Nabuco
            [-45.8995, -23.1710],
            // Av. João Firmino
            [-45.9020, -23.1685],
            // Av. Álvaro Guimarães
            [-45.9045, -23.1660],
            
            // WHEATON (Destino - entrada)
            [-45.9060, -23.1645],
            
            // === SAÍDA - VOLTA DO WHEATON ===
            // Av. Álvaro Guimarães (saída)
            [-45.9040, -23.1655],
            // Av. João Firmino
            [-45.9015, -23.1680],
            // Rua Frei Gaspar
            [-45.8990, -23.1705],
            // Av. Faria Lima
            [-45.8965, -23.1730],
            // Av. Rotary
            [-45.8940, -23.1755],
            // Rua Tiradentes
            [-45.8915, -23.1780],
            // Av. Francisco Prestes Maia
            [-45.8890, -23.1805],
            // Rua José Benedetti
            [-45.8865, -23.1830],
            // Rua Giácomo Versolato
            [-45.8840, -23.1855],
            // Rua Vicente Galafassi
            [-45.8815, -23.1880],
            // Av. Wallace Simonsen
            [-45.8790, -23.1905],
            // Trav. Beniamino Gigli
            [-45.8765, -23.1930],
            // Av. D. Pedro de Alcântara
            [-45.8740, -23.1955],
            // Av. Pery Ronchetti
            [-45.8715, -23.1980],
            // Rua Érico Verissimo
            [-45.8690, -23.2005],
            // Rua dos Vianas
            [-45.8665, -23.2030],
            // Rua Itamarati
            [-45.8640, -23.2055],
            // Rua Joana Zanólia Degelo
            [-45.8615, -23.2080],
            // Rua Giacinto Tognato
            [-45.8590, -23.2105],
            // Rua Reducíno Germano da Silva
            [-45.8565, -23.2130],
            // Rua dos Vianas x Av. São Bernardo (FINAL)
            [-45.8540, -23.2155],
            [-45.8515, -23.2180],
            [-45.8490, -23.2205],
            [-45.8465, -23.2230],
            // PONTO FINAL: Rua dos Vianas x Av. São Bernardo
            [-45.8448, -23.2248]
        ],
        paradas: [
            // IDA
            { nome: "Ponto Inicial - Av. São Bernardo x R. dos Vianas", coordenadas: [-45.8452, -23.2251], tipo: "partida" },
            { nome: "Rua dos Vianas", coordenadas: [-45.8470, -23.2235], tipo: "parada" },
            { nome: "Av. Luiz Pequini (Assembléia)", coordenadas: [-45.8495, -23.2210], tipo: "parada" },
            { nome: "Rua Helena Aparecida Secol", coordenadas: [-45.8520, -23.2185], tipo: "parada" },
            { nome: "Av. Nelson Mandela", coordenadas: [-45.8545, -23.2160], tipo: "parada" },
            { nome: "Av. Luiz Pequini", coordenadas: [-45.8570, -23.2135], tipo: "parada" },
            { nome: "Av. Pery Ronchetti", coordenadas: [-45.8595, -23.2110], tipo: "parada" },
            { nome: "Rua Maria do Carmo da Silva", coordenadas: [-45.8620, -23.2085], tipo: "parada" },
            { nome: "Rua Itamarati", coordenadas: [-45.8670, -23.2035], tipo: "parada" },
            { nome: "Rua Joana Zanólia Degelo", coordenadas: [-45.8695, -23.2010], tipo: "parada" },
            { nome: "Rua Giacinto Tognato", coordenadas: [-45.8720, -23.1985], tipo: "parada" },
            { nome: "Rua Celeste Pinchieri", coordenadas: [-45.8745, -23.1960], tipo: "parada" },
            { nome: "Rua Amadeu Rossignolo", coordenadas: [-45.8770, -23.1935], tipo: "parada" },
            { nome: "Av. Princesa Francisca Carolina", coordenadas: [-45.8820, -23.1885], tipo: "parada" },
            { nome: "Av. Imperador D. Pedro II", coordenadas: [-45.8845, -23.1860], tipo: "parada" },
            { nome: "Rua Giácomo Versolato", coordenadas: [-45.8870, -23.1835], tipo: "parada" },
            { nome: "Rua Vicente Galafassi", coordenadas: [-45.8895, -23.1810], tipo: "parada" },
            { nome: "Rua Paschoal Gastaldo", coordenadas: [-45.8920, -23.1785], tipo: "parada" },
            { nome: "Rua Tiradentes", coordenadas: [-45.8945, -23.1760], tipo: "parada" },
            { nome: "Rua Américo Brasiliense", coordenadas: [-45.8970, -23.1735], tipo: "parada" },
            { nome: "Rua Joaquim Nabuco", coordenadas: [-45.8995, -23.1710], tipo: "parada" },
            { nome: "Av. João Firmino", coordenadas: [-45.9020, -23.1685], tipo: "parada" },
            { nome: "Av. Álvaro Guimarães", coordenadas: [-45.9045, -23.1660], tipo: "parada" },
            
            // WHEATON (ponto de destino/partida)
            { nome: "Wheaton Brasil (Entrada/Portão)", coordenadas: [-45.9060, -23.1645], tipo: "destino" },
            
            // VOLTA
            { nome: "Av. João Firmino (volta)", coordenadas: [-45.9015, -23.1680], tipo: "parada" },
            { nome: "Rua Frei Gaspar", coordenadas: [-45.8990, -23.1705], tipo: "parada" },
            { nome: "Av. Faria Lima", coordenadas: [-45.8965, -23.1730], tipo: "parada" },
            { nome: "Av. Rotary", coordenadas: [-45.8940, -23.1755], tipo: "parada" },
            { nome: "Av. Francisco Prestes Maia", coordenadas: [-45.8890, -23.1805], tipo: "parada" },
            { nome: "Rua José Benedetti", coordenadas: [-45.8865, -23.1830], tipo: "parada" },
            { nome: "Av. Wallace Simonsen", coordenadas: [-45.8790, -23.1905], tipo: "parada" },
            { nome: "Trav. Beniamino Gigli", coordenadas: [-45.8765, -23.1930], tipo: "parada" },
            { nome: "Av. D. Pedro de Alcântara", coordenadas: [-45.8740, -23.1955], tipo: "parada" },
            { nome: "Rua Érico Verissimo", coordenadas: [-45.8690, -23.2005], tipo: "parada" },
            { nome: "Rua Reducíno Germano da Silva", coordenadas: [-45.8565, -23.2130], tipo: "parada" },
            { nome: "Ponto Final - Rua dos Vianas x Av. São Bernardo", coordenadas: [-45.8448, -23.2248], tipo: "chegada" }
        ],
        // Horários conforme especificado
        horarios: {
            saidaPontoInicial: ["05:00", "07:00", "12:55", "21:00"], // Todos os dias
            saidaWheaton: {
                segunda_a_sexta: ["06:20", "14:20", "17:15", "22:20"],
                sabado_domingo_feriado: ["06:20", "14:20", "22:20"] // Sem 17:15
            }
        },
        diasOperacao: {
            geral: "2ª a Domingo (05:00, 12:55, 21:00)",
            especial: "2ª a 6ª Feira (07:00, 17:15) - Exceto Feriados"
        },
        bairros: ["JD. Industrial", "JD. Farina", "B. Baeta Neves", "B. Nova Petrópolis"]
    }
};

// Frota SOMENTE da Linha 8
const frota = [
    {
        id: "CAT-008-01",
        linha: "linha-08",
        numero: "801",
        motorista: "Carlos Mendes",
        capacidade: 45,
        status: "em_rota",
        modelo: "Mercedes-Benz OF-1721",
        ano: 2023,
        placa: "CAT8A01",
        turno: "madrugada", // 05:00
        horarioPartida: "05:00"
    },
    {
        id: "CAT-008-02",
        linha: "linha-08",
        numero: "802",
        motorista: "Ana Paula Costa",
        capacidade: 45,
        status: "em_rota",
        modelo: "Volvo B250",
        ano: 2022,
        placa: "CAT8B02",
        turno: "manha", // 07:00 (2ª-6ª)
        horarioPartida: "07:00"
    },
    {
        id: "CAT-008-03",
        linha: "linha-08",
        numero: "803",
        motorista: "Roberto Santos",
        capacidade: 45,
        status: "em_rota",
        modelo: "Mercedes-Benz OF-1721",
        ano: 2023,
        placa: "CAT8C03",
        turno: "tarde", // 12:55
        horarioPartida: "12:55"
    },
    {
        id: "CAT-008-04",
        linha: "linha-08",
        numero: "804",
        motorista: "Fernanda Lima",
        capacidade: 45,
        status: "em_rota",
        modelo: "Volvo B250",
        ano: 2022,
        placa: "CAT8D04",
        turno: "noite", // 21:00
        horarioPartida: "21:00"
    }
];

// Horários programados (estrutura simplificada para o sistema)
const horarios = {
    "linha-08": [
        { saida: "05:00", chegada: "06:20", tipo: "ponto_inicial", dias: "todos" },
        { saida: "06:20", chegada: "07:40", tipo: "wheaton", dias: "todos" },
        { saida: "07:00", chegada: "08:20", tipo: "ponto_inicial", dias: "segunda_sexta" },
        { saida: "12:55", chegada: "14:15", tipo: "ponto_inicial", dias: "todos" },
        { saida: "14:20", chegada: "15:40", tipo: "wheaton", dias: "todos" },
        { saida: "17:15", chegada: "18:35", tipo: "wheaton", dias: "segunda_sexta" },
        { saida: "21:00", chegada: "22:20", tipo: "ponto_inicial", dias: "todos" },
        { saida: "22:20", chegada: "23:40", tipo: "wheaton", dias: "todos" }
    ]
};

// Status disponíveis
const statusOptions = {
    "em_rota": { text: "Em Rota", color: "#00A86B", class: "active" },
    "disponivel": { text: "Disponível", color: "#0056A8", class: "active" },
    "em_manutencao": { text: "Manutenção", color: "#FF6B35", class: "delayed" },
    "inativo": { text: "Inativo", color: "#6c757d", class: "inactive" }
};

// Dados simulados de posições em tempo real - SOMENTE LINHA 8
let posicoesTempoReal = {
    "CAT-008-01": { 
        lat: -23.2185, 
        lng: -45.8520, // Rua Helena Aparecida Secol
        velocidade: 42,
        direcao: 120,
        progresso: 15,
        ultimaAtualizacao: new Date(),
        destino: "Wheaton"
    },
    "CAT-008-02": { 
        lat: -23.1885, 
        lng: -45.8820, // Av. Princesa Francisca Carolina
        velocidade: 38,
        direcao: 85,
        progresso: 45,
        ultimaAtualizacao: new Date(),
        destino: "Wheaton"
    },
    "CAT-008-03": { 
        lat: -23.1685, 
        lng: -45.9020, // Av. João Firmino (perto da Wheaton)
        velocidade: 35,
        direcao: 200,
        progresso: 75,
        ultimaAtualizacao: new Date(),
        destino: "Wheaton"
    },
    "CAT-008-04": { 
        lat: -23.1880, 
        lng: -45.8815, // Rua Vicente Galafassi (volta)
        velocidade: 48,
        direcao: 300,
        progresso: 60,
        ultimaAtualizacao: new Date(),
        destino: "Ponto Final"
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