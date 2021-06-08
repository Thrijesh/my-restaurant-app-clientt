import React, { useEffect } from 'react'
import { useApi } from '../../../context/ApiContext'
import { useHistory } from 'react-router-dom'
import './Pizza.scss'
import Navbar from '../../Navbar/Navbar'
import Cart from '../../Cart/Cart'
import { Spinner } from '../../UI/Spinner/Spinner'
import Card from '../../RecipeCard/Card'

function Pizza() {

    const { menuList, loading, getRecipesByMenu } = useApi()
    const history = useHistory()

    const BackToMenu = () => {
        return history.push('/')
    }

    useEffect(() => {
        getRecipesByMenu('pizza')
    }, [])

    return (
        <React.Fragment>
            <Navbar />
            <button className="Menu-Button" onClick={BackToMenu}>Menu</button>
            <div className="Pizza">
                { loading ? <Spinner /> :
                menuList && menuList.map((item, i) => {
                    return <Card  key={i} image={item.image_url} title={item.title} price={item.price} id={item._id}/>
                })}
            </div>
            <Cart />
        </React.Fragment>
    )
}

export default Pizza
