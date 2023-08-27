import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteSpot } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import DeleteReview from "../DeleteReview"
import "./modalreview.css"


export const ReviewDeleteModal = ({review}) => {
    const dispatch = useDispatch()

    const [show, setShow] = useState("show")

    const sessionUser = useSelector((state) => {
        if (state.session) {
            return state.session.user
        } else {
            return null
        }
    })

    useEffect(() => {
        if (review.User.firstName !== sessionUser.firstName) {
            return setShow("noshow")
        }
    }, [show])

    return (
        <div>
            <div className={show}>
            <OpenModalButton
            modalComponent={<DeleteReview review={review}/>}
            buttonText="Delete"
            />
            </div>
        </div>
    )
}

export default ReviewDeleteModal
