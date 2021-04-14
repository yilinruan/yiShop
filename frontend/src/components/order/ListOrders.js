import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { FiEye } from "react-icons/fi";
import { myOrders, clearErrors } from '../../actions/orderActions'

const ListOrders = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])


    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p className="myOrders--container__table--status_delivered" >{order.orderStatus}</p>
                    : <p className="myOrders--container__table--status_processing" >{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="myOrders--container__table--box">
                        <FiEye className="myOrders--container__table--box__icon"/>
                    </Link>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'My Orders'} />

            <div className='myOrders'>
                <div className='myOrders--container'>
                    <div className='myOrders--container__title'> My Orders </div>

                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setOrders()}
                            className="myOrders--container__table"
                            bordered
                            striped
                            hover
                        />
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default ListOrders
