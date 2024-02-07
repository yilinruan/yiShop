import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [dropDown, setDropDown] = useState(false);

    return (
        <div className="dashboard--sidebar">
            <nav className="dashboard--sidebar__page">
                <div className="dashboard--sidebar__page--block">
                    <Link className="dashboard--sidebar__page--block__item" to="/dashboard" >Dashboard</Link>
                </div>

                <div className="dashboard--sidebar__page--block" >
                    <div className="dropdown-toggle dashboard--sidebar__page--block__item" onClick={() => setDropDown(!dropDown)}>
                        Products
                    </div>
                </div>


                {dropDown &&
                    <div className="dashboard--sidebar__page--dropdown">
                        <Link className="dashboard--sidebar__page--dropdown__btn" to="/admin/products">All</Link>

                        <Link className="dashboard--sidebar__page--dropdown__btn" to="/admin/product">Create</Link>
                    </div>
                }

                <div className="dashboard--sidebar__page--block">
                    <Link className="dashboard--sidebar__page--block__item" to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                </div>

                <div className="dashboard--sidebar__page--block">
                    <Link className="dashboard--sidebar__page--block__item" to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                </div>

                <div className="dashboard--sidebar__page--block">
                    <Link className="dashboard--sidebar__page--block__item" to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                </div>
            </nav>
        </div>

    )
}

export default Sidebar
