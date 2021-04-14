import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import empty_cart_img from '../../components/imgs/empty_cart.svg';
import { RiDeleteBin6Line } from "react-icons/ri";
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'

const Cart = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert();

    const { cartItems } = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return alert.error("Out of Stock.");

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))
    }

    const checkOutHandler = () => {
        history.push('/login?required=shipping')
    }

    return (
        <Fragment>
            <MetaData title={'Shopping Cart'} />

            <div className='cart'>
                {cartItems.length === 0 ? (
                    <div className='cart--empty_body'>
                        <img className='cart--empty_body__image' src={empty_cart_img} alt='empty_cart_img' />

                        <div className='cart--empty_body__message'>
                            <div className='cart--empty_body__message--title'>You Cart is Empty </div>
                            <Link to='/' className='cart--empty_body__message--text'>Shop today's deals </Link>
                        </div>
                    </div>
                ) : (
                    <Fragment>
                        <div className='cart--body'>

                            <div className='cart--body__left'>

                                <div className='cart--body__left--title'>
                                    Your Cart: <span className='cart--body__left--title__number'> {cartItems.length} Items </span>
                                </div>
                                <div className='cart--body__left--myCart'>

                                    {cartItems.map(item => (
                                        <Fragment key={item.product}>
                                            <div className='cart--body__left--myCart__items' >

                                                <div className='cart--body__left--myCart__items--image'>
                                                    <img className='cart--body__left--myCart__items--image__size' src={item.image} alt={item.name} />
                                                </div>

                                                <Link to={`/product/${item.product}`} className='cart--body__left--myCart__items--name'>
                                                    {item.name}
                                                </Link>

                                                <div className='cart--body__left--myCart__items--price'>
                                                    ${item.price}

                                                </div>

                                                <div className='cart--body__left--myCart__items--stock_counter'>
                                                    <button className="cart--body__left--myCart__items--stock_counter__minus" onClick={() => decreaseQty(item.product, item.quantity)} >-</button>
                                                    <input className="cart--body__left--myCart__items--stock_counter__stock_number" type='number' value={item.quantity} readOnly />
                                                    <button className="cart--body__left--myCart__items--stock_counter__plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</button>
                                                </div>

                                                <div className='cart--body__left--myCart__items--delete'>
                                                    <RiDeleteBin6Line className='cart--body__left--myCart__items--delete__icon' onClick={() => removeCartItemHandler(item.product)} />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}


                                </div>
                            </div>

                            <div className='cart--body__right'>
                                <div className='cart--body__right--order'>
                                    <div className='cart--body__right--order__summary'>
                                        Order Summary
                                    </div>

                                    <div className='cart--body__right--order__total_area'>
                                        <span className='cart--body__right--order__total_area--text'>Subtotal:</span>
                                        <span className='cart--body__right--order__total_area--value'> {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units) </span>
                                    </div>
                                    <div className='cart--body__right--order__total_area'>
                                        <span className='cart--body__right--order__total_area--text'>Est. toal:</span>
                                        <span className='cart--body__right--order__total_area--value'> ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} </span>

                                    </div>
                                    <div className='cart--body__right--order__check_out_area'>
                                        <div className='cart--body__right--order__check_out_area--button' onClick={checkOutHandler} >
                                            Check out
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Fragment>
                )}

            </div>


        </Fragment>
    )
}

export default Cart
