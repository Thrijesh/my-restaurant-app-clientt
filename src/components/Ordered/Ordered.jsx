import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useApi } from '../../context/ApiContext'

import './Ordered.scss'


function Ordered() {
    const { orderData, setIsOrdered } = useApi()

    useEffect(() => {
        setIsOrdered(false)
    }, [])

    return (
        <div className="Ordered">
            <h1>Your Order has placed</h1>
            <div>
                <p>Order ID: {orderData && orderData.order._id}</p>
                <h1>Check Order Status</h1> 
                <p>Payment Status: {orderData && orderData.order.paymentStatus}</p>
                <p>Payment Status: {orderData && orderData.order.paymentType}</p>
                <p>Total Amount: {orderData && orderData.order.totalAmount}</p>
            </div>
            <div className="Links">
                <h1>Quick Links</h1>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/pizza">Pizza</NavLink>
                <NavLink to="/lunch">Lunch</NavLink>
            </div>
        </div>
    )
}

export default Ordered
