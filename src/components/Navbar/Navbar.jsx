import React, { useState } from 'react'
import { useApi } from '../../context/ApiContext'
import { useAuth } from '../../context/AuthContext'
import { Redirect, useHistory } from 'react-router-dom'
import { ImSearch } from 'react-icons/im'
import { RiMenu2Line } from 'react-icons/ri'
import './Navbar.scss'
import UserDB from '../UserDB/UserDB'
import Login from '../Login/Login'

function Navbar() {

    const [ query, setQuery ] = useState("")
    const { logOutHandler } = useAuth()
    const { dashBoardToggleHandler, SearchHandler, toggleSideNav, dashboardCollapsed } = useApi()

    const history = useHistory()

    const navigateToSearch = (event) => {
        SearchHandler(event, query)
        history.push(`/q/${query}`)
    }

    let user = localStorage.getItem('user')
    let user_info = JSON.parse(user)
    let user_name = user_info ? user_info.fullName.slice(0, 2) : "Login"

    const openLoginHandler = () => {
        return history.push("/login")
    }

    return (
        <div className="Navbar">
            <div className="Navbar-Top">
                <div onClick={toggleSideNav}>
                    <RiMenu2Line className="Menu" />
                </div>
                <div>
                    <a onClick={user_info ? dashBoardToggleHandler : openLoginHandler }>{user_name ? user_name.toUpperCase(): "Login"}</a>
                    <div className={ dashboardCollapsed ? "Nav-UserDB-Show" : "Nav-UserDB-Hide"}>
                        <UserDB />
                    </div>
                </div>
            </div>  
            <div className="Navbar-Middle">
                <header>My <i>Restaurant</i></header>
                <p>Discover the Best Food And Drinks...</p>
                <form action="" onSubmit={(event) => navigateToSearch(event)}>
                    <input type="text" placeholder="Search for Dishes or Cuisines..." value={query} onChange={event => {
                        setQuery(event.target.value)
                        }} />
                    <button>
                        <ImSearch />
                    </button>
                </form>
            </div> 
        </div>
    )
}

export default Navbar
