import React from 'react'
import SideNav from './components/SideNav/SideNav'
import { useApi } from  './context/ApiContext'

function Layout({ children }) {

    const { collapsed } = useApi()

    const sidebarOpen = {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "500ms linear",
        zIndex: "1000"
    }

    const sidebarClose = {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        position: "fixed",
        top: 0,
        left: "-100%",
        transition: "500ms linear",
        zIndex: "1000"  
    }

    return (
        <React.Fragment>
            {children}
            <div style={collapsed ? sidebarOpen : sidebarClose}>
                <SideNav />
            </div>
        </React.Fragment>
    )
}

export default Layout
