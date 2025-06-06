"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { type Transaction } from "@/types"

export const columns: ColumnDef<Transaction>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={ table.getIsAllPageRowsSelected() }
                onCheckedChange={ (value) => table.toggleAllPageRowsSelected(!!value) }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={ row.getIsSelected() }
                onCheckedChange={ (value) => row.toggleSelected(!!value) }
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50, // optional: makes column narrower
    },
    {
        accessorKey: "title",
        header: "Article Title",
    },
    {
        accessorKey: "keyword",
        header: "Keyword [Traffic]",
    },
    {
        accessorKey: "words",
        header: "Words",
    },
    {
        accessorKey: "created",
        header: "Created On",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const article = row.original

            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={ () => alert(`View article, id: ${article.id}`) }
                >
                    View
                </Button>
            )
        },
    },
    {
        accessorKey: "Publish",
        header: "Publish",
        cell: ({ row }) => {
            const article = row.original

            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={ () => alert(`Publish article, id: ${article.id}`) }
                >
                    Publish
                </Button>
            )
        },
    },
]