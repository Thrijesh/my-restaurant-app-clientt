import React, { useEffect, useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

import { Spinner2, Spinner3 } from '../UI/Spinner/Spinner'

import './Signup.scss'


function Signup() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { submitSignupHandler, IsSignedUp, errorMessage, loading } = useAuth()

    if (IsSignedUp) {
        return <Redirect to="/login" />
    }

    let pwdMsg
    let pwdMatchMsg

    if (password.length > 0) {
        pwdMsg = <span style={{ color: "maroon" }}>Password is too Short</span>
    }
    if (password.length >= 6) {
        pwdMsg = <span style={{ color: "green" }}>Password is Strong</span>
    }

    if (password.length > 0 && password !== confirmPassword) {
        pwdMatchMsg = <span>Password Do not match</span>
    } else {
        pwdMatchMsg = ""
    }

    const signUp = (event, email, pass, firstName, lastName) => {
        event.preventDefault()
        let pLen = password.length
        if (pLen >= 6 && password === confirmPassword) {
            submitSignupHandler(event, email, pass, firstName, lastName)
        }
    }

    return (
        <div className="Signup">
            <div className="Signup-Header">
                <header>My <i>Restaurant</i></header>
                <p>Sign Up</p>
            </div>
            <form onSubmit={(event) => signUp(event, email, password, firstName, lastName)}>
                <input type="text" placeholder="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} required /><br />
                <input type="text" placeholder="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} required /><br />
                <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} required /><br />
                <input type="password" placeholder="Password Min 6 Charecters" value={password} onChange={event => setPassword(event.target.value)} required /><br />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} required /><br />
                {pwdMsg && <p>{pwdMsg}</p>}
                {pwdMatchMsg && <p>{pwdMatchMsg}</p>}
                {errorMessage && <p>{errorMessage.message}</p>}
                <button type="submit">{loading ? <Spinner3 /> : "Signup"}</button>
            </form>
            <div className="Signup-Nav">
                <span>Have an account? </span>
                <NavLink to="/login">Log In</NavLink>
                <div style={{ padding: "1rem" }}>
                    <NavLink to="/">Skip Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Signup
