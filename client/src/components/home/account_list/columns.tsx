"use client"

import type { Account } from "@/types"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Account>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "balance",
        header: "Balance",
    },
    // {
    //     accessorKey: "_id",
    //     header: "Action",
    // },
]