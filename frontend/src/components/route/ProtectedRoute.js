import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import { userReducer } from '../../reducers/userReducers'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false ? (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/login' />
                        }

                        if(isAdmin === true && user.role !== 'admin'){
                            return <Redirect to="/" />
                        }

                        return <Component {...props} />
                    }}
                />
            ) : (
                <Loader />
            )}

        </Fragment>
    )
}

export default ProtectedRoute
