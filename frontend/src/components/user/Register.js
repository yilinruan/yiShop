import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { register, clearErrors } from '../../actions/userActions'
import avatar_preview_image from '../../components/imgs/default_avatar.jpg';

import { Link } from 'react-router-dom'

const Register = ({ history }) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [picture, setPicture] = useState(false);

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState(avatar_preview_image)


    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error } = useSelector(state => state.auth)

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('avatar', avatar)

        dispatch(register(formData))
    }

    const onChange = e => {


        if (e.target.name === 'avatar') {

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
            setPicture(true)

            

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            <MetaData title={'Register User'} />

            <div className='register'>

                <div className='register--container'>
                    <div className='register--container__title' >
                        Register
                    </div>

                    <div className='register--container__input_field'>
                        <form className='register--container__input_field--form' encType='multipart/form-data' onSubmit={submitHandler} >


                            <div className='register--container__input_field--form__text' >
                                Name
                            </div>

                            <input
                                className='register--container__input_field--form__input'
                                type='name'
                                placeholder='name'
                                name='name'
                                value={name}
                                onChange={onChange}
                            />


                            <div className='register--container__input_field--form__text' >
                                Email
                            </div>

                            <input
                                className='register--container__input_field--form__input'
                                type='email'
                                placeholder='email'
                                name='email'
                                value={email}
                                onChange={onChange}
                            />

                            <div className='register--container__input_field--form__text' >
                                password
                            </div>

                            <input
                                className='register--container__input_field--form__input'
                                type='password'
                                placeholder='password'
                                name='password'
                                value={password}
                                onChange={onChange}
                            />

                            <div className='register--container__input_field--form__avatar'>
                                <div className='register--container__input_field--form__avatar--title'>Avatar</div>
                                <div className='register--container__input_field--form__avatar--container'>
                                    <img
                                        className='register--container__input_field--form__avatar--container__image'
                                        src={avatarPreview}
                                        alt='avatar Preview'
                                    />

                                    <div className='register--container__input_field--form__avatar--container__custom_file'>

                                        <label className='register--container__input_field--form__avatar--container__custom_file--label' htmlFor='avatar'>
                                            <div className='register--container__input_field--form__avatar--container__custom_file--label__left'>Choose Avatar</div>
                                            <div className='register--container__input_field--form__avatar--container__custom_file--label__right'>Browse</div>
                                        </label>

                                        <input
                                            className='register--container__input_field--form__avatar--container__custom_file--input'
                                            type='file'
                                            name='avatar'
                                            id='avatar'
                                            accept='images/*'
                                            onChange={onChange}
                                        />
                                    </div>

                                </div>
                            </div>


                            <button
                                className='register--container__input_field--form__submit'
                                type='submit'
                                disabled={picture ? false : true}
                            >
                                REGISTER
                            </button>

                        </form>
                    </div>
                </div>

                <div className="register--log_in_area">
                    Have an account?
                    <Link to="/login">
                        <span className='login--log_in_area__signin' > Sign in</span>
                    </Link>
                </div>


            </div>

        </Fragment >
    )
}

export default Register
