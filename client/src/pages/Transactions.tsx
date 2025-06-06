import { useEffect, useState } from "react"
import transactionData from "@/utils/transactionData"
import { columns } from "@/components/transactions/columns"
import { DataTable } from "@/components/transactions/data-table"
import SkeletonTable from "@/components/transactions/SkeletonTable"
import { type Transaction } from "@/types"

function Transactions() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Transaction[]>(transactionData)

    useEffect(() => {
        setLoading(true)
        const timeout = setTimeout(() => {
            setData(transactionData)
            setLoading(false)
        }, 500)

        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className="px-6">
            { loading ? (
                <SkeletonTable rows={ 10 } columns={ columns.length } />
            ) : (
                <DataTable columns={ columns } data={ data } />
            ) }
        </div>
    )
}

export default Transactions;