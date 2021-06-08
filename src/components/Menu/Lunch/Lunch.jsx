import React, { useEffect } from 'react'
import { useApi } from '../../../context/ApiContext'
import { useHistory } from 'react-router-dom'
import './Lunch.scss'
import Navbar from '../../Navbar/Navbar'
import Cart from '../../Cart/Cart'
import Card from '../../RecipeCard/Card'
import { Spinner } from '../../UI/Spinner/Spinner'

function Lunch() {

    const { getRecipesByMenu, menuList, loading } = useApi()
    const history = useHistory()

    const BackToMenu = () => {
        history.push('/')
    }

    useEffect(() => {
        getRecipesByMenu("lunch")
    }, [])

    return (
        <React.Fragment>
            <Navbar />
            <button className="Menu-Button" onClick={BackToMenu}>Menu</button>
            <div className="Lunch">
                { loading ? <Spinner /> : 
                    menuList && menuList.map((item, i) => {
                    return  <Card  key={i} image={item.image_url} title={item.title} price={item.price} id={item._id}/>
                    })
                }
            </div>
            <Cart />
        </React.Fragment>
    )
}

export default Lunch
