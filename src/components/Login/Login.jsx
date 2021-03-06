import React, { useState, useEffect } from 'react'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Spinner3 } from '../UI/Spinner/Spinner'
import './Login.scss'

function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const { submitLoginHandler, isAuthenticated, loginErrorMessage, loading } = useAuth()

    const history = useHistory()

    const loginHandler = (event) => {
        submitLoginHandler(event, email, password)
    }
    
    if(isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <div className="Login">
            <div className="Login-Header">
                <header>My <i>Restaurant</i></header>
                <p>Login</p>
            </div>
            <form onSubmit={(event) => loginHandler(event)}>
                <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} required/><br/>
                <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} required/><br/>
                {loginErrorMessage && <p>{loginErrorMessage.message}</p>}
                <button type="submit">{loading ? <Spinner3 /> :"Login"}</button> 
            </form> 
            <div className="Login-Nav">
                <span>Don't have an account? </span>
                <NavLink to="/signup">Sign Up</NavLink>

                <div style={{ padding: "1rem" }}>
                    <NavLink to="/">Skip Login</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Login
