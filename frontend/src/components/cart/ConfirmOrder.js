import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { Link } from 'react-router-dom'


const ConfirmOrder = ({ history }) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }


    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />

            <div className='confirm_order'>
                <CheckoutSteps shipping confirmOrder />

                <div className='confirm_order--body'>

                    <div className='confirm_order--body__left'>

                        <div className='confirm_order--body__left--shipping_info'>
                            Shipping Information
                        </div>
                        <br />

                        <div className='confirm_order--body__left--shipping_detail'>
                            <span className='confirm_order--body__left--shipping_detail__title'> Name: </span>
                            <span className='confirm_order--body__left--shipping_detail__text'> {user && user.name} </span>
                        </div>

                        <div className='confirm_order--body__left--shipping_detail'>
                            <span className='confirm_order--body__left--shipping_detail__title'> Phone: </span>
                            <span className='confirm_order--body__left--shipping_detail__text'> {user && shippingInfo.phoneNo} </span>
                        </div>

                        <div className='confirm_order--body__left--shipping_detail'>
                            <span className='confirm_order--body__left--shipping_detail__title'> Address: </span>
                            <span className='confirm_order--body__left--shipping_detail__text'> {user && shippingInfo.address},  {user && shippingInfo.city}, {user && shippingInfo.country}</span>
                        </div>

                        <br />

                        <div className='confirm_order--body__left--title'>
                            Your Cart Items:
                        </div>
                        <div className='confirm_order--body__left--myCart'>

                            {cartItems.map(item => (
                                <Fragment key={item.product}>
                                    <div className='confirm_order--body__left--myCart__items' >

                                        <div className='confirm_order--body__left--myCart__items--image'>
                                            <img className='confirm_order--body__left--myCart__items--image__size' src={item.image} alt={item.name} />
                                        </div>

                                        <Link to={`/product/${item.product}`} className='confirm_order--body__left--myCart__items--name'>
                                            {item.name}
                                        </Link>

                                        <div className='confirm_order--body__left--myCart__items--price'>
                                            <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                        </div>

                                    </div>
                                </Fragment>
                            ))}


                        </div>
                    </div>

                    <div className='confirm_order--body__right'>
                        <div className='confirm_order--body__right--order'>
                            <div className='confirm_order--body__right--order__summary'>
                                Order Summary
                            </div>

                            <div className='confirm_order--body__right--order__total_area'>
                                <span className='confirm_order--body__right--order__total_area--text'>Subtotal:</span>
                                <span className='confirm_order--body__right--order__total_area--value'> ${itemsPrice.toFixed(2)} </span>
                            </div>

                            <div className='confirm_order--body__right--order__total_area'>
                                <span className='confirm_order--body__right--order__total_area--text'>Shipping:</span>
                                <span className='confirm_order--body__right--order__total_area--value'> ${shippingPrice} </span>
                            </div>

                            <div className='confirm_order--body__right--order__total_area'>
                                <span className='confirm_order--body__right--order__total_area--text'>Tax:</span>
                                <span className='confirm_order--body__right--order__total_area--value'> ${taxPrice} </span>
                            </div>

                            <div className='confirm_order--body__right--order__total_area'>
                                <span className='confirm_order--body__right--order__total_area--text'>Est. toal:</span>
                                <span className='confirm_order--body__right--order__total_area--value'> ${totalPrice} </span>

                            </div>

                            <div className='confirm_order--body__right--order__confirm_area'>
                                <div className='confirm_order--body__right--order__confirm_area--button' onClick={processToPayment} >
                                    Proceed to Payment
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>

            </div>

        </Fragment>
    )
}

export default ConfirmOrder
