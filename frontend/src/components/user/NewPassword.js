import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { resetPassword, clearErrors } from '../../actions/userActions'
import Loader from '../layout/Loader'

const NewPassword = ({history, match}) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch()

    const { error, success, loading } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password updated successfully")
            history.push('/login')

        }

    }, [dispatch, success, alert, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(match.params.token ,formData))
    }

    return (
        <Fragment>
            { loading ? <Loader /> : (

                <Fragment>
                    <MetaData title={'New Password'} />

                    <div className='newPassword'>

                        <div className='newPassword--container'>
                            <div className='newPassword--container__title' >
                                New Password
                            </div>

                            <div className='newPassword--container__input_field'>
                                <form className='newPassword--container__input_field--form' encType='multipart/form-data' onSubmit={submitHandler} >

                                    <div className='newPassword--container__input_field--form__text' >
                                        Password
                                    </div>

                                    <input
                                        className='newPassword--container__input_field--form__input'
                                        type='password'
                                        placeholder='password'
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />


                                    <div className='newPassword--container__input_field--form__text' >
                                        Confirm Password
                                    </div>

                                    <input
                                        className='newPassword--container__input_field--form__input'
                                        type='password'
                                        placeholder='confirm Password'
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />


                                    <button
                                        className='newPassword--container__input_field--form__submit'
                                        type='submit'
                                        disabled={loading ? true : false}
                                    >
                                        Set Password
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

export default NewPassword
