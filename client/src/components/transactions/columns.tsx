"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { type Transaction } from "@/types"

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "note",
        header: "Note",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "account",
        header: "Account",
    },
    {
        accessorKey: "toAccount",
        header: "To Account",
    },
    {
        accessorKey: "Date",
        header: "Date",
        cell: ({ row }) => {
            const formattedDate = row.original.date ? new Date(row.original.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }) : '';

            const formattedTime = row.original.date ? new Date(row.original.date).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZoneName: 'short'
            }) : '';

            return (
                <span>
                    { formattedDate }
                    <br />
                    { formattedTime }
                </span>
            )
        }
    },
    {
        accessorKey: "_id",
        header: "Action",
        cell: ({ row }) => {
            const transaction = row.original

            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={ () => alert(`View article, id: ${transaction._id}`) }
                >
                    View
                </Button>
            )
        },
    }
]