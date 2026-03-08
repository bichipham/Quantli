const formatDecimal = (value: number) => value.toFixed(2).replace(".", ",")

export const convertCurrency = (value?: number | null) => {
	if (value === null || value === undefined || Number.isNaN(value)) {
		return "-"
	}

	const absValue = Math.abs(value)
	const sign = value < 0 ? "-" : ""

	if (absValue >= 1_000_000) {
		return `${sign}${formatDecimal(absValue / 1_000_000)}T`
	}

	if (absValue >= 1_000) {
		return `${sign}${formatDecimal(absValue / 1_000)}B`
	}

	return `${sign}${formatDecimal(absValue)}`
}
