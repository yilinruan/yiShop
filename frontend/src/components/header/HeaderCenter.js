import React from 'react'
import Search from '../search/Search'
import { Route } from 'react-router-dom'
const HeaderCenter = () => {
    return (
        <div className="header__center">
            <Route render={({ history }) => <Search history={history} />} />
        </div>
    )
}

export default HeaderCenter;