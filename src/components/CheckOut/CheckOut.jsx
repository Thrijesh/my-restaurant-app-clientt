import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useApi } from '../../context/ApiContext'
import { BsDash, BsPlus, BsTrash } from 'react-icons/bs'
import './CheckOut.scss'

function CheckOut() {

    const { cart, 
            total,
            IncCartCountHandler, 
            DecCartCountHandler, 
            deleteCartItemHandler,
            addAddressHandler,
            getAddressHandler, 
            userAddress,
            showForm,
            showFormHandler,
            postEditAddressHandler,
            postOrder,
        isOrdered } = useApi()

    const [ name, setName ] = useState("")
    const [ mobileNo, setMobileNo ] = useState('')
    const [ pincode, setPincode ] = useState('')
    const [ landmark, setLandmark ] = useState('')
    const [ stateaddress, setAddress ] = useState('')
    const [ area, setArea ] = useState('')
    const [ state, setState ] = useState('')
    const [ alternatePhoneNo, setAlternatePhoneNo ] = useState('')
    const [ addressType, setAddressType ] = useState('home')
    const [ optAddedAddressList, setOptAddedAddressList ] = useState([])
    const [ selectedAddress, setSelectedAddress ] = useState()
    const [ confirmSelectedAddress, setCorfirmSelectedAddress ] = useState(false)
    const [ paymentMode, setPaymentMode ] = useState(null)
    const [ placeOrderButton, setPlaceOrderButton ] = useState(false)
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
        
    let user = localStorage.getItem('user')
    let user_info = JSON.parse(user)

    
    useEffect(() => {
        if(user) {
            return setIsLoggedIn(true)
        }
    })

    useEffect(() => {
        const address = userAddress.map(add => ({ ...add, selected: false, edit: false })) 
        setOptAddedAddressList(address)
        console.log('useEffect addadddddd', address)
    }, [userAddress])

    useEffect(() => {
        getAddressHandler()
        console.log('useEffect GETaddadddddd')
    }, [])

    const selectAddressHandler = (address) => {
        const updatedAdd = optAddedAddressList.map(adr => 
            adr._id === address._id ? {...adr, selected: true} : {...adr, selected: false, edit: false})
        setOptAddedAddressList(updatedAdd)    
        console.log(updatedAdd)
    }  
    
    const confirmDeliveryAddressHandler = (address) => {
        setSelectedAddress(address)
        setCorfirmSelectedAddress(true)
    }

    const ChangeAddressHandler = () => {
        setCorfirmSelectedAddress(false)
        setSelectedAddress(null)
        setPaymentMode(null)
    }

    const editAddressHandler = (address) => {
        setName(address.name)
        setMobileNo(address.mobileNo)
        setPincode(address.pincode)
        setLandmark(address.landmark)
        setAddress(address.address)
        setArea(address.area)
        setState(address.state)
        setAlternatePhoneNo(address.alternatePhoneNo)
        setAddressType(address.addressType)
        const updatedAdd = optAddedAddressList.map(adr => 
            adr._id === address._id ? {...adr, edit: true} : {...adr, edit: false})
        setOptAddedAddressList(updatedAdd)    
        console.log(updatedAdd)
    }

    const editCancelHandler = (address) => {
        const updatedAdd = optAddedAddressList.map(adr => 
            adr._id === address._id ? {...adr, edit: false} : {...adr, edit: false})
        setOptAddedAddressList(updatedAdd)
    }

    useEffect(() => {
        if(paymentMode !== null) {
            setPlaceOrderButton(true)
        }
    }, [paymentMode])


    const placeOrder = (e) => {
        let orderItems = cart.map(el => {
            return {
                recipeId: el.recipe,
                price: el.price,
                quantity: el.quantity
            }
        })

        let Today = new Date()

        let orderStatus = {
            status: 'orderplaced',
            date: Today.getDay(),
            isOrderDelivered: false
        }

        let payload = {
            addressId: selectedAddress._id,
            totalAmount: total.NetPrice,
            orderedItems: orderItems,
            paymentStatus: paymentMode === "cod" ? "pending" : "completed",
            paymentType: paymentMode,
            orderStatus: orderStatus
        }
        postOrder(e, payload)  
    }
    if(isOrdered) {
       return  <Redirect to='/order-confirmed'/>
    }

    console.log(isOrdered)

    const addBG = {
        backgroundColor: "#C86262"
    }
    

    return (
        <div className="CheckOut">
            <nav className="CheckOut-Nav">
                <div>
                    <Link to="/" >Menu</Link>
                </div>
                <div>
                    <header>My Restaurant</header>
                </div>
            </nav>
            <div>
                <h1>Checkout</h1>
            </div>
            <div className="CheckOut-Flex">
                <div className="CheckOut-Billing-Container">
                    
                    <div className="Login-Container">
                        <div className="Login-Header" style={isLoggedIn ? addBG : null}>
                            <h4>LOGIN</h4>
                        </div>
                        {
                            localStorage.length > 1 ? 
                            <div className="User-Details">
                                <p className="User-Name">{user_info.fullName}</p>
                                <p className="User-Email">( {user_info.email} )</p>
                            </div>
                            : <button>LOGIN</button>
                        }
                    </div>

                    <div className="Address-Container">
                        <div className="Address-Header" style={confirmSelectedAddress ? addBG : null}>
                            <h4>ADDRESS</h4>
                        </div>
                        {
                           confirmSelectedAddress ? 
                           <div className="Selceted-Address">
                                <h4 className="Type">{selectedAddress.addressType}</h4>
                                <span className="NameAndPhone">{selectedAddress.name} </span>
                                <span className="NameAndPhone"> {selectedAddress.mobileNo}, {selectedAddress.alternatePhoneNo}</span>
                                <div>
                                    <h5 className="Landmark">{selectedAddress.landmark}, </h5>
                                    <span className="Address">{selectedAddress.address},</span>
                                    <span className="Area"> {selectedAddress.area}.</span>
                                    <span className="Pincode"> {selectedAddress.pincode}</span>
                                </div>
                               <button onClick={ChangeAddressHandler}>Change Address</button>
                            </div> :
                           localStorage.length > 1 ? 
                           <div className="Address-List">
                               {optAddedAddressList && optAddedAddressList.map((address, i) => {
                                   return <div className="Address-List">
                                                {
                                                    address.edit ? 
                                                    <form className="CheckOut-Form" onSubmit={(event) => postEditAddressHandler(event, address._id, name, mobileNo, pincode, landmark, stateaddress, area, state, alternatePhoneNo, addressType)  }>
                                                        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} required/>
                                                        <input type="phone" placeholder="Phone Number" value={mobileNo} onChange={(event) => setMobileNo(event.target.value)} required/>
                                                        <input type="text" placeholder="Landmark" value={landmark} onChange={(event) => setLandmark(event.target.value)} required/>
                                                        <input type="text" placeholder="Address" value={stateaddress} onChange={(event) => setAddress(event.target.value)} required/>
                                                        <input type="text" placeholder="Area" value={area} onChange={(event) => setArea(event.target.value)} required/>
                                                        <input type="text" placeholder="State" value={state} onChange={(event) => setState(event.target.value)} required/>
                                                        <input type="text" placeholder="Pincode" value={pincode} onChange={(event) => setPincode(event.target.value)} required/>
                                                        <input type="text" placeholder="Alternate PhoneNo" value={alternatePhoneNo } onChange={(event) => setAlternatePhoneNo(event.target.value)} required/>
                                                        {/* <input type="text" placeholder="Address Type" value={addressType} onChange={(event) => setAddressType(event.target.value)} required/> */}
                                                        <select value={addressType} onChange={(event) => setAddressType(event.target.value)}>
                                                            <option value="work">Work</option>
                                                            <option value="home">Home</option>
                                                        </select>  
                                                        <button type="submit" >Save</button>
                                                        <button className="Button" onClick={editCancelHandler}>Cancel</button>
                                                    </form> :

                                                    <div className="List" key={address.name}> 
                                                        <input type="radio" name="address" onClick={() => selectAddressHandler(address)}/>
                                                        <div className="List_Details">
                                                            <h4 className="Type">{address.addressType}</h4>
                                                            <span className="NameAndPhone">{address.name} </span>
                                                            <span className="NameAndPhone"> {address.mobileNo}, {address.alternatePhoneNo}</span>
                                                            <div>
                                                                <h5 className="Landmark">{address.landmark}, </h5>
                                                                <span className="Address">{address.address},</span>
                                                                <span className="Area"> {address.area}.</span>
                                                                <span className="Pincode"> {address.pincode}</span>
                                                            </div>
                                                            {
                                                                address.selected && <button className="Button" onClick={() => confirmDeliveryAddressHandler(address)}>Deliver Here</button> 
                                                            }  
                                                        </div>
                                                        {
                                                            address.selected && <button className="Button" onClick={() => editAddressHandler(address)}>Edit</button>
                                                        }
                                                    </div>
                                                }    
                                            </div>     
                               })}
                               <h5 className="Add-Address" onClick={showFormHandler}>Add new address { showForm ? <span><BsDash /></span> : <span><BsPlus /></span> } </h5>
                               {
                                   showForm ? 
                                   <form className="CheckOut-Form" onSubmit={(event) => addAddressHandler(event, name, mobileNo, pincode, landmark, stateaddress, area, state, alternatePhoneNo, addressType)}>
                                       <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} required/>
                                       <input type="phone" placeholder="Phone Number" value={mobileNo} onChange={(event) => setMobileNo(event.target.value)} required/>
                                       <input type="text" placeholder="Landmark" value={landmark} onChange={(event) => setLandmark(event.target.value)} required/>
                                       <input type="text" placeholder="Address" value={stateaddress} onChange={(event) => setAddress(event.target.value)} required/>
                                       <input type="text" placeholder="Area" value={area} onChange={(event) => setArea(event.target.value)} required/>
                                       <input type="text" placeholder="State" value={state} onChange={(event) => setState(event.target.value)} required/>
                                       <input type="text" placeholder="Pincode" value={pincode} onChange={(event) => setPincode(event.target.value)} required/>
                                       <input type="text" placeholder="Alternate PhoneNo" value={alternatePhoneNo} onChange={(event) => setAlternatePhoneNo(event.target.value)} required/>
                                       {/* <input type="text" placeholder="Address Type" value={addressType} onChange={(event) => setAddressType(event.target.value)}/> */}
                                       <select value={addressType} onChange={(event) => setAddressType(event.target.value)}>
                                           <option value="work">Work</option>
                                           <option value="home">Home</option>
                                       </select>    
                                       <button className="Button" type="submit" >Add Address</button>
                                   </form>
                                   : null
                               }
                           </div>
                           :null
                        }
                    </div>
                    
                    <div className="Payment-Mode-Container">
                        <div className="Payment-Header" style={paymentMode ? addBG : null}>
                            <h4>PAYMENT MODE</h4>
                        </div>
                        {
                            confirmSelectedAddress &&
                            <div className="Payment-Mode">
                                <input type="radio" name="payment" value="cod" onChange={event => setPaymentMode(event.target.value)}/>
                                <label>Cash On Delivery</label><br/>
                                <input type="radio" name="payment" value="upi" onChange={event => setPaymentMode(event.target.value)}/>
                                <label>UPI</label>
                            </div>  
                        }
                    </div>
                </div>
                <div className="CheckOut-Summary">
                    <header>Summary</header>
                    <div className="CheckOut-OrderList">
                        {cart && cart.map((item, i) => {
                            return  <div key={i} className="Orders">
                                        <div className="Orders-1">
                                            {/* <img src={item.image_url} alt={item.title} width="40px" height="40px"/> */}
                                            <div className="Title">{item.title}</div>
                                            <div className="Order-Inc-Dec">
                                                { item.quantity < 2 ? 
                                                    <button onClick={() => deleteCartItemHandler(item._id)}><BsTrash /></button> : 
                                                    <button onClick={() => DecCartCountHandler(item.recipe, item.image_url, item.price, item.title, item.quantity)}><BsDash /></button>
                                                }
                                                <div>{item.quantity}</div>
                                                <button onClick={() => IncCartCountHandler(item.recipe, item.image_url, item.price, item.title, item.quantity)}><BsPlus /></button>
                                            </div>
                                        </div>
                                        <div className="Orders-2">
                                            <span>{item.price}</span>
                                        </div>
                                    </div>
                        })}
                        </div>
                    <div className="CheckOut-Final">
                        <div className="Sub">
                            <p>Sub Total: </p>
                            <p>{total && total.subTotal}</p>
                        </div>
                        <div className="Tax">
                            <p>Taxes & Charges </p>
                            <p>{total && total.GSTAmount}</p>
                        </div>
                        <div className="Net">
                            <p>Grand Total: </p>
                            <p>{total && total.NetPrice}</p>
                        </div>
                        <button className="Order-Btn" onClick={(e) => placeOrder(e)} disabled={placeOrderButton ? false : true}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
