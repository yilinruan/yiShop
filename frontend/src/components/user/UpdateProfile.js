import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import avatar_preview_image from '../../components/imgs/default_avatar.jpg';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState(avatar_preview_image)

    const alert = useAlert()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('user updated successfully')
            dispatch(loadUser())

            history.push('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })

        }

    }, [dispatch, alert, error, history, isUpdated, user])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData))
    }

    const onChange = e => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }
    return (

        <Fragment>
            <MetaData title={'Update User Profile'} />

            <div className='updateProfile'>

                <div className='updateProfile--container'>
                    <div className='updateProfile--container__title' >
                        Update Profile
                    </div>

                    <div className='updateProfile--container__input_field'>
                        <form className='updateProfile--container__input_field--form' encType='multipart/form-data' onSubmit={submitHandler} >


                            <div className='updateProfile--container__input_field--form__text' >
                                Name
                            </div>

                            <input
                                className='updateProfile--container__input_field--form__input'
                                type='name'
                                placeholder='name'
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />


                            <div className='updateProfile--container__input_field--form__text' >
                                Email
                            </div>

                            <input
                                className='updateProfile--container__input_field--form__input'
                                type='email'
                                placeholder='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className='updateProfile--container__input_field--form__avatar'>
                                <div className='updateProfile--container__input_field--form__avatar--title'>Avatar</div>
                                <div className='updateProfile--container__input_field--form__avatar--container'>
                                    <img
                                        className='updateProfile--container__input_field--form__avatar--container__image'
                                        src={avatarPreview}
                                        alt='avatar Preview'
                                    />

                                    <div className='updateProfile--container__input_field--form__avatar--container__custom_file'>

                                        <label className='updateProfile--container__input_field--form__avatar--container__custom_file--label' htmlFor='customFile'>
                                            <div className='updateProfile--container__input_field--form__avatar--container__custom_file--label__left'>Choose Avatar</div>
                                            <div className='updateProfile--container__input_field--form__avatar--container__custom_file--label__right'>Browse</div>
                                        </label>

                                        <input
                                            className='updateProfile--container__input_field--form__avatar--container__custom_file--input'
                                            type='file'
                                            name='avatar'
                                            id='customFile'
                                            accept='images/*'
                                            onChange={onChange}
                                        />
                                    </div>

                                </div>
                            </div>


                            <button
                                className='updateProfile--container__input_field--form__submit'
                                type='submit'
                                disabled={loading ? true : false}
                            >
                                Update
                            </button>

                        </form>

                    </div>
                </div>


            </div>

        </Fragment>
    )
}


export default UpdateProfile
