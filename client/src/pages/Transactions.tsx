import { columns } from "@/components/transactions/columns"
import { DataTable } from "@/components/transactions/data-table"
import SkeletonTable from "@/components/transactions/SkeletonTable"
import { getTransactions } from "@/features/transactions/transactionApi"
import { useQuery } from "@tanstack/react-query"

function Transactions() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['transactions'], queryFn: getTransactions });

    if (isPending) {
        return <SkeletonTable rows={ 10 } columns={ columns.length } />;
    }

    if (isError) {
        return <span>An error occured while displaying your transactions, please try later! {error.message}</span>
    }

    console.log(data)

    return (
        <div className="px-6">
            <DataTable columns={ columns } data={ data } />
        </div>
    )
}

export default Transactions;