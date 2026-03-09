import { useEffect, useState } from "react"
import { DataTable } from "@/components/table/DataTable"
import data from "./data/data.json"
import { columns } from "./columns"
import type { RowSelectionState, Updater } from "@tanstack/react-table"

type Props = {
  maxSelected?: number
  onSelectionChange: (symbols: string[]) => void
}

export default function ComparisonTable({
  maxSelected = 4,
  onSelectionChange,
}: Props) {

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  useEffect(() => {
    if (!data.length) return

    const initialSelection: RowSelectionState = {}
    data.slice(0, maxSelected).forEach((row) => {
      initialSelection[row.companyName] = true
    })

    setRowSelection(initialSelection)
    onSelectionChange(Object.keys(initialSelection))
  }, [])

const handleSelectionChange = (updater: Updater<RowSelectionState>) => {

  const next =
    typeof updater === "function"
      ? updater(rowSelection)
      : updater

  const selectedIds = Object.keys(next)

  if (selectedIds.length > maxSelected) return

  setRowSelection(next)

  onSelectionChange(selectedIds)
}

  return (
    <div className="comparison-table">
      <h2 className="section-title">Peer Comparison Table</h2>
      <DataTable
        columns={columns}
        data={data}
        rowSelection={rowSelection}
        onRowSelectionChange={handleSelectionChange}
        tableMeta={{ maxSelected }}
        getRowId={(row) => row.companyName}
      />
    </div>
  )
}