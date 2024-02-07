
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions'


function useComponentVisible() {
  const [isComponentVisible, setIsComponentVisible] = useState(
    false
  );
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

const HeaderRight = () => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(true);

  const logoutHandler = () => {
    dispatch(logout())
    alert.success('Logged out successfully.')
  }

  const alert = useAlert()
  const dispatch = useDispatch()

  const { user, loading } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)

  return (
    <div className="header__right" ref={ref}>

      <div className="header__right--cart">
        <Link to="/cart">
          <AiOutlineShoppingCart
            className="header__right--cart__icon"
          />
        </Link>

        {cartItems.length > 0 && <Link to="/cart" className="header__right--cart__in_cart_number">{cartItems.length}</Link>}

      </div>

      {user ? (
        <div className='header__right--menu'>
          {isComponentVisible && (

            <div className='header__right--menu'>

              <FaUser
                className='header__right--menu__user_icon'
                onClick={() => setIsComponentVisible(false)}
              />

              <div className='header__right--menu__expand'>
                <div className='header__right--menu__expand--profile'>

                  <img
                    className='header__right--menu__expand--profile__image'
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                  />

                  <div className='header__right--menu__expand--profile__user'>

                    <div className='header__right--menu__expand--profile__user--name'>
                      Hi, {user.name}
                    </div>

                    <div className='header__right--menu__expand--profile__user--email'>
                      {user.email}
                    </div>

                  </div>
                </div>

                <div className='header__right--menu__expand--links'>
                  
                  {user && user.role === 'admin' && (
                    <Link className='header__right--menu__expand--links--text' to='/dashboard' >
                      Dashboard
                    </Link>
                  )}

                  <Link className='header__right--menu__expand--links--text' to='/orders/me' >
                    Orders
                  </Link>

                  <Link className='header__right--menu__expand--links--text' to='/me' >
                    Profile
                  </Link>

                  <div className='header__right--menu__expand--links--text'>
                    <Link className='header__right--menu__expand--links--text__sign_out' onClick={logoutHandler} to='/'>
                      Logout
                    </Link>
                  </div>

                </div>
              </div>

            </div>

          )}
          {!isComponentVisible && (
            <FaUser
              className='header__right--menu__user_icon'
              onClick={() => setIsComponentVisible(true)}
            />
          )}
        </div>

      ) : (
        !loading &&
        <Link to={`/login`} className='header__right--login_area'>
          <button className='header__right--login_area__button'>
            Sign in
          </button>
        </Link>
      )}

    </div>
  );
};

export default HeaderRight;
