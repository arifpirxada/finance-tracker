import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function HomePage() {
  return (
    <Card className="bg-muted p-10 rounded-2xl text-center shadow-md m-8">
      <CardContent>
        <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          This is a customizable admin panel built with ShadCN UI and Tailwind CSS.
        </p>
        <Button asChild>
          <Link to="/articles/generated" >View Generated Articles</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default HomePage