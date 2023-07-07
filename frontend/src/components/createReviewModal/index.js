import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteSpot } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import CreateReview from "../createReview"


export const CreateReviewModal = ({spot}) => {
    const dispatch = useDispatch()
    
    return (
        <div>
            <div>
            <OpenModalButton
            modalComponent={<CreateReview spot={spot}/>}
            buttonText="Post your Review"
            />
            </div>
            <button>
            </button>
        </div>
    )
}

export default CreateReviewModal
