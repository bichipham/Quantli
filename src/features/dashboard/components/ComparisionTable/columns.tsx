import type { ColumnDef } from "@tanstack/react-table";
import { Avatar } from "@/components/avatar";
import { Checkbox } from "@/components/checkbox";
import { convertCurrency } from "@/utils/helpers";
import type { Stock } from "../../type/stock";
import "./ComparisionTable.css";

const formatPercent = (value: number) => `${value.toFixed(2)}%`;

const renderSignedValue = (value: unknown) => {
  if (value == null || value === "") return "-";

  if (typeof value !== "number" || Number.isNaN(value)) {
    return String(value);
  }

  const className =
    value > 0
      ? "value-positive"
      : value < 0
        ? "value-negative"
        : "value-neutral";

  return (
    <span className={className}>
      {value > 0 ? "+" : ""}
      {formatPercent(value)}
    </span>
  );
};

export const columns: ColumnDef<Stock>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <span className="select-count">
        ({table.getSelectedRowModel().rows.length}/
        {(table.options.meta as { maxSelected?: number })?.maxSelected ?? 0})
      </span>
    ),
    cell: ({ row, table }) => {
      const maxSelected =
        (table.options.meta as { maxSelected?: number })?.maxSelected ?? 0
      const selectedCount = table.getSelectedRowModel().rows.length
      const isSelected = row.getIsSelected()
      const shouldDisable = !isSelected && selectedCount >= maxSelected

      return (
        <Checkbox
          checked={isSelected}
          disabled={shouldDisable}
          onChange={row.getToggleSelectedHandler()}
        />
      )
    },
    meta: { className: "column-select" },
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => {
      const stock = row.original;
      return (
        <div className="company-cell">
          <Avatar src={stock.logo} alt={stock.companyName} size="small" sx={{ width: 22, height: 22 }} />
          <div>
            <div className="company-name">{stock.companyName}</div>
            <div className="company-meta">{stock.symbolCode}</div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "marketCapitalization",
    header: "Market Cap",
    cell: ({ getValue }) => `$${convertCurrency(getValue<number>())}`,
  },

  {
    accessorKey: "peTtm",
    header: "PE TTM",
    cell: ({ getValue }) => {
      const v = getValue<number>();
      return v ? v.toFixed(2) : "-";
    },
  },

  {
    accessorKey: "revenueGrowthTtmYoy",
    header: "Rev Growth TTM",
    cell: ({ getValue }) => renderSignedValue(getValue()),
  },

  {
    accessorKey: "currentDividendYieldTtm",
    header: "Div Yield TTM",
    cell: ({ getValue }) => renderSignedValue(getValue()),
  },
];
