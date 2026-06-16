export function fmtN(v: number, decimals = 1) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function fmtMi(v: number) { return `R$ ${fmtN(v)} Mi` }
export function fmtBi(v: number) { return `R$ ${fmtN(v)} Bi` }
export function fmtPts(v: number) { return `${fmtN(v)} Bi pts` }

export function fmtPct(v: number) {
  const sign = v >= 0 ? '▲ +' : '▼ '
  return `${sign}${Math.abs(v).toFixed(1).replace('.', ',')}%`
}

export function isUp(v: number) { return v >= 0 }
