import {
  BarChartIcon,
  CameraIcon,
  FileCodeIcon,
  FileTextIcon,
  // FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  // UsersIcon
} from "lucide-react"

const data = {
  user: {
    name: "arif",
    email: "arif@example.com"
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ListIcon,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChartIcon,
    },
    // {
    //   title: "Free Backlinks",
    //   url: "/free-backlinks",
    //   icon: FolderIcon,
    // },
    // {
    //   title: "Integrations",
    //   url: "/integrations",
    //   icon: UsersIcon,
    // },
    // {
    //   title: "Live Chat Support",
    //   url: "/live-chat-support",
    //   icon: FileCodeIcon,
    // }
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
}

export default data