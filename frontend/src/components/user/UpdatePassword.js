import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import Loader from '../layout/Loader'

const UpdatePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch()

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Password updated successfully')

            history.push('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, isUpdated, alert, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        dispatch(updatePassword(formData))
    }


    return (
        <Fragment>
            { loading ? <Loader /> : (

                <Fragment>
                    <MetaData title={'Update Password'} />

                    <div className='updatePassword'>

                        <div className='updatePassword--container'>
                            <div className='updatePassword--container__title' >
                                Update Password
                            </div>

                            <div className='updatePassword--container__input_field'>
                                <form className='updatePassword--container__input_field--form' encType='multipart/form-data' onSubmit={submitHandler} >

                                    <div className='updatePassword--container__input_field--form__text' >
                                        Old Password
                                    </div>

                                    <input
                                        className='updatePassword--container__input_field--form__input'
                                        type='password'
                                        placeholder='Old Password'
                                        name='oldPassword'
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />


                                    <div className='updatePassword--container__input_field--form__text' >
                                        New Password
                                    </div>

                                    <input
                                        className='updatePassword--container__input_field--form__input'
                                        type='password'
                                        placeholder='New Password'
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />


                                    <button
                                        className='updatePassword--container__input_field--form__submit'
                                        type='submit'
                                        disabled={loading ? true : false}
                                    >
                                        Update Password
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

export default UpdatePassword
