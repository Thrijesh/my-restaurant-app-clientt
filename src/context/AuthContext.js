import axios from 'axios'
import React, { useState, useContext } from 'react'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const [ IsSignedUp, setIsSignedUp ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState()
    const [ loginErrorMessage , setLoginErrorMessage ] = useState()
    const [ loading, setLoading ] = useState(false)

    const submitLoginHandler = async(e, email, password) => {
        e.preventDefault()  
        const credentials = {
            email: email,
            password: password
        }
        
        setLoading(true)
        await axios.post('http://localhost:5000/users/signin', credentials)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('token', res.data.token) 
            console.log('Logged In')
            setIsAuthenticated(true)
        })
        .catch(error => {
            setLoginErrorMessage({...error.response.data})
        })
        setLoading(false)
    }

    const logOutHandler = (e) => {
        e.preventDefault()
        localStorage.clear()
        setIsAuthenticated(false)
    }

    const submitSignupHandler = async(e, email, password, firstName, lastName) => {
        e.preventDefault()

        const signUpInfo = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }

        setLoading(true)
        await axios.post('http://localhost:5000/users/signup', signUpInfo)
        .then(res => {
            setIsSignedUp(true)
        })
        .catch(error => {
            setErrorMessage(error.response.data)
            setIsSignedUp(false)
        })
        setLoading(false)
    }

    const value = {
        loginErrorMessage,
        IsSignedUp,
        isAuthenticated,
        errorMessage,
        loading,
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
