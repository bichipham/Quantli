import { DataTable } from '@/components/table/DataTable'
import { columns } from './columns'
import data from './data/data.json'

export function ComparisionTable() {
  return <DataTable columns={columns} data={data} />
}