import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  RowSelectionState,
  Updater,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { StudentsTablePagination } from "./Table-Pagination";
import { StudentsTableViewOptions } from "./Table-ViewOptions";

interface RowData {
  publicId: string;
  [key: string]: any;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowSelectionChange?: (selectedIds: string[]) => void;
}

export function TableSchool<TData extends RowData, TValue>({
  columns,
  data,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater: Updater<RowSelectionState>) => {
      const newRowSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(newRowSelection);
      const selectedIds = Object.keys(newRowSelection)
        .filter((key) => newRowSelection[key])
        .map((key) => {
          const row = table.getRowModel().rows.find((row) => row.id === key);
          return row ? row.original.publicId : null;
        })
        .filter((id): id is string => id !== null);
      if (onRowSelectionChange) {
        onRowSelectionChange(selectedIds);
      }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="bg-gray-500 p-2 rounded-t-lg border">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Filter first names.."
            value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("firstName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm border border-[#535353] rounded-lg shadow-sm text-black"
          />
          <StudentsTableViewOptions table={table} />
        </div>
      </div>

      <div className="rounded-xl shadow-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader className="bg-gray-500 text-[#0a0a29]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold uppercase text-[#0a0a29] transition-all duration-200 ease-in-out"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>

                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="even:bg-gray-50 hover:bg-[#1d1f36bd] hover:text-[#ffffff] transition-all text-[#0a0a29]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 border-b border-gray-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <StudentsTablePagination table={table} />
    </div>
  );
}
