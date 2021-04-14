import React from 'react'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <div className="shop--container--product">
            <img
                className="shop--container--product__image"
                src={product.images[0].url}
                alt=""
            />
            <div className="shop--container--product__body">
                <div className="shop--container--product__body--title">
                    <Link className="shop--container--product__body--title__name" to={`/product/${product._id}`} >
                        {product.name}
                    </Link>
                </div>
                <div className="shop--container--product__body--rating">
                    <StarRatings
                        rating={product.ratings}
                        numberOfStars={5}
                        starRatedColor="#ffd700" 
                        starDimension="30px"
                    />
                </div>

                <div className="shop--container--product__body--no_of_reviews">( {product.numOfReviews} Reviews)</div>
                <div className="shop--container--product__body--price">${product.price}</div>
                <div className="shop--container--product__body--buttonContainer">
                    <Link to={`/product/${product._id}`} >
                        <button className="shop--container--product__body--buttonContainer__viewButton">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Product
