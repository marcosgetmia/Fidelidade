// ─── Labels ──────────────────────────────────────────────────────────────────
export const MONTHS = ['Jun/24','Jul/24','Ago/24','Set/24','Out/24','Nov/24','Dez/24','Jan/25','Fev/25','Mar/25','Abr/25','Mai/25']

// ─── Receita mensal (R$ Mi) ───────────────────────────────────────────────────
export const receitaMensal = MONTHS.map((month, i) => ({
  month,
  b2b:   +( 83 + i * 2.1 + Math.sin(i * 0.8) * 7  ).toFixed(1),
  b2c:   +( 52 + i * 1.6 + Math.sin(i * 0.6) * 5  ).toFixed(1),
  clube: +( 17 + i * 0.5 + Math.sin(i * 0.4) * 1.5).toFixed(1),
  aic:   +( 10 + i * 0.3 + Math.sin(i * 0.5) * 1.2).toFixed(1),
}))

// ─── Earn / Burn mensal (Bi pontos) ──────────────────────────────────────────
export const earnBurnMensal = MONTHS.map((month, i) => ({
  month,
  earn: +( 158 + i * 2.4 + Math.sin(i * 0.9) * 11 ).toFixed(1),
  burn: +( 104 + i * 1.7 + Math.sin(i * 0.7) * 7  ).toFixed(1),
}))

// ─── Liability mensal (R$ Mi) ─────────────────────────────────────────────────
export const liabilityMensal = MONTHS.map((month, i) => ({
  month,
  liability: +( 1080 + i * 14 + Math.sin(i * 0.6) * 25 ).toFixed(0),
  breakage:  +( 36   + i * 0.9 + Math.sin(i * 0.4) * 3  ).toFixed(1),
}))

// ─── Clientes ativos (Mi) ────────────────────────────────────────────────────
export const clientesMensal = MONTHS.map((month, i) => ({
  month,
  ativos30:  +( 3.82 + i * 0.040 + Math.sin(i * 0.5) * 0.09 ).toFixed(2),
  ativos90:  +( 6.20 + i * 0.058 + Math.sin(i * 0.4) * 0.11 ).toFixed(2),
  novos:     +( 178  + i * 2.8   + Math.sin(i * 0.8) * 18   ).toFixed(0),
}))

// ─── Clube mensal ─────────────────────────────────────────────────────────────
export const clubeMensal = MONTHS.map((month, i) => ({
  month,
  base:         Math.round(1820000 + i * 26000 + Math.sin(i * 0.5) * 8000),
  adesoes:      Math.round(44000   + i * 700   + Math.sin(i * 0.7) * 3500),
  cancelamentos:Math.round(14500   + Math.sin(i * 0.5) * 1800),
  arpu:         +( 38.4 + i * 0.3 + Math.sin(i * 0.3) * 1.2 ).toFixed(2),
}))

// ─── AIC mensal ───────────────────────────────────────────────────────────────
export const aicMensal = MONTHS.map((month, i) => ({
  month,
  base:      +( 3.18 + i * 0.024 + Math.sin(i * 0.4) * 0.04 ).toFixed(2),
  novosCartoes: Math.round(38000 + i * 600 + Math.sin(i * 0.6) * 2500),
  earnMi:    +( 14.2 + i * 0.4  + Math.sin(i * 0.5) * 1.1  ).toFixed(1),
}))

// ─── B2B parceiros ────────────────────────────────────────────────────────────
export const b2bParceiros = [
  { parceiro:'Itaú (AIC)',      tipo:'Banco',   mtd:28.4, ytd:294, delta: 8.1 },
  { parceiro:'Bradesco',        tipo:'Banco',   mtd:14.7, ytd:158, delta: 4.2 },
  { parceiro:'Caixa Econômica', tipo:'Banco',   mtd: 9.2, ytd: 97, delta:-1.3 },
  { parceiro:'Santander',       tipo:'Banco',   mtd: 7.8, ytd: 82, delta: 2.9 },
  { parceiro:'Nubank',          tipo:'Banco',   mtd: 5.4, ytd: 54, delta:22.7 },
  { parceiro:'Americanas',      tipo:'Varejo',  mtd: 4.1, ytd: 43, delta:18.7 },
  { parceiro:'Magazine Luiza',  tipo:'Varejo',  mtd: 3.6, ytd: 38, delta:22.1 },
  { parceiro:'Carrefour',       tipo:'Varejo',  mtd: 2.9, ytd: 31, delta: 7.4 },
  { parceiro:'iFood',           tipo:'Digital', mtd: 2.4, ytd: 25, delta:34.2 },
  { parceiro:'Rappi',           tipo:'Digital', mtd: 1.8, ytd: 19, delta:28.9 },
]

// ─── Tiers (Mi clientes) ─────────────────────────────────────────────────────
export const tierDist = [
  { name:'Fidelidade', value:15.80, color:'#A8D8F5' },
  { name:'Topázio',    value: 2.92, color:'#0096D6' },
  { name:'Safira',     value: 1.10, color:'#005EB8' },
  { name:'Diamante',   value: 0.38, color:'#003087' },
  { name:'D. Unique',  value: 0.09, color:'#2C4A7C' },
  { name:'Azul One',   value: 0.03, color:'#1C2333' },
]

// ─── Mix de resgates (%) ─────────────────────────────────────────────────────
export const resgatesMix = [
  { name:'Passagens Azul',   value:58.4, color:'#003087' },
  { name:'Azul Pelo Mundo',  value:17.2, color:'#005EB8' },
  { name:'Shopping',         value:10.8, color:'#0096D6' },
  { name:'Espaço Azul',      value: 6.3, color:'#A8D8F5' },
  { name:'Bagagem',          value: 4.8, color:'#7ABDE8' },
  { name:'Outros',           value: 2.5, color:'#C8E8F8' },
]

// ─── Resgates mensal (Bi pontos) ─────────────────────────────────────────────
export const resgatesMensal = MONTHS.map((month, i) => ({
  month,
  aereoAzul: +( 60 + i * 1.1 + Math.sin(i * 0.8) * 5 ).toFixed(1),
  apm:       +( 18 + i * 0.4 + Math.sin(i * 0.6) * 2 ).toFixed(1),
  shopping:  +( 11 + i * 0.3 + Math.sin(i * 0.5) * 1 ).toFixed(1),
  outros:    +( 12 + i * 0.2 + Math.sin(i * 0.4) * 1 ).toFixed(1),
}))

// ─── KPIs executivos (MTD Jun/25) ────────────────────────────────────────────
export const kpiExec = {
  receitaTotal: { mtd:'R$ 176,8 Mi', ytd:'R$ 1,92 Bi',  delta: 6.3  },
  vsMeta:       { real:'R$ 176,8 Mi', meta:'R$ 183,0 Mi', pct:'96,6%', delta:-1.8 },
  b2c:          { mtd:'R$ 74,1 Mi',  ytd:'R$ 782 Mi',   delta:11.4  },
  b2b:          { mtd:'R$ 90,2 Mi',  ytd:'R$ 961 Mi',   delta: 3.9  },
  clube:        { mtd:'R$ 22,4 Mi',  ytd:'R$ 237 Mi',   delta:18.2  },
  aic:          { base:'3,44 Mi',    earn:'18,9 Bi pts', delta: 9.1  },
  ativos30:     { val:'4,27 Mi',     d90:'6,91 Mi',      delta: 4.4  },
  ativos12m:    { val:'10,1 Mi',     delta: 4.1  },
  highValue:    { total:'897 Mil',   safiraPlus:'416 Mil',delta: 6.8  },
  earn:         { mtd:'185 Bi pts',  ytd:'1,91 Tri pts', delta: 9.3  },
  burn:         { mtd:'124 Bi pts',  ytd:'1,27 Tri pts', delta:12.6  },
  burnEarn:     { atual:'84,7%',     meta:'85,0%',       delta:-0.3 },
  liability:    { total:'R$ 1,28 Bi',var:'R$ +18 Mi',    delta: 1.4  },
  breakage:     { real:'R$ 49 Mi',   proj:'R$ 53 Mi',    pct:'92,5%', delta: 2.1 },
  pmd:          { val:'R$ 28,40',    delta: 3.2 },
  pme:          { val:'R$ 25,90',    delta: 2.8 },
  rentabilidade:{ val:'22,4%',       delta: 1.1 },
  custos:       { val:'R$ 117,6 Mi', delta: 2.4 },
}

export const prioridades2026 = [
  { rank: 1, titulo: 'Engajamento de alto valor', detalhe: 'Aumentar frequencia e valor por cliente.' },
  { rank: 2, titulo: 'Saude economica', detalhe: 'Controlar burn-earn, passivo e breakage.' },
  { rank: 3, titulo: 'Receita com rentabilidade', detalhe: 'Crescer sem erosao de margem.' },
  { rank: 4, titulo: 'Confiabilidade e governanca', detalhe: 'Numero unico para decisao executiva.' },
  { rank: 5, titulo: 'Performance comercial', detalhe: 'Escalar frentes com melhor retorno.' },
  { rank: 6, titulo: 'Previsibilidade de caixa', detalhe: 'Estabilidade de entrada financeira.' },
]

export const top10Kpis = [
  'Clientes ativos',
  'Frequencia de transacoes',
  'Faturamento',
  'PMD',
  'PME',
  'Receita',
  'Rentabilidade',
  'Custos',
  'Breakage',
  'Burn-Earn',
]

export const regrasEconomicas = [
  'Burn x Earn referencia: 85%.',
  'Alerta se burn > earn em 3 meses acumulados ou no ano.',
  'Passivo maximo de 12 meses de resgates futuros.',
  'Breakage saudavel: 15% (+/- 5 p.p.).',
]

export const fontesPriorizadas = ['Comarch', 'Mapa contabil', 'P&L', 'DW_Azul Fidelidade', 'Gerenciais homologadas']

export const benchmarkRefs = ['Livelo', 'Smiles', 'LatamPass', 'Delta SkyMiles', 'AeroPlan', 'Flying Blue']

// ─── Portfólio BI (governança) ────────────────────────────────────────────────
export const portfolioBI = [
  { painel:'Painel Executivo Fidelidade', dominio:'Executivo',    nivel:'Executivo',  acao:'Manter',     owner:'Dir. Fidelidade',   atualiz:'D-1' },
  { painel:'Gerencial Faturamento B2B',   dominio:'Receita',      nivel:'Gerencial',  acao:'Redesenhar', owner:'Ger. B2B',          atualiz:'D-1' },
  { painel:'Gerencial Faturamento B2C',   dominio:'Receita',      nivel:'Gerencial',  acao:'Redesenhar', owner:'Ger. B2C',          atualiz:'D-1' },
  { painel:'Campanhas B2B',               dominio:'B2B',          nivel:'Gerencial',  acao:'Manter',     owner:'Ger. Parcerias',    atualiz:'D-1' },
  { painel:'Análise de Parceiros',        dominio:'B2B',          nivel:'Gerencial',  acao:'Consolidar', owner:'Ger. Parcerias',    atualiz:'Semanal' },
  { painel:'Perfil Clientes',             dominio:'Clientes',     nivel:'Gerencial',  acao:'Manter',     owner:'CRM',               atualiz:'D-1' },
  { painel:'Bancos Perfil Cliente',        dominio:'Clientes',     nivel:'Gerencial',  acao:'Consolidar', owner:'CRM',               atualiz:'Semanal' },
  { painel:'Clube Azul Fidelidade',       dominio:'Clube',        nivel:'Gerencial',  acao:'Manter',     owner:'Ger. Clube',        atualiz:'D-1' },
  { painel:'Cobranded / AIC',             dominio:'AIC',          nivel:'Gerencial',  acao:'Manter',     owner:'Ger. AIC',          atualiz:'D-2' },
  { painel:'Burn to Earn',                dominio:'Earn/Burn',    nivel:'Gerencial',  acao:'Redesenhar', owner:'Produto',           atualiz:'D-1' },
  { painel:'Liability',                   dominio:'Earn/Burn',    nivel:'Gerencial',  acao:'Manter',     owner:'Financeiro',        atualiz:'Mensal' },
  { painel:'Daily Bookings',              dominio:'Resgates',     nivel:'Operacional',acao:'Manter',     owner:'Operações',         atualiz:'D-1' },
  { painel:'Azul Pelo Mundo / APM',       dominio:'Resgates',     nivel:'Gerencial',  acao:'Manter',     owner:'APM',               atualiz:'D-2' },
  { painel:'Interline',                   dominio:'Resgates',     nivel:'Operacional',acao:'Arquivar',   owner:'Indefinido',        atualiz:'Semanal' },
  { painel:'Performance Regional',        dominio:'Receita',      nivel:'Gerencial',  acao:'Consolidar', owner:'Comercial',         atualiz:'Semanal' },
  { painel:'Cálculo CPP',                 dominio:'Earn/Burn',    nivel:'Tático',     acao:'Manter',     owner:'Financeiro',        atualiz:'Mensal' },
  { painel:'Acúmulo Aéreo Diário',        dominio:'Earn/Burn',    nivel:'Operacional',acao:'Substituir', owner:'Indefinido',        atualiz:'D-1' },
  { painel:'Retroclaim',                  dominio:'Earn/Burn',    nivel:'Operacional',acao:'Manter',     owner:'Operações',         atualiz:'D-1' },
]

// ─── B2B por tipo (barras horizontais, Mi) ────────────────────────────────────
export const b2bPorTipo = [
  { tipo:'Bancos',   valor:65.5 },
  { tipo:'Varejo',   valor:14.2 },
  { tipo:'Digital',  valor: 7.8 },
  { tipo:'Seguros',  valor: 2.1 },
  { tipo:'Outros',   valor: 0.6 },
]

// ─── Aging de pontos (%) ─────────────────────────────────────────────────────
export const agingPontos = [
  { faixa:'0–6 meses',    pct:38.2, color:'#003087' },
  { faixa:'7–12 meses',   pct:24.7, color:'#005EB8' },
  { faixa:'13–24 meses',  pct:20.1, color:'#0096D6' },
  { faixa:'25–36 meses',  pct:11.4, color:'#7ABDE8' },
  { faixa:'>36 meses',    pct: 5.6, color:'#A8D8F5' },
]
