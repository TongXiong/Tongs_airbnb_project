import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { oneSpot, review } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import DeleteReview from "../DeleteReview"
import ReviewDeleteModal from "../ReviewModalButton"
import CreateReviewModal from "../createReviewModal"
import UpdateSpot from "../updateSpot";
export const Review = ({spot}) => {
    const {spotId} = useParams()
    const dispatch = useDispatch()

    const reviewOfId = useSelector((state) => {
        if (state.spots) {
            return state.spots.review
        } else {
            return null
        }
      })

      useEffect(() => {
          dispatch(review(spotId))
        }, [dispatch, spotId])

        if (!reviewOfId) {
            return null;
        }
        const arr = Object.values(reviewOfId)
        const reviewArr = arr[0]
        const reviewUser = reviewArr.User
        
  return (
    <div className="container">
      <div className="title">
    <h1> ★ {reviewArr.stars}</h1>
    <div>
      <CreateReviewModal spot={spot}/>
    </div>
    <h1> {spot[0].numReviews} reviews</h1>
      </div>
      <ul>
          {arr.map((review) => {
              return <span key={review.id} className="listcontainer">
                  <li>
                      <div className="info">
                      <h3>{review.User.firstName}</h3>
                      <h3> {review.createdAt.slice(0, 10)}</h3>
                      </div>
                      <h3 className="review">{review.review} </h3>
                  <ReviewDeleteModal review={review}/>
                  </li>
              </span>
          })}
      </ul>
    </div>
  )

}

export default Review
