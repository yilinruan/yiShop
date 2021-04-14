import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="OrderSuccess">
                <div className="OrderSuccess--container">

                    <FaCheckCircle className="OrderSuccess--container__check_icon"/>

                    <div className="OrderSuccess--container__title">Your Order has been placed successfully.</div>

                    <Link className="OrderSuccess--container__link" to="/orders/me">Go to Orders</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess