import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'

const OrderDetails = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, order = {} } = useSelector(state => state.orderDetails);

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={'Order Details'} />

            <div className='orderDetails'>
                <div className='orderDetails--container'>

                    <div className='orderDetails--container__title'>
                        Order # {order._id}
                    </div>

                    <div className='orderDetails--container__title_down'>
                        Shipping Info
                    </div>
                    <br />

                    <div className='orderDetails--container__shipping_detail'>
                        <span className='orderDetails--container__shipping_detail--title'> Name: </span>
                        <span className='orderDetails--container__shipping_detail--text'> {user && user.name} </span>
                    </div>

                    <div className='orderDetails--container__shipping_detail'>
                        <span className='orderDetails--container__shipping_detail--title'> Phone: </span>
                        <span className='orderDetails--container__shipping_detail--text'> {shippingInfo && shippingInfo.phoneNo} </span>
                    </div>

                    <div className='orderDetails--container__shipping_detail'>
                        <span className='orderDetails--container__shipping_detail--title'> Address: </span>
                        <span className='orderDetails--container__shipping_detail--text'> {shippingDetails}</span>
                    </div>

                    <br />

                    <div className='orderDetails--container__shipping_detail'>
                        <span className='orderDetails--container__shipping_detail--title'> Amount: </span>
                        <span className='orderDetails--container__shipping_detail--text'> ${totalPrice}</span>
                    </div>

                    <div className='orderDetails--container__title_top'>Payment</div>
                    {isPaid ? (
                        <div className='orderDetails--container__text_green'>PAID</div>
                    ) : (
                        <div className='orderDetails--container__text_red'>NOT PAID</div>
                    )}

                    <div className='orderDetails--container__title_top'>Order Status:</div>
                    <div className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "orderDetails--container__text_green" : "orderDetails--container__text_red"} >
                        {orderStatus}
                    </div>


                    <br />
                    <div className='orderDetails--container__title_top'>
                        Order Items:
                    </div>

                    <div className='orderDetails--container__order'>

                        {orderItems && orderItems.map(item => (
                            <Fragment key={item.product}>
                                <div className='orderDetails--container__order--items' >

                                    <div className='orderDetails--container__order--items__image'>
                                        <img className='orderDetails--container__order--items__image--size' src={item.image} alt={item.name} />
                                    </div>

                                    <Link to={`/product/${item.product}`} className='orderDetails--container__order--items__name'>
                                        {item.name}
                                    </Link>

                                    <div className='orderDetails--container__order--items__price'>
                                        <p>${(item.quantity * item.price).toFixed(2)}</p>
                                    </div>

                                    <div className='orderDetails--container__order--items__quantity'>
                                        <p>{item.quantity}</p>
                                    </div>

                                </div>
                            </Fragment>
                        ))}


                    </div>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderDetails
