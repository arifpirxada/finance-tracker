import { AppSidebar } from "./sidebar/AppSidebar"
import { SiteHeader } from "@/components/header/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"


export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const noLayoutRoutes = ["/login", "/register"]

  const isNoLayoutRoute = noLayoutRoutes.includes(location.pathname)

  if (isNoLayoutRoute) {
    return <>{ children }</>
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-2 py-4 md:gap-0 md:py-6">
              { children }
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}