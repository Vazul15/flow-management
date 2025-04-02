import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Table } from '@tanstack/react-table';

interface StudentsTableProps<TData> {
    table: Table<TData>;
  }

export const StudentsTableViewOptions = <TData,>({ table }: StudentsTableProps<TData>) => {
  return (
    <>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="ml-auto text-black">
        Columns
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {table
        .getAllColumns()
        .filter(
          (column) => column.getCanHide()
        )
        .map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) =>
                column.toggleVisibility(!!value)
              }
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          )
        })}
    </DropdownMenuContent>
  </DropdownMenu>
    </>
  )
}
