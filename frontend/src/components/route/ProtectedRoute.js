import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader'

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false ? (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/login' />
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
