import React, { Fragment, useEffect, useState } from 'react'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ListReviews from '../review/ListReviews'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProductDetails, clearErrors, newReview } from '../../actions/productActions'
import { Carousel } from 'react-bootstrap'
import { addItemToCart } from '../../actions/cartActions'

import StarRatings from 'react-star-ratings';
// import Ratings from 'react-ratings-declarative';
// import ReactStars from "react-rating-stars-component";

import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const ProductDetails = ({ match }) => {

    const [rating, setRating] = useState(0)

    const [comment, setComment] = useState('');


    const ratingChanged = (newRating) => {
        setRating(newRating)
    };

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(state => state.productDetails)
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    useEffect(() => {
        // dispatch(getProducts(match.params.id))
        dispatch(getProductDetails(match.params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Reivew posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }

    }, [dispatch, alert, error, success, reviewError, match.params.id])


    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity))
        alert.success('Item Added to Cart.')
    }

    const increaseQty = () => {
        const count = document.querySelector('.productDetails--right--body__stock_counter--stock_number')

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.productDetails--right--body__stock_counter--stock_number')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('name', user.name);
        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData));
    }

    return (
        <Fragment>
            { loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="productDetails" >
                        <div className="productDetails--left">
                            <Carousel pause='hover' >
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="productDetails--left--image" src={image.url} alt={product.name} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="productDetails--right">

                            <div className="productDetails--right--body">
                                <div className="productDetails--right--body__title"> {product.name} </div>
                                <div className="productDetails--right--body__product_id">Product # {`${product._id}`} </div>

                                <hr />

                                <div className="productDetails--right--body__rating">
                                    <StarRatings
                                        rating={product.ratings}
                                        numberOfStars={5}
                                        starRatedColor="#ffd700"
                                        starDimension="30px"
                                    />
                                </div>
                                <div className="productDetails--right--body__no_of_reviews"> ({product.numOfReviews} Reviews) </div>

                                <hr />

                                <div className="productDetails--right--body__price">${product.price}</div>

                                <div className="productDetails--right--body__stock_counter">

                                    <button className="productDetails--right--body__stock_counter--minus" onClick={decreaseQty} >-</button>
                                    <input className="productDetails--right--body__stock_counter--stock_number" type='number' value={quantity} readOnly />
                                    <button className="productDetails--right--body__stock_counter--plus" onClick={increaseQty} >+</button>

                                </div>

                                <button type="button" className="productDetails--right--body__add_to_cart" disabled={product.stock >= 1 ? false : true} onClick={addToCart} >Add to Cart</button>

                                {product.stock >= 1 && product.stock <= 5 ? (
                                    <div className="productDetails--right--body__stock_number_reminder">
                                        (Only <span className="productDetails--right--body__stock_number_reminder--number"> {product.stock} </span> Left) <hr />
                                    </div>
                                ) : <hr />}

                                <div className="productDetails--right--body__stock_status">Status:
                                        {product.stock > 0 ?
                                        <span className="productDetails--right--body__stock_status--inStock"> In Stock </span> :
                                        <span className="productDetails--right--body__stock_status--outOfStock"> Out Of Stock </span>}
                                </div>

                                <hr />

                                <strong className="productDetails--right--body__description_title">Description:</strong>
                                <div className="productDetails--right--body__description_body">
                                    {product.description}
                                </div>

                                <hr />

                                <div className="productDetails--right--body__seller">Sold by: <strong>Amazon</strong></div>

                                {user ? (
                                    <button id="review_btn" type="button" className="productDetails--right--body__review_btn" data-toggle="modal" data-target="#ratingModal">
                                        Submit Your Review
                                    </button>
                                ) :
                                    <div className="productDetails--right--body__review_btn_off" type='alert'>Login to post your review.</div>
                                }

                                <div className="modal fade " id="ratingModal" role="dialog">
                                    <div className="modal-dialog">

                                        <div className="modal-content  productDetails--review__content">
                                            <div className='productDetails--review__content--header'>
                                                <div className="modal-header  productDetails--review__content--header__container">
                                                    <h4 className="modal-title   productDetails--review__content--header__container--title">Submit Review</h4>
                                                </div>
                                                <button type="button" className="close  productDetails--review__content--header__close" data-dismiss="modal">&times;</button>
                                            </div>

                                            <div className="modal-body productDetails--review__content--rating_area">
                                                <StarRatings
                                                    rating={rating}
                                                    starRatedColor="#ffd700"
                                                    changeRating={ratingChanged}
                                                    starHoverColor="#ffd700"
                                                    starDimension="45px"
                                                />

                                            </div>

                                            <div className="modal-body productDetails--review__content--text_area">
                                                <form >
                                                    <textarea
                                                        className="productDetails--review__content--text_area__input"
                                                        placeholder='Tell us about your opinions..'
                                                        rows="5" cols="50"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />
                                                </form>
                                            </div>

                                            <div className="modal-footer modal-body productDetails--review__content--btn_area">
                                                <button
                                                    type="button"
                                                    className="modal-footer modal-body productDetails--review__content--btn_area__btn"
                                                    onClick={reviewHandler}
                                                    data-dismiss="modal"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div >
                    </div>

                    {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}

                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails
