import { useMemo, useState, useCallback } from "react"
import { DataTable } from "@/components/table/DataTable"
import data from "./data/data.json"
import { createColumns } from "./columns.tsx"

export function ComparisionTable() {
  const [selectedSymbols, setSelectedSymbols] = useState<Set<string>>(
    () => new Set()
  )

  const maxSelected = 4

  const handleToggle = useCallback((symbol: string) => {
    setSelectedSymbols((prev) => {
      const next = new Set(prev)

      if (next.has(symbol)) {
        next.delete(symbol)
      } else if (next.size < maxSelected) {
        next.add(symbol)
      }

      return next
    })
  }, [])

  const columns = useMemo(
    () =>
      createColumns({
        selectedSymbols,
        selectedCount: selectedSymbols.size,
        maxSelected,
        onToggle: handleToggle,
      }),
    [selectedSymbols, handleToggle, maxSelected]
  )

  return <DataTable columns={columns} data={data} />
}