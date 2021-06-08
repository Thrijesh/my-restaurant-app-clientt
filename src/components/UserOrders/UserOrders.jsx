import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useApi } from '../../context/ApiContext'

import './UserOrders.scss'


function UserOrders() {
    const { userOrders, getOrders } = useApi()

    useEffect(() => {
        getOrders()
    }, [])

    const ordersList = userOrders.map((el, i)=> {
        const list = el.orderedItems.map(el => {
            return <div key={el.recipeId.title}>
                    <p>{el.recipeId.title}</p>
                    <img src={el.recipeId.image_url} width="80px" height="100px"/>
                </div>
        }) 
        
        return  <div key={i} className="Your-Order">
                    <div className="Sl-NO">
                        <h4>{i + 1}</h4>
                    </div>
                    <div className="YourOrder-List">
                        <p>Order ID: {el._id}</p>
                        <h5>Ordered List</h5>
                        <div className="YourOrder-Rec-List">
                            {list}
                        </div>
                        <p>Total Amount: {el.totalAmount}</p>
                        <p>Payment Status: {el.paymentStatus.toUpperCase()}</p>
                        <p>Order Status: {el.orderStatus.status.toUpperCase()}</p>
                    </div>  
                </div>
    })

    return (
        <div className="UserOrders">
            <nav>
                <div>
                    <NavLink to="/">Home</NavLink>
                </div>
                <div>
                    <header>My Restaurant</header>
                </div>
            </nav>
            <h1>Your Orders</h1>
            {ordersList}
        </div>
    )
}

export default UserOrders
