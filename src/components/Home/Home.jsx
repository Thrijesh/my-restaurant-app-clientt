import React, { useEffect } from 'react'
import { useApi } from '../../context/ApiContext'
import { useHistory } from 'react-router-dom'
import './Home.scss'
import banquet from '../../assets/images/banquet.png'
import beverage from '../../assets/images/beverage.png'
import breakfast from '../../assets/images/breakfast.png'
import cheeseBurger from '../../assets/images/cheese-burger.png'
import dinner from '../../assets/images/dinner.png'
import pizza from '../../assets/images/pizza.png'
import cupcake from '../../assets/images/cupcake.png'
import Navbar from '../Navbar/Navbar'
import Cart from '../Cart/Cart'

function Home() {
    
    const { getCartItems, get } = useApi()

    const { getById } = useApi()
    const history = useHistory()

    const navigateToID = (id) => {
        getById(id)
        history.push(`/id/${id}`)
    }

    const navigateToPizza = () => {
        history.push("/pizza")
    }

    const navigateToLunch = () => {
        history.push(`/lunch`)
    }

    const navigateToDinner = () => {
        history.push(`/dinner`)
    }

    const navigateToBreakfast = () => {
        history.push(`/breakfast`)
    }

    const navigateToBeverages = () => {
        history.push(`/beverages`)
    }

    const navigateToDesserts = () => {
        history.push(`/desserts`)
    }

    const navigateToSnacks = () => {
        history.push(`/snacks`)
    }

    useEffect(() => {
        getCartItems()
    }, [])

    return (
        <React.Fragment>
            <Navbar />
            <div className="Home">
                <h1>Our Menu</h1>
                <div className="Menu">
                    <div className="Home-Pizza-Menu" onClick={navigateToPizza}>
                        <div className="Img">
                            <img src={pizza} alt="" width="150px"/>
                        </div>
                        <div className="Title">
                            <span>Pizza</span>
                        </div>
                    </div>
                    <div className="Home-Pizza-Menu" onClick={navigateToLunch}>
                        <div className="Img">
                            <img src={banquet} alt="" width="150px"/>
                        </div>
                        <div className="Title">
                            <span>Lunch</span>
                        </div>
                    </div>
                    <div className="Home-Pizza-Menu" onClick={navigateToDinner}>
                        <div className="Img">
                            <img src={dinner} alt="" width="150px"/>
                        </div>
                        <div className="Title">
                            <span>Dinner</span>
                        </div>
                    </div>
                    <div className="Home-Pizza-Menu" onClick={navigateToBreakfast}>
                        <div className="Img">
                            <img src={breakfast} alt="" width="150px"/>
                        </div>
                        <div className="Title">
                            <span>Breakfast</span>
                        </div>
                    </div>
                    <div className="Home-Pizza-Menu" onClick={navigateToBeverages}>
                        <div className="Img">
                            <img src={beverage} alt="" width="150px"/>
                        </div>
                        <div className="Title">
                            <span>Beverages</span>
                        </div>
                    </div>
                    <div className="Home-Pizza-Menu" onClick={navigateToSnacks}>
                        <div className="Img">
                            <img src={cheeseBurger} alt="" width="150px"/>
                        </div>
                        <div className="Title">
                            <span>Snacks</span>
                        </div>
                    </div>
                    <div className="Home-Pizza-Menu" onClick={navigateToDesserts}>
                        <div className="Img">
                            <img src={cupcake} alt="" width="150px"/>
                        </div>
                        <div className="Title">
                            <span>Desserts</span>
                        </div>
                    </div>
                </div>
            </div>
            <Cart />
        </React.Fragment>
    )
}

export default Home