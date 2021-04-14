import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { login, clearErrors } from '../../actions/userActions'

const Login = ({ history, location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            // alert.success('Welcome Back' )
            history.push(redirect)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, history, location, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (

                <Fragment>
                    <MetaData title={'Login'} />

                    <div className='login'>

                        <div className='login--container'>
                            <div className='login--container__title' >
                                Sign in
                            </div>

                            <div className='login--container__input_field'>
                                <form className='login--container__input_field--form' onSubmit={submitHandler} >

                                    <div className='login--container__input_field--form__text' >
                                        Email
                                    </div>

                                    <input
                                        className='login--container__input_field--form__input'
                                        type='email'
                                        placeholder='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className='login--container__input_field--form__text' >
                                        password
                                        <Link to="/password/forgot">
                                            <span className='login--container__input_field--form__text--sub'>
                                                Forgot Password?
                                            </span>
                                        </Link>
                                    </div>

                                    <input
                                        className='login--container__input_field--form__input'
                                        type='password'
                                        placeholder='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <input className='login--container__input_field--form__submit' type='submit' value='Submit' />

                                </form>
                            </div>



                        </div>
                        <div className='login--sign_up_area' >
                            Don't have an account?
                            <Link to="/register">
                                <span className='login--sign_up_area__signup' > Sign up</span>
                            </Link>
                        </div>
                    </div>

                </Fragment>

            )}
        </Fragment>
    )
}

export default Login
