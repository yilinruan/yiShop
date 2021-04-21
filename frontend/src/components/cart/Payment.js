import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { clearItemFromCart } from '../../actions/cartActions'
import axios from 'axios'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])


    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        let res;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                alert.error(result.error.message);

            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(order))
                    dispatch(clearItemFromCart())

                    history.push('/success')
                } else {
                    alert.error('There is some issues while payment processing')
                }
            }

        } catch (error) {
            alert.error(error.response.data.message)
        }

    }


    return (
        <Fragment>
            <MetaData title={'Payment'} />
            <div className='payment'>
                <CheckoutSteps shipping confirmOrder payment />

                <div className='payment--container'>
                    <div className='payment--container__title' >
                        Card Info
                    </div>

                    <div className='payment--container__input_field'>

                        {/* <form className='payment--container__input_field--form'> */}
                        <form className='payment--container__input_field--form' onSubmit={submitHandler} >

                            <div className='payment--container__input_field--form__text' >
                                Card Number
                            </div>

                            <CardNumberElement
                                className='payment--container__input_field--form__input'
                                type='text'
                                options={options}
                            
                            // value={address}
                            // onChange={(e) => setAddress(e.target.value)}
                            />

                            <div className='payment--container__input_field--form__text' >
                                Card Expire Date

                            </div>

                            <CardExpiryElement
                                className='payment--container__input_field--form__input'
                                type='text'
                                options={options}

                            // value={city}
                            // onChange={(e) => setCity(e.target.value)}
                            />

                            <div className='payment--container__input_field--form__text' >
                                Card CVC
                            </div>

                            <CardCvcElement
                                className='payment--container__input_field--form__input'
                                type='text'
                                options={options}

                            // value={phoneNo}
                            // onChange={(e) => setPhoneNo(e.target.value)}
                            />

                            <input className='payment--container__input_field--form__submit' type='submit' id='pay_btn' value='Pay' />
                        </form>
                    </div>
                </div>

                <div className='payment--space_holder' />

            </div>
        </Fragment>
    )
}

export default Payment
