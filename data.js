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
      { nome: "Av. São Bernardo x R. dos Vianas", lat: -23.7048, lng: -46.5559 },
      { nome: "Rua dos Vianas", lat: -23.7054, lng: -46.5538 },
      { nome: "Av. Luiz Pequini (Assembléia)", lat: -23.7072, lng: -46.5515 },
      { nome: "Rua Helena Aparecida Secol", lat: -23.7081, lng: -46.5498 },
      { nome: "Av. Nelson Mandela", lat: -23.7093, lng: -46.5482 },
      { nome: "Av. Luiz Pequini", lat: -23.7110, lng: -46.5464 },
      { nome: "Av. Pery Ronchetti", lat: -23.7128, lng: -46.5451 },
      { nome: "Rua Maria do Carmo da Silva", lat: -23.7141, lng: -46.5460 },
      { nome: "Rua dos Vianas", lat: -23.7156, lng: -46.5485 },
      { nome: "Rua Itamarati", lat: -23.7169, lng: -46.5502 },
      { nome: "Rua Joana Zanólia Degelo", lat: -23.7181, lng: -46.5519 },
      { nome: "Rua Giacinto Tognato", lat: -23.7194, lng: -46.5534 },
      { nome: "Rua Celeste Pinchieri", lat: -23.7206, lng: -46.5550 },
      { nome: "Rua Amadeu Rossignolo", lat: -23.7218, lng: -46.5566 },
      { nome: "Rua dos Vianas", lat: -23.7229, lng: -46.5583 },
      { nome: "Av. Princesa Francisca Carolina", lat: -23.7241, lng: -46.5601 },
      { nome: "Av. Imperador D. Pedro II", lat: -23.7256, lng: -46.5618 },
      { nome: "Rua Giácomo Versolato", lat: -23.7271, lng: -46.5635 },
      { nome: "Rua Vicente Galafassi", lat: -23.7285, lng: -46.5650 },
      { nome: "Rua Paschoal Gastaldo", lat: -23.7299, lng: -46.5666 },
      { nome: "Rua Tiradentes", lat: -23.7313, lng: -46.5682 },
      { nome: "Rua Américo Brasiliense", lat: -23.7326, lng: -46.5697 },
      { nome: "Rua Joaquim Nabuco", lat: -23.7340, lng: -46.5711 },
      { nome: "Av. João Firmino", lat: -23.7356, lng: -46.5724 },
      { nome: "Av. Álvaro Guimarães", lat: -23.7372, lng: -46.5738 },
      { nome: "Wheaton Brasil SBC", lat: -23.7390, lng: -46.5751 },

      /* ===== VOLTA - SAÍDA ===== */
      { nome: "Av. Álvaro Guimarães", lat: -23.7374, lng: -46.5740 },
      { nome: "Av. João Firmino", lat: -23.7358, lng: -46.5726 },
      { nome: "Rua Frei Gaspar", lat: -23.7343, lng: -46.5712 },
      { nome: "Av. Faria Lima", lat: -23.7328, lng: -46.5696 },
      { nome: "Av. Rotary", lat: -23.7312, lng: -46.5680 },
      { nome: "Rua Tiradentes", lat: -23.7298, lng: -46.5664 },
      { nome: "Av. Francisco Prestes Maia", lat: -23.7283, lng: -46.5648 },
      { nome: "Rua José Benedetti", lat: -23.7268, lng: -46.5633 },
      { nome: "Rua Giácomo Versolato", lat: -23.7253, lng: -46.5619 },
      { nome: "Rua Vicente Galafassi", lat: -23.7239, lng: -46.5604 },
      { nome: "Av. Wallace Simonsen", lat: -23.7224, lng: -46.5589 },
      { nome: "Trav. Beniamino Gigli", lat: -23.7210, lng: -46.5574 },
      { nome: "Av. D. Pedro de Alcântara", lat: -23.7195, lng: -46.5560 },
      { nome: "Av. Pery Ronchetti", lat: -23.7179, lng: -46.5545 },
      { nome: "Rua Érico Verissimo", lat: -23.7164, lng: -46.5531 },
      { nome: "Rua dos Vianas", lat: -23.7149, lng: -46.5517 },
      { nome: "Rua Itamarati", lat: -23.7134, lng: -46.5503 },
      { nome: "Rua Joana Zanólia Degelo", lat: -23.7119, lng: -46.5489 },
      { nome: "Rua Giacinto Tognato", lat: -23.7104, lng: -46.5475 },
      { nome: "Rua Reducíno Germano da Silva", lat: -23.7089, lng: -46.5462 },
      { nome: "Rua dos Vianas x Av. São Bernardo", lat: -23.7048, lng: -46.5559 }
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
    placa: "EBC-8008"
  }
];

/* =========================
   HORÁRIOS
   ========================= */
const horarios = {
  "linha-08": {
    pontoInicial: ["05:00", "07:00", "12:55", "21:00"],
    wheaton: {
      todosOsDias: ["06:20", "14:20", "22:20"],
      segundaASexta: ["17:15"]
    }
  }
};

/* =========================
   POSIÇÃO EM TEMPO REAL
   ========================= */
const posicoesTempoReal = {
  "CAT-008": {
    lat: -23.7128,
    lng: -46.5451,
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