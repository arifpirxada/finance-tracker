"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          { table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={ headerGroup.id }>
              { headerGroup.headers.map((header) => {
                return (
                  <TableHead key={ header.id }>
                    { header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) }
                  </TableHead>
                )
              }) }
            </TableRow>
          )) }
        </TableHeader>
        <TableBody>
          { table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={ row.id }
                data-state={ row.getIsSelected() && "selected" }
              >
                { row.getVisibleCells().map((cell) => (
                  <TableCell key={ cell.id }>
                    { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                  </TableCell>
                )) }
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={ columns.length } className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 px-4">
        <button
          className="border px-2 py-1 rounded disabled:opacity-50"
          onClick={ () => table.previousPage() }
          disabled={ !table.getCanPreviousPage() }
        >
          Previous
        </button>
        <span className="text-sm">
          Page { table.getState().pagination.pageIndex + 1 } of{ " " }
          { table.getPageCount() }
        </span>
        <button
          className="border px-2 py-1 rounded disabled:opacity-50"
          onClick={ () => table.nextPage() }
          disabled={ !table.getCanNextPage() }
        >
          Next
        </button>
      </div>

    </div>
  )
}