import React, { useState, useContext } from 'react'
import axios from '../helpers/axios'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [ isAuthenticated, setIsAuthenticated ] = useState(false)

    const submitLoginHandler = (e, email, password) => {
        e.preventDefault()  
        const credentials = {
            email: email,
            password: password
        }
 
        axios.post('users/signin', credentials)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('token', res.data.token) 
            console.log('Logged In')
            setIsAuthenticated(true)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const logOutHandler = (e) => {
        e.preventDefault()
        localStorage.clear()
        setIsAuthenticated(false)
    }

    const submitSignupHandler = (e, email, password, firstName, lastName) => {
        e.preventDefault()

        const signUpInfo = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }

        axios.post('users/signup', signUpInfo)
        .then(res => {
            console.log(res.data, "Succesfully Created Profile")
        })
        .catch(error => {
            console.log(error)
        })
    }

    const value = {
        isAuthenticated,
        submitLoginHandler,
        submitSignupHandler,
        logOutHandler,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
