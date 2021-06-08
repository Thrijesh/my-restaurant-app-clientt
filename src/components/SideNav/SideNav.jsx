import React from 'react'
import { NavLink } from 'react-router-dom'
import { useApi } from  '../../context/ApiContext'
import { TiTimesOutline } from 'react-icons/ti'
import './SideNav.scss'

function SideNav() {

    const { toggleSideNav } = useApi()

    return (
        <nav className="SideNav">
            <header>My <i>Restaurant</i></header>
            <NavLink to="/" exact activeClassName="active" onClick={toggleSideNav}>Home</NavLink>
            <NavLink to="/catalog" activeClassName="active" onClick={toggleSideNav}>Catalog</NavLink>
            <button className="Close" onClick={toggleSideNav}><TiTimesOutline /></button>
        </nav>
    )
}

export default SideNav
