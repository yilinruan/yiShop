
import { useEffect, useState } from 'react'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Shop from './components/pages/Shop';
import ProductDetails from './components/product/ProductDetails'
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import Login from './components/user/Login';
import Register from './components/user/Register'
import { loadUser } from './actions/userActions'
import store from './store'
import axios from 'axios'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

// Cart Imports
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

// Order Imports
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

//Payment
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './styles/main.css';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }
    getStripApiKey();

  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" component={Shop} exact />
        <Route path="/search/:keyword" component={Shop} />
        <Route path="/product/:id" component={ProductDetails} exact />

        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/shipping" component={Shipping} />
        <ProtectedRoute path="/confirm" component={ConfirmOrder} exact/>
        <ProtectedRoute path="/success" component={OrderSuccess} />

        {stripeApiKey &&
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" component={Payment} />
          </Elements>
        }

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
        <ProtectedRoute path="/password/update" component={UpdatePassword} exact />

        <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        <ProtectedRoute path="/order/:id" component={OrderDetails} exact />

        <Footer />
      </div>
    </Router>
  );
}

export default App;