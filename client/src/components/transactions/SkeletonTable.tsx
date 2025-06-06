import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SkeletonTable({ rows = 7, columns = 6 }) {
  return (
    <Table className="animate-pulse">
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }).map((_, idx) => (
            <TableHead key={idx}>
              <div
                className={`h-5 rounded bg-muted ${
                  idx === 0
                    ? "w-12"
                    : idx === 1
                    ? "w-48"
                    : idx === 4
                    ? "w-24"
                    : idx === columns - 1
                    ? "w-24"
                    : "w-32"
                }`}
              />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <TableCell key={colIdx}>
                <div
                  className={`h-6 rounded bg-muted ${
                    colIdx === 0
                      ? "w-12"
                      : colIdx === 1
                      ? "w-74"
                      : colIdx === 2
                      ? "w-74"
                      : colIdx === 3
                      ? "w-32"
                      : colIdx === 4
                      ? "w-24"
                      : "w-full"
                  }`}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}