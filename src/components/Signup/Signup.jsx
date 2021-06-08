import React, { useState } from 'react'
import { NavLink } from 'react-router-dom' 
import { useAuth } from '../../context/AuthContext'

import './Signup.scss'


function Signup() {
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { submitSignupHandler } = useAuth()

    return (
        <div className="Signup">
            <div className="Signup-Header">
                <h1>My Restaurant</h1>
                <span>Sign Up</span>
            </div>
            <form onSubmit={(event) => submitSignupHandler(event, email, password, firstName, lastName)}>
                <input type="text" placeholder="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} required/><br/>
                <input type="text" placeholder="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} required/><br/>
                <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} required/><br/>
                <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} required/><br/>
                <button type="submit">SignUp</button>
            </form> 
            <div className="Signup-Nav">
                <span>Have an account? </span>
                <NavLink to="/login">Log In</NavLink>
                <div style={{ padding: "1rem"}}>
                    <NavLink to="/">Skip Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Signup
