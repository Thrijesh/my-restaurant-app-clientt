import React from 'react'
import { useHistory } from 'react-router-dom'
import { useApi } from '../../context/ApiContext'

function ViewRecipe() {

    const { recipeByID, recipesData, getById, AddToCartHandler, cart } = useApi()
    const history = useHistory()

    const navigateToID = (id) => {
        getById(id)
        history.push(`/id/${id}`)
    }


    const styleFlex = {
        width: "100vw",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    }

    const styleBox = {
        width: "350px",
        height: "300px",
        backgroundColor: "red",
        border: "1px solid",
        cursor: "pointer"
    }

    return (
        <div>
            {console.log(cart && cart)}
            <h1>Recipe</h1>
            <p>The Recipe You Looking For Is: {recipeByID._id}</p>
            <p>MRP: ₹{recipeByID.price}</p>
            <img src={recipeByID.image_url} alt={recipeByID.title} />
            <p>Title: {recipeByID.title}</p>
            <p>Details:  {recipeByID.details}</p>
            <p>This Recipe is By: {recipeByID.author}</p>
            <button onClick={() => AddToCartHandler(recipeByID._id)}>Add to Cart</button>

            <div className="Cart">
                {   cart.map((item, index) => {
                    return  <div key={index}>
                                <div>
                                    <img src={item.image_url} alt="" width="100px" height="100px"/>
                                </div>
                                <div>
                                    <h3>{item.title}</h3>
                                    <div>
                                        - 4 +
                                    </div>
                                </div>
                            </div>
                })
                }
            </div>

            {recipesData && recipesData.map((el, i) => {
                    return <div style={styleBox} key={i} onClick={() => navigateToID(el._id)}>
                                <img src={el.image_url} alt={el.title} width="100%" height="200px"/>
                                <h2>{el.title}</h2>
                                <h3>{el._id}</h3>
                            </div>
                })}
        </div>
    )
}

export default ViewRecipe
