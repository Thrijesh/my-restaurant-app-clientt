import React, { useState } from 'react'
import './Cart.scss'
import { useApi } from '../../context/ApiContext'
import { BsCaretDownFill, BsCaretUpFill, BsFillDashCircleFill, BsPlusCircleFill, BsTrash } from 'react-icons/bs'
import { useHistory } from 'react-router-dom'
import { Spinner2 } from '../UI/Spinner/Spinner'

function Cart() {

    const [ toggle, setToggle ] = useState(false)
    const { cart, ClearCartHandler, total, IncCartCountHandler, DecCartCountHandler, deleteCartItemHandler, cartLoading } = useApi()
    const history = useHistory()

    const toggleCart = () => {
        setToggle(!toggle)
    }

    const navigateToCheckoutPage = () => {
        history.push('/checkout')
    }

    return (
        <React.Fragment>
            {   
                cart && cart.length >= 1  ? 
                <div className="Cart">
                    { 
                        toggle ? 
                        <div className="Cart-OrderList">
                            {cart && cart.map((item, i) => {
                                return  <div key={i} className="Orders">
                                            <span>{item.title}</span>
                                            <img src={item.image_url} alt={item.title} width="60px" height="60px"/>
                                            <span>{item.price}</span>
                                            <div className="Order-Inc-Dec">
                                                { item.quantity < 2 ? 
                                                    <button onClick={() => deleteCartItemHandler(item._id)}><BsTrash /></button> : 
                                                    <button onClick={() => DecCartCountHandler(item.recipe, item.image_url, item.price, item.title, item.quantity)}><BsFillDashCircleFill /></button>
                                                }
                                                <div>{item.quantity}</div>
                                                <button onClick={() => IncCartCountHandler(item.recipe, item.image_url, item.price, item.title, item.quantity)}><BsPlusCircleFill /></button>
                                            </div>
                                            <div className="Trash-Btn">
                                                <button onClick={() => deleteCartItemHandler(item._id)}><BsTrash /></button>
                                            </div>
                                        </div>
                            })}
                        </div> : null
                    }
                    <div className="Cart-Bottom">
                        <div className="Cart-Orders">
                            <button onClick={toggleCart}>{toggle ? <BsCaretDownFill /> : <BsCaretUpFill />}</button>
                            <span>Your Order(s) </span>
                        </div>
                        <div className="Cart-CheckOut">
                            <div>
                                <span>Sub Total: {cartLoading ? <Spinner2 /> : total && total.subTotal}</span>
                            </div>
                            <button onClick={ClearCartHandler}>Clear Cart</button>
                            <button onClick={navigateToCheckoutPage}>Continue</button>
                        </div> 
                    </div>
                </div> : null
            }
        </React.Fragment>
    )
}

export default Cart
