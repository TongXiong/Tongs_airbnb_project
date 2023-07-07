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

    return (
        <div>
            <div>
            <OpenModalButton
            modalComponent={<DeleteReview review={review}/>}
            buttonText="Delete"
            />
            </div>
        </div>
    )
}

export default ReviewDeleteModal
