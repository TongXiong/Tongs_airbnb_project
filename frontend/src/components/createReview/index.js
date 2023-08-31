import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState} from "react"
import { createReview, deleteReview } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import * as sessionActions from "../../store/session"
import { createReviewForm } from "../../store/spotreducer"
import "./createreview.css"


export const CreateReview = ({spot}) => {

  const history = useHistory()

    const id = spot.id
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState (0)
    const [hover, setHover] = useState(0);
    const [validErrors, setValidErrors] = useState({})

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

      const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            review,
            stars,
        }

        dispatch(createReviewForm(payload, id))
            .catch(async (res) => {
              const data = await res.json();
              if (data.errors) {
                setValidErrors(data.errors);
              }
            })
            .then(closeModal)
        }

      return (
        <div>
            <div className="title">
                <form onSubmit={handleSubmit} className="createReview">
                    <h1>How was your stay?</h1>
                    <div className="reviewerrors">
                    {validErrors.review && ` ${validErrors.review}`}
                    </div>
                    <textarea
                    type="text"
                    value={review}
                    onChange={updateReview}
                    ></textarea>
                    <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className={index <= (hover || stars) ? "on" : "off"}
                              onClick={() => setStars(index)}
                              onMouseEnter={() => setHover(index)}
                              onMouseLeave={() => setHover(stars)}
                            >
                              <span className="star">&#9733;</span>
                            </button>
                          );
                        })}
                      </div>
                    <button type="submit"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
      );
    }

    export default CreateReview
