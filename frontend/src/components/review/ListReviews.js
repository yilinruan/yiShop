import React from 'react'
import StarRatings from 'react-star-ratings';

const ListReviews = ({ reviews }) => {

    return (
        <div className='listReview'>

            <div className='listReview--title'>Customer's Reviews:</div>

            <div className='listReview--review_area'>
                {reviews && reviews.map(review => (
                    <div key={review._id} className='listReview--review_area__container'>
                        <StarRatings
                            rating={review.rating}
                            numberOfStars={5}
                            starRatedColor="#ffd700"
                            starDimension="18px"
                            starSpacing="0px"
                        />
                        <div className='listReview--review_area__container--user'>by {review.name} </div>
                        <div className='listReview--review_area__container--comment'>{review.comment}</div>

                    </div>

                ))}
            </div>
        </div>
    )
}

export default ListReviews
