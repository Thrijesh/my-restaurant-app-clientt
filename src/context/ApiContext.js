import React, { useState, useEffect, useContext } from 'react'
import axiosInstance from '../helpers/axios'

const ApiContext = React.createContext()

export function useApi() {
    return useContext(ApiContext)
}

export function ApiProvider({ children }) {
    //State Management
    const [ recipeByID, setRecipeByID ]     = useState("")
    const [ collapsed, setCollapsed ]       = useState(false)
    const [ dashboardCollapsed, setDashboardCollapsed ]  = useState(false)
    const [ searchData, setSearchData ]     = useState([])
    const [ error, setError ]               = useState()
    const [ menuList, setMenuList ]         = useState([])
    const [ loading, setLoading ]           = useState(false)
    const [ cart, setCart ]                 = useState([])
    const [ total, setTotal ]               = useState()
    const [ cartLoading, setCartLoading ]   = useState(false)
    const [ userAddress, setUserAddress ]   = useState([])
    const [ showForm, setShowForm ]         = useState(false)
    const [ isOrdered, setIsOrdered ]       = useState(false)
    const [ orderData, setOrderData ]       = useState()
    const [ userOrders, setUserOrders ]     = useState([])
    //Constants

    //Functions

    const getById = async (id) => {
        setLoading(true)
        console.log(`Clicked On: ${id}`)
        await axiosInstance.get(`id/${id}`)
        .then(res => {
            setRecipeByID(res.data)
        })
        .catch(error => console.log(error))
        setLoading(false)
    }

    const SearchHandler = async (e, query) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        await axiosInstance.get(`/q=${query}`)
        .then(res => {
            console.log(res.data)
            setSearchData(res.data)
        })
        .catch(error => setError(error))
        setLoading(false)
    }

    const dashBoardToggleHandler = () => {
        setDashboardCollapsed(!dashboardCollapsed)
        console.log("clicked", !dashboardCollapsed)
    }

    const getRecipesByMenu = async(query) => {
        setLoading(true)
        await axiosInstance.get(`/q=${query}`)
        .then(res => {
            setMenuList(res.data)
        })
        .catch(error => {
            setError(error.message)
        })
        setLoading(false)
    }

    const toggleSideNav = () => {
        setCollapsed(!collapsed)
    }


    const getCartItems = async () => {
        await axiosInstance.get(`cart/get-usercart`)
        .then(res => {
            getSubTotal()
            console.log(res.data.result.cartItems)
            setCart(res.data.result.cartItems)
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    const addToCartHandler = async (id, price, url , title) => {
        setCartLoading(true)
        let cartItems = {
            recipe: id,
            quantity: 1,
            price: price,
            title: title,
            image_url: url
        }
        await axiosInstance.post(`cart/add-tocart`, {cartItems})
        .then((result) => {
            console.log(result.data.cart.cartItems)
            getCartItems()
            getSubTotal()
        })
        .catch(error => console.log(error))
        setCartLoading(false)
    }

    const DecCartCountHandler = async (id, image, price, title, quantity) => {
        setCartLoading(true)
            console.log(id, image, price, title, quantity)
            await axiosInstance.post(`cart/add-tocart`, {cartItems: {
                recipe: id,
                image_url: image,
                price: price,
                title: title,
                quantity: quantity - 1
            }})
            .then(result => {
                console.log("Updated!", result.data)
                setCart([...cart ,result.data])
                getCartItems()
                getSubTotal()
            })
            .catch(error => {
                console.log(error)
            })
        setCartLoading(false)
    }

    const IncCartCountHandler = async (id, image, price, title, quantity) => {
        setCartLoading(true)
            console.log(id, image, price, title, quantity)
            await axiosInstance.post(`cart/add-tocart`, {cartItems: {
                recipe: id,
                image_url: image,
                price: price,
                title: title,
                quantity: quantity + 1
            }})
            .then(result => {
                console.log("Updated!", result.data)
                setCart([...cart ,result.data])
                getCartItems()
                getSubTotal()
            })
            .catch(error => {
                console.log(error)
            })
        setCartLoading(false)
    }

    const deleteCartItemHandler = async(itemId) => {
        setLoading(true)
        await axiosInstance.put(`cart/delete-cartitem`, {itemId})
        .then(res => {
            console.log(res)
            getCartItems()
            getSubTotal()
        })
        .catch(error => {
            console.log(error)
        })
        setLoading(false)
    }

    const ClearCartHandler = async() => {
        cart.forEach((el, i)=> {
            console.log(el._id)
            let itemId = el._id
            axiosInstance.put(`cart/delete-cartitem/`, {itemId})
            .then(res => {
                console.log(`Successfully Deleted ${i + 1}`)
                getCartItems()
            })
            .catch(error => {
                console.log(error)
            }) 
        })
    }

    const getSubTotal = async() => {
        await axiosInstance.get(`cart/get-totalprice`)
        .then(result => {
           setTotal(result.data.Total)
           console.log(result.data.Total)
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    const addAddressHandler = async (e ,name, mobileNo, pincode, landmark, address, area, state, alternatePhoneNo, addressType) => {
        e.preventDefault()
        console.log(name, mobileNo, pincode, landmark, address, area, state, alternatePhoneNo, addressType)
        const payload = {
            address: { name, mobileNo, pincode, landmark, address, area, state, alternatePhoneNo, addressType }
        }
        await axiosInstance.post('api/user/address/create', payload)
        .then(result => {
            console.log('Added address')
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getAddressHandler = async() => {
        await axiosInstance.get('api/user/get-address')
        .then(result => {
            setUserAddress(result.data.userAddress.address)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const postEditAddressHandler = async(e, id, name, mobileNo, pincode, landmark, address, area, state, alternatePhoneNo, addressType) => {
        e.preventDefault()
        const payload = {
            address: {
                _id: id, name, mobileNo, pincode, landmark, address, area, state, alternatePhoneNo, addressType
            }
        }
        console.log(payload)
        await axiosInstance.post("api/user/edit-address", payload)
        .then((result) => {
            console.log(result)
            getAddressHandler()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const showFormHandler = () => {
        setShowForm(!showForm)
    }

    const postOrder = async(e, payload) => {
        e.preventDefault()
        console.log("ORDERS", payload)
        setIsOrdered(true)

        await axiosInstance.post("api/add-order", payload)
        .then(res => {
            console.log(res.data)
            setOrderData(res.data)
        })
        .catch(error => {
            console.log(error)
            setIsOrdered(false)
        })
    }

    const getOrders = async() => {
        await axiosInstance.get("api/get-orders")
        .then(res => {
            console.log(res.data.orders)
            setUserOrders(res.data.orders)
        })
        .catch(error => {
            console.log(error)
        })
    }

   

    useEffect(() => {
        getCartItems()
        getSubTotal()
        getOrders()
    }, [])

 
    //Values to Provider

    const value = {
        recipeByID,
        collapsed,
        searchData,
        loading,
        error,
        menuList,
        cart,
        total,
        cartLoading,
        dashboardCollapsed,
        userAddress,
        showForm,
        isOrdered,
        orderData,
        userOrders,
        setCart,
        setDashboardCollapsed,
        setCollapsed,
        getById,
        getRecipesByMenu,
        toggleSideNav,
        SearchHandler,
        getCartItems,
        addToCartHandler,
        DecCartCountHandler,
        IncCartCountHandler,
        ClearCartHandler,
        deleteCartItemHandler,
        dashBoardToggleHandler,
        addAddressHandler,
        getAddressHandler,
        showFormHandler,
        postEditAddressHandler,
        postOrder,
        setIsOrdered,
        getOrders,
        setIsOrdered
    }   


    return (
        <ApiContext.Provider value={value}>
            { children }
        </ApiContext.Provider>
    )
}