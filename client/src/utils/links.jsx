import React from "react"
import { 
    BarChartIcon,
    QueryStatsIcon,
    FormIcon,
    ProfileIcon,
    AdminSettingIcon
 } from "./Icons"

const links  = [
    {
        text: 'add job', 
        path: ".", 
        icon: <FormIcon />
    },
    {
        text: 'all jobs', 
        path: "all-jobs", 
        icon: <QueryStatsIcon />
    },
    {
        text: 'stats', 
        path: "stats", 
        icon: <BarChartIcon />
    },
    {
        text: 'profile', 
        path: "profile", 
        icon: <ProfileIcon />
    },
    {
        text: 'admin', 
        path: "admin", 
        icon: <AdminSettingIcon />
    }
]

export default links