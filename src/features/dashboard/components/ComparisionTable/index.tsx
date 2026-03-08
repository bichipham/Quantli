import { useState } from "react"
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
    <DataTable
      columns={columns}
      data={data}
      rowSelection={rowSelection}
      onRowSelectionChange={handleSelectionChange}
    />
  )
}