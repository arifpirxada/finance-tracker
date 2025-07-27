import { useAppSelector } from "@/store/hooks"
import { DataTable } from "./data-table"
import { columns } from "./columns"

const AccountList = () => {
  const user = useAppSelector(state => state.auth.user)

  if (!user?.accounts) {
    return (
      <span>You have no accounts please create an account</span>
    )
  }
  return (
    <div className="p-4">
      <h4 className="text-2xl mb-3 font-bold">Accounts</h4>

      <DataTable columns={ columns } data={ user.accounts } />
    </div>
  )
}

export default AccountList