import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'


const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (

        <form className='search__form' onSubmit={searchHandler}>
            <input
                className='search'
                type='text'
                placeholder='search'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
            />                                                                  

            <FiSearch className='search__icon' onClick={searchHandler}/>

        </form>
    );
};

export default Search;