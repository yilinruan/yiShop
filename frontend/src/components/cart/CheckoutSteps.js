import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { ImRadioUnchecked } from 'react-icons/im'
import { CgBorderStyleDotted } from 'react-icons/cg'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
        <div className='shipping--steps'>
            <div className='shipping--steps__container'>
                {shipping ? <Link to='/shipping'>
                    <FaCheckCircle className="shipping--steps__container--check" />
                    <span className="shipping--steps__container--step_on">Shipping</span>
                </Link> : <Link to="#!" disabled >
                    <ImRadioUnchecked className="shipping--steps__container--check_off" />
                    <span className="shipping--steps__container--step_off">Shipping</span>
                </Link>}


                <CgBorderStyleDotted className="shipping--steps__container--arrow" />

                {confirmOrder ? <Link to='/confirm' >
                    <FaCheckCircle className="shipping--steps__container--check" />
                    <span className="shipping--steps__container--step_on">Confirm Order</span>
                </Link> : <Link to="#!" disabled >
                    <ImRadioUnchecked className="shipping--steps__container--check_off" />
                    <span className="shipping--steps__container--step_off">Confirm Order</span>
                </Link>}

                <CgBorderStyleDotted className="shipping--steps__container--arrow" />


                {payment ? <Link to='/payment' >
                    <FaCheckCircle className="shipping--steps__container--check" />
                    <span className="shipping--steps__container--step_on">Payment</span>
                </Link> : <Link to="#!" disabled >
                    <ImRadioUnchecked className="shipping--steps__container--check_off" />
                    <span className="shipping--steps__container--step_off">Payment</span>
                </Link>}
            </div>



        </div>
    )
}

export default CheckoutSteps
