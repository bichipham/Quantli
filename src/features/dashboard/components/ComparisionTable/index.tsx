import { useState } from "react"
import { DataTable } from "@/components/table/DataTable"
import data from "./data/data.json"
import { columns } from "./columns"
import "./ComparisionTable.css"

export default function ComparisionTable() {
  const [selectedSymbols, setSelectedSymbols] = useState<Set<string>>(
    () => new Set()
  )

  const maxSelected = 4;

  return (
      <DataTable columns={columns} data={data} />
  )
}