import React from 'react'
import { useApi } from '../../context/ApiContext'
import { useAuth } from '../../context/AuthContext'
import { NavLink, useHistory } from 'react-router-dom'

import './UserDB.scss'

function UserDB() {

    const { dashboardCollapsed, setDashboardCollapsed, dashBoardToggleHandler, setCart } = useApi()
    const { logOutHandler } = useAuth()
    const history = useHistory()

    let user = localStorage.getItem('user')
    let user_info = JSON.parse(user)

    const logout = (e) => {
        setCart(null)
        setDashboardCollapsed(false)
        logOutHandler(e)
        history.push('/login')
    }

    const dashboard = (
        <div className="Dashboard">
            <button onClick={dashBoardToggleHandler}>X</button>
            <h1>DashBoard</h1>
            <h5>Name: {user_info && user_info.fullName}</h5>
            <h5>Email: {user_info && user_info.email}</h5>
            <div>
                <NavLink to="/your-orders">Your Orders</NavLink>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    )

    return (
        <React.Fragment>
            { dashboardCollapsed ? dashboard : null }
        </React.Fragment>
    )
}

export default UserDB
