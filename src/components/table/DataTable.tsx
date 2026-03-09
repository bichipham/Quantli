import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  TableMeta,
  RowSelectionState,
  Updater
} from "@tanstack/react-table"

type Props<T> = {
  columns: ColumnDef<T, unknown>[]
  data: T[]
  rowSelection?: RowSelectionState
  onRowSelectionChange?: (updater: Updater<RowSelectionState>) => void
  getRowId?: (row: T) => string
  tableMeta?: TableMeta<T>
}

export function DataTable<T>({
  columns,
  data,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  tableMeta,
}: Props<T>) {

  const table = useReactTable({
    columns,
    data,
    meta: tableMeta,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className={
                  (header.column.columnDef.meta as { className?: string })
                    ?.className
                }
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className={
                  (cell.column.columnDef.meta as { className?: string })
                    ?.className
                }
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}