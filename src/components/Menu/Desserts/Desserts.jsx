import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useApi } from '../../../context/ApiContext'

import Card from '../../RecipeCard/Card'
import Cart from '../../Cart/Cart'
import Navbar from '../../Navbar/Navbar'

import './Desserts.scss'

function Desserts() {

    const { getRecipesByMenu, menuList, loading, addToCartHandler } = useApi()
    const history = useHistory()

    const BackToMenu = () => {
        history.push('/')
    }

    useEffect(() => {
        getRecipesByMenu("dessert")
    }, [])

    return (
        <React.Fragment>
            <Navbar />
            <button className="Menu-Button" onClick={BackToMenu}>Menu</button>
            <div className="Desserts">
                {loading ? <h1>Loading...</h1> :
                    menuList && menuList.map((item, i) => {
                        return <Card  key={i} image={item.image_url} title={item.title} price={item.price} id={item._id}/>
                    })
                }
            </div>
            <Cart />
        </React.Fragment>
    )
}

export default Desserts
