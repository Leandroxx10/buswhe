[file name]: data.js
[file content begin]
/* ============================================================
   DATA.JS - Sistema de Rastreamento de Fretados
   Empresa: Catirose
   Cliente: Wheaton Brasil - São Bernardo do Campo
   Linha: 08 (Circular)
   ============================================================ */

/* =========================
   STATUS DISPONÍVEIS
   ========================= */
const statusOptions = {
  em_rota: {
    label: "Em rota",
    color: "#2ecc71"
  },
  parado: {
    label: "Parado",
    color: "#f1c40f"
  },
  fora_de_servico: {
    label: "Fora de serviço",
    color: "#e74c3c"
  }
};

/* =========================
   ITINERÁRIOS
   ========================= */
const itinerarios = {
  "linha-08": {
    id: "linha-08",
    nome: "Linha 08 - Wheaton SBC (Circular)",
    tipo: "circular",
    pontos: [
      /* ===== IDA - ENTRADA ===== */
      [-46.5559, -23.7048], // Av. São Bernardo x R. dos Vianas
      [-46.5538, -23.7054], // Rua dos Vianas
      [-46.5515, -23.7072], // Av. Luiz Pequini (Assembléia)
      [-46.5498, -23.7081], // Rua Helena Aparecida Secol
      [-46.5482, -23.7093], // Av. Nelson Mandela
      [-46.5464, -23.7110], // Av. Luiz Pequini
      [-46.5451, -23.7128], // Av. Pery Ronchetti
      [-46.5460, -23.7141], // Rua Maria do Carmo da Silva
      [-46.5485, -23.7156], // Rua dos Vianas
      [-46.5502, -23.7169], // Rua Itamarati
      [-46.5519, -23.7181], // Rua Joana Zanólia Degelo
      [-46.5534, -23.7194], // Rua Giacinto Tognato
      [-46.5550, -23.7206], // Rua Celeste Pinchieri
      [-46.5566, -23.7218], // Rua Amadeu Rossignolo
      [-46.5583, -23.7229], // Rua dos Vianas
      [-46.5601, -23.7241], // Av. Princesa Francisca Carolina
      [-46.5618, -23.7256], // Av. Imperador D. Pedro II
      [-46.5635, -23.7271], // Rua Giácomo Versolato
      [-46.5650, -23.7285], // Rua Vicente Galafassi
      [-46.5666, -23.7299], // Rua Paschoal Gastaldo
      [-46.5682, -23.7313], // Rua Tiradentes
      [-46.5697, -23.7326], // Rua Américo Brasiliense
      [-46.5711, -23.7340], // Rua Joaquim Nabuco
      [-46.5724, -23.7356], // Av. João Firmino
      [-46.5738, -23.7372], // Av. Álvaro Guimarães
      [-46.5751, -23.7390], // Wheaton Brasil SBC

      /* ===== VOLTA - SAÍDA ===== */
      [-46.5740, -23.7374], // Av. Álvaro Guimarães
      [-46.5726, -23.7358], // Av. João Firmino
      [-46.5712, -23.7343], // Rua Frei Gaspar
      [-46.5696, -23.7328], // Av. Faria Lima
      [-46.5680, -23.7312], // Av. Rotary
      [-46.5664, -23.7298], // Rua Tiradentes
      [-46.5648, -23.7283], // Av. Francisco Prestes Maia
      [-46.5633, -23.7268], // Rua José Benedetti
      [-46.5619, -23.7253], // Rua Giácomo Versolato
      [-46.5604, -23.7239], // Rua Vicente Galafassi
      [-46.5589, -23.7224], // Av. Wallace Simonsen
      [-46.5574, -23.7210], // Trav. Beniamino Gigli
      [-46.5560, -23.7195], // Av. D. Pedro de Alcântara
      [-46.5545, -23.7179], // Av. Pery Ronchetti
      [-46.5531, -23.7164], // Rua Érico Verissimo
      [-46.5517, -23.7149], // Rua dos Vianas
      [-46.5503, -23.7134], // Rua Itamarati
      [-46.5489, -23.7119], // Rua Joana Zanólia Degelo
      [-46.5475, -23.7104], // Rua Giacinto Tognato
      [-46.5462, -23.7089], // Rua Reducíno Germano da Silva
      [-46.5559, -23.7048]  // Rua dos Vianas x Av. São Bernardo
    ],
    pontosInfo: [
      /* ===== IDA - ENTRADA ===== */
      { nome: "Av. São Bernardo x R. dos Vianas" },
      { nome: "Rua dos Vianas" },
      { nome: "Av. Luiz Pequini (Assembléia)" },
      { nome: "Rua Helena Aparecida Secol" },
      { nome: "Av. Nelson Mandela" },
      { nome: "Av. Luiz Pequini" },
      { nome: "Av. Pery Ronchetti" },
      { nome: "Rua Maria do Carmo da Silva" },
      { nome: "Rua dos Vianas" },
      { nome: "Rua Itamarati" },
      { nome: "Rua Joana Zanólia Degelo" },
      { nome: "Rua Giacinto Tognato" },
      { nome: "Rua Celeste Pinchieri" },
      { nome: "Rua Amadeu Rossignolo" },
      { nome: "Rua dos Vianas" },
      { nome: "Av. Princesa Francisca Carolina" },
      { nome: "Av. Imperador D. Pedro II" },
      { nome: "Rua Giácomo Versolato" },
      { nome: "Rua Vicente Galafassi" },
      { nome: "Rua Paschoal Gastaldo" },
      { nome: "Rua Tiradentes" },
      { nome: "Rua Américo Brasiliense" },
      { nome: "Rua Joaquim Nabuco" },
      { nome: "Av. João Firmino" },
      { nome: "Av. Álvaro Guimarães" },
      { nome: "Wheaton Brasil SBC" },

      /* ===== VOLTA - SAÍDA ===== */
      { nome: "Av. Álvaro Guimarães" },
      { nome: "Av. João Firmino" },
      { nome: "Rua Frei Gaspar" },
      { nome: "Av. Faria Lima" },
      { nome: "Av. Rotary" },
      { nome: "Rua Tiradentes" },
      { nome: "Av. Francisco Prestes Maia" },
      { nome: "Rua José Benedetti" },
      { nome: "Rua Giácomo Versolato" },
      { nome: "Rua Vicente Galafassi" },
      { nome: "Av. Wallace Simonsen" },
      { nome: "Trav. Beniamino Gigli" },
      { nome: "Av. D. Pedro de Alcântara" },
      { nome: "Av. Pery Ronchetti" },
      { nome: "Rua Érico Verissimo" },
      { nome: "Rua dos Vianas" },
      { nome: "Rua Itamarati" },
      { nome: "Rua Joana Zanólia Degelo" },
      { nome: "Rua Giacinto Tognato" },
      { nome: "Rua Reducíno Germano da Silva" },
      { nome: "Rua dos Vianas x Av. São Bernardo" }
    ]
  }
};

/* =========================
   FROTA
   ========================= */
const frota = [
  {
    id: "CAT-008",
    numero: "008",
    linha: "linha-08",
    status: "em_rota",
    motorista: "Motorista Padrão",
    placa: "EBC-8008",
    modelo: "Mercedes-Benz OF-1721",
    ano: 2022,
    capacidade: 45
  }
];

/* =========================
   HORÁRIOS
   ========================= */
const horarios = {
  "linha-08": [
    { saida: "05:00", chegada: "05:45", status: "concluido" },
    { saida: "07:00", chegada: "07:45", status: "em_andamento" },
    { saida: "12:55", chegada: "13:40", status: "programado" },
    { saida: "17:15", chegada: "18:00", status: "programado" },
    { saida: "21:00", chegada: "21:45", status: "programado" }
  ]
};

/* =========================
   POSIÇÃO EM TEMPO REAL
   ========================= */
const posicoesTempoReal = {
  "CAT-008": {
    lng: -46.5451,
    lat: -23.7128,
    progresso: 15, // 15% do percurso
    velocidade_kmh: 38,
    ultimaAtualizacao: new Date().toISOString()
  }
};

/* =========================
   EXPORTAÇÃO GLOBAL
   ========================= */
window.statusOptions = statusOptions;
window.itinerarios = itinerarios;
window.frota = frota;
window.horarios = horarios;
window.posicoesTempoReal = posicoesTempoReal;
[file content end]