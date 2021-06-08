import React from 'react'
import Layout from './Layout'
import { ApiProvider } from './context/ApiContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import ViewRecipe from './components/ViewRecipe/ViewRecipe'
import SearchResultPage from './components/SearchResultPage/SearchResultPage'
import './App.scss';
import Pizza from './components/Menu/Pizza/Pizza'
import Lunch from './components/Menu/Lunch/Lunch'
import Breakfast from './components/Menu/Breakfast/Breakfast'
import Dinner from './components/Menu/Dinner/Dinner'
import Snacks from './components/Menu/Snacks/Snacks'
import Desserts from './components/Menu/Desserts/Desserts'
import Beverages from './components/Menu/Beverages/Beverages'
import CheckOut from './components/CheckOut/CheckOut'
import { AuthProvider } from './context/AuthContext'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Ordered from './components/Ordered/Ordered'
import UserOrders from './components/UserOrders/UserOrders'

function App() {

  return (
    <AuthProvider>
      <ApiProvider>
        <div className="App">   
          <Router>
            <Switch>
              <Layout>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/" exact component={Home} />
                <Route path="/id/:id" component={ViewRecipe} />
                <Route path={`${'/q/:id'}`} component={SearchResultPage} />
                <Route path="/pizza" component={Pizza} />
                <Route path="/lunch" component={Lunch} />
                <Route path="/dinner" component={Dinner} />
                <Route path="/breakfast" component={Breakfast} />
                <Route path="/snacks" component={Snacks} />
                <Route path="/beverages" component={Beverages} />
                <Route path="/desserts" component={Desserts} />
                <PrivateRoute path="/checkout" component={CheckOut} />
                <PrivateRoute path="/order-confirmed" component={Ordered} />
                <PrivateRoute path="/your-orders" component={UserOrders} />
              </Layout>
            </Switch>
          </Router>
        </div>
      </ApiProvider>
    </AuthProvider>
  )
}

export default App;
