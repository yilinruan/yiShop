import React, { Fragment } from 'react';

import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar'

const Dashboard = () => {
    return (
        <Fragment>
            <div className="dashboard">
                <div>
                    <Sidebar />
                </div>

                <Fragment>
                    <MetaData title={'Admin Dashboard'} />

                    <div className="dashboard--container">
                        <div className="dashboard--container__block">
                            <div className="dashboard--container__block--content">Dashboard</div>
                        </div>

                        <div className="dashboard--container__table">
                            <div className="dashboard--container__table--content">
                                Total Amount
                                <br/>
                                $1259
                            </div>
                        </div>
                    </div>

                </Fragment>
            </div>
        </Fragment>
    )
}


export default Dashboard
