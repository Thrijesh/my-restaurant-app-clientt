import React from 'react'
import { useApi } from '../../context/ApiContext'
import { useAuth } from '../../context/AuthContext'
import { NavLink, useHistory } from 'react-router-dom'

import { TiTimesOutline } from 'react-icons/ti'

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
            <button className="Dashboard-Close" onClick={dashBoardToggleHandler}><TiTimesOutline /></button>
            <h3>Profile</h3>
            <p>Name:<strong style={{color: "red"}}> {user_info && user_info.fullName}</strong></p>
            <p>Email: <strong style={{color: "red"}}>{user_info && user_info.email}</strong></p>
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
