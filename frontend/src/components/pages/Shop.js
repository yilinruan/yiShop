import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import Product from '../product/Product'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import StarRatings from 'react-star-ratings';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Shop = ({ match }) => {


    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword


    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }

    useEffect(() => {
        if (error) {
            // alert.success("Success")
            return alert.error("error")
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`Shop`} />
                    <div className="shop">

                        {keyword ? (
                            <Fragment>
                                <div className="shop--top">
                                    <div className="shop--top--price_range">
                                        <div className="shop--top--price_range--text" >Filter</div>
                                        <div className="shop--top--price_range--label">
                                            <span >${price[0]}</span>
                                            <span>${price[1]}</span>
                                        </div>

                                        <Range
                                            min={1}
                                            max={1000}
                                            defaultValue={[1, 1000]}
                                            value={price}
                                            onChange={price => setPrice(price)}
                                        />

                                        <div className="shop--top--price_range--category">
                                            <ul className="shop--top--price_range--category__container">
                                                {categories.map(category => (
                                                    <li className="shop--top--price_range--category__item" key={category} onClick={() => setCategory(category)} >
                                                        {category} 
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="shop--top--rating__range">
                                        {[4, 3, 2, 1].map(star => (
                                            <ul onClick={() => setRating(star)}>
                                                <StarRatings
                                                    key={star}
                                                    rating={star}
                                                    numberOfStars={5}
                                                    starRatedColor="#ffd700"
                                                    starDimension="2rem"
                                                    starSpacing={0}
                                                />
                                                <span className="shop--top--rating__range--title"> & Up </span>
                                            </ul>
                                        ))}
                                    </div>

                                </div>

                                <div className="shop--container">
                                    {products.map(product => (
                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                            </Fragment>

                        ) : (

                            <Fragment>
                                <div className="shop--container">
                                    {products.map(product => (
                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                            </Fragment>
                        )}

                    </div>


                    {resPerPage <= count && (
                        <div className="shop--pagination">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}




                </Fragment>
            )}

        </Fragment>
    )
}

export default Shop;
