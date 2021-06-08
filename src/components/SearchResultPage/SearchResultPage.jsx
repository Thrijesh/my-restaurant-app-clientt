import React from 'react'
import { useHistory } from 'react-router'
import { useApi } from '../../context/ApiContext'
import Cart from '../Cart/Cart'
import Navbar from '../Navbar/Navbar'
import { Spinner } from '../UI/Spinner/Spinner'
import './SearchResultPage.scss'

function SearchResultPage() {

    const { searchData, loading, error, addToCartHandler } = useApi()

    let user = localStorage.getItem('user')

    const history = useHistory()

    const openLoginHandler = () => {
        console.log("Clicked ")
        return history.push("/login")
    }

    

    return (
        <React.Fragment>
            <Navbar />      
            <div className="Search-Page">
                { error ? <span>Please try again  {error.message}</span> : null }
                {loading ? <Spinner /> : searchData && searchData.map((item, i) => {
                    const newTitle = item.title.slice(0, 18) + " ..."
                    return  <div key={i} className="Search-Box">
                                <div className="Img-Cont">
                                    <img src={item.image_url} alt={item.title} width="200px" height="200px"/>
                                </div>
                                <div className="Det-Cont">
                                    <span>{newTitle}</span>
                                    <span><i>₹</i> {item.price}</span>
                                    <button onClick={() => user ? addToCartHandler(item._id, item.price, item.image_url, item.title) : openLoginHandler()}>Add to Cart</button>
                                </div>
                            </div>
                })}
            </div>
            <Cart />
        </React.Fragment>
    )
}

export default SearchResultPage
