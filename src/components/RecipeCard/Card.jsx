import React from 'react'
import { useHistory } from 'react-router-dom'

import { useApi } from  '../../context/ApiContext'
import './Card.scss'

function Card({ title, image, price, id}) {
    
    let user = localStorage.getItem('user')
    const history = useHistory()
    const { addToCartHandler } = useApi()

    const openLoginHandler = () => {
        console.log("Clicked ")
        return history.push("/login")
    }



    const newTitle = title.slice(0, 18) + " ..."
    return (
        <div className="Box">
            <div className="Img-Cont">
                <img src={image} alt={title}/>
            </div>
            <div className="Det-Cont">
                <span>{newTitle}</span>
                <span><i>₹</i> {price}</span>
                <button onClick={() => user ? addToCartHandler(id, price, image, title) : openLoginHandler() }>Add to Cart</button>
            </div>
        </div>
    )
}

export default Card
