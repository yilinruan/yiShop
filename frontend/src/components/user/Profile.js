import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (

        <Fragment>

            {loading ? <Loader /> : (

                <Fragment>
                    <MetaData title={'My Profile'} />
                    <div className="profile">
                        <div className="profile--top">

                            <div className="profile--top__title">My Profile</div>
                        </div>
                        <div className="profile--container">
                            <div className="profile--container__left">
                                <div className='profile--container__left--image'>
                                    <img
                                        className="profile--container__left--image__avatar"
                                        src={user.avatar && user.avatar.url}
                                        alt={user.name}
                                    />
                                </div>

                                <div className=' profile--container__left--button_area'>
                                    <Link to="/me/update" className="profile--container__left--button_area__edit_profile_button">
                                        Edit Profile
                                </Link>

                                </div>


                            </div>

                            <div className="profile--container__right">
                                <div className="profile--container__right--title">Name</div>
                                <div className="profile--container__right--text">{user.name}</div>

                                <div className="profile--container__right--title">Email Address</div>
                                <div className="profile--container__right--text">{user.email}</div>

                                <div className="profile--container__right--title">Joined On</div>
                                <div className="profile--container__right--text">{String(user.createdAt).substring(0, 10)}</div>

                                {user.role !== 'admin' && (
                                    <Link to="/orders/me" className="profile--container__right--order_button">
                                        My Orders
                                    </Link>
                                )}

                                <Link to="/password/update" className="profile--container__right--change_password_button">
                                    Change Password
                            </Link>
                            </div>
                        </div>
                    </div>
                </ Fragment>

            )}

        </Fragment>

    )
}

export default Profile
