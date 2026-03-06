export type Stock = {
  symbolCode: string
  companyName: string
  logo: string
  marketCapitalization: number
  peTtm?: number
  revenueGrowthTtmYoy?: number
  currentDividendYieldTtm?: number
}

export type ComparisionTableColumnsParams = {
  selectedSymbols: Set<string>
  selectedCount: number
  maxSelected: number
  onToggle: (symbol: string) => void
}