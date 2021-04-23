import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { forgotPassword, clearErrors } from '../../actions/userActions'
import Loader from '../layout/Loader'

const ForgotPassword = ({ history }) => {

    const [email, setEmail] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch()

    const { error, message, loading } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message)
            history.push('/me')

        }

    }, [dispatch, message, alert, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            { loading ? <Loader /> : (

                <Fragment>
                    <MetaData title={'Forgot Password'} />

                    <div className='forgotPassword'>

                        <div className='forgotPassword--container'>
                            <div className='forgotPassword--container__title' >
                                Forgot Password
                        </div>

                            <div className='forgotPassword--container__input_field'>
                                <form className='forgotPassword--container__input_field--form' encType='multipart/form-data' onSubmit={submitHandler} >

                                    <div className='forgotPassword--container__input_field--form__text' >
                                        Enter Email:
                                    </div>

                                    <input
                                        className='forgotPassword--container__input_field--form__input'
                                        type='email'
                                        placeholder='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <button
                                        className='forgotPassword--container__input_field--form__submit'
                                        type='submit'
                                        disabled={loading ? true : false}
                                    >
                                        Send Email
                                </button>

                                </form>

                            </div>
                        </div>


                    </div>

                </Fragment>

            )}

        </Fragment>

    )
}

export default ForgotPassword
