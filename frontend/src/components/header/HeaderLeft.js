import React from 'react';
import logo from '../../components/imgs/logo.png';
import { Link } from 'react-router-dom'

const HeaderLeft = () => {
    return (
        <div className='header__left'>
            <Link to={`/`}><img className='header__left--image' src={logo} alt='logo' /></Link>
        </div>
    )
}

export default HeaderLeft;