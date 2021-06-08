import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useApi } from '../../../context/ApiContext'

import Cart from '../../Cart/Cart'
import Navbar from '../../Navbar/Navbar'
import Card from '../../RecipeCard/Card'
import { Spinner } from '../../UI/Spinner/Spinner'

import './Snacks.scss'

function Snacks() {

    const { getRecipesByMenu, menuList, loading } = useApi()
    const history = useHistory()

    const BackToMenu = () => {
        history.push('/')
    }

    useEffect(() => {
        getRecipesByMenu("snacks")
    }, [])

    return (
        <React.Fragment>
            <Navbar />
            <button className="Menu-Button" onClick={BackToMenu}>Menu</button>
            <div className="Snacks">
                {loading ? <Spinner /> :
                    menuList && menuList.map((item, i) => {
                        return <Card  key={i} image={item.image_url} title={item.title} price={item.price} id={item._id}/>
                    })
                }
            </div>
            <Cart />
        </React.Fragment>
    )
}

export default Snacks
