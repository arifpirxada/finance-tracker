import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAppSelector } from "@/store/hooks"
import AddTransaction from "@/components/home/AddTransaction";
import AddAccount from "@/components/home/AddAccount";

function HomePage() {

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Card className="bg-muted md:p-4 lg:p-10 rounded-2xl text-center shadow-md m-4 md:m-8">
        <CardContent>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-4">{ isLoggedIn ? user?.name + " - welcome to Expense Flux" : "Welcome to Expense Flux" }</h1>
          <p className="text-muted-foreground mb-6">
            All your transactions, clear and organized in one place.
          </p>
          <Button>
            { isLoggedIn && <Link to="/transactions" >View Your Transactions</Link> }
            { !isLoggedIn && <Link to="/login" >Login</Link> }
          </Button>
        </CardContent>
      </Card>
      { isLoggedIn &&
        <div className="homepage-forms md:flex md:p-4">
          { user?.accounts.length !== 0 && <AddTransaction /> }
          <AddAccount />
        </div> }
    </>
  )
}

export default HomePage