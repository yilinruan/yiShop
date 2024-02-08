import React, { Fragment, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'
import { countries } from 'countries-list'
import CheckoutSteps from './CheckoutSteps'

const Shipping = ({ history }) => {

    const countriesList = Object.values(countries)

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }))
        history.push('/confirm')
    }

    return (
        <Fragment>
            <MetaData title={'shipping Infor'} />

            <div className='shipping'>
                <CheckoutSteps shipping/>
                <div className='shipping--container'>
                    <div className='shipping--container__title' >
                        Shipping Info
                    </div>

                    <div className='shipping--container__input_field'>
                        <form className='shipping--container__input_field--form' onSubmit={submitHandler} >

                            <div className='shipping--container__input_field--form__text' >
                                Address
                            </div>

                            <input
                                className='shipping--container__input_field--form__input'
                                type='text'
                                placeholder='address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />

                            <div className='shipping--container__input_field--form__text' >
                                City
                            </div>

                            <input
                                className='shipping--container__input_field--form__input'
                                type='text'
                                placeholder='city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />

                            <div className='shipping--container__input_field--form__text' >
                                phoneNo
                            </div>

                            <input
                                className='shipping--container__input_field--form__input'
                                type='phone'
                                placeholder='phone number '
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />

                            <div className='shipping--container__input_field--form__text' >
                                postalCode
                            </div>

                            <input
                                className='shipping--container__input_field--form__input'
                                type='number'
                                placeholder='postal pode'
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />

                            <div className='shipping--container__input_field--form__text' >
                                Country
                            </div>

                            <select
                                id="country_field"
                                className="shipping--container__input_field--form__input"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >

                                {countriesList && countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>

                            <input className='shipping--container__input_field--form__submit' type='submit' value='Submit' />

                        </form>
                    </div>
                </div>

                <div className="shipping--space_holder" />
            </div>
        </Fragment>
    )
}

export default Shipping
