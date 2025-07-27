import { columns } from "@/components/transactions/columns"
import { DataTable } from "@/components/transactions/data-table"
import SkeletonTable from "@/components/transactions/SkeletonTable"
import { getTransactions } from "@/features/transactions/transactionApi"
import { useAppSelector } from "@/store/hooks"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import type { Transaction } from "@/types"

function Transactions() {
    const user = useAppSelector(state => state.auth.user)

    const { isPending, isError, data, error } = useQuery({ queryKey: ['transactions'], queryFn: getTransactions });

    const accountObj = useMemo(() => (
        user?.accounts?.reduce((acc, account) => {
            acc[account._id] = account.name;
            return acc;
        }, {} as Record<string, string>) || {}
    ), [user]);

    // Map transactions to display account name
    const transactions = useMemo(() => (
        data?.map((transaction: Transaction) => ({
            ...transaction,
            account: accountObj[transaction.account] ?? transaction.account,
            toAccount: accountObj[transaction.toAccount] ?? transaction.toAccount
        })) ?? []
    ), [data, accountObj]);

    if (isPending) {
        return <SkeletonTable rows={ 10 } columns={ columns.length } />;
    }

    if (isError) {
        return <span>An error occured while displaying your transactions, please try later! { error.message }</span>
    }

    return (
        <div className="px-6">
            <DataTable columns={ columns } data={ transactions } />
        </div>
    )
}

export default Transactions;