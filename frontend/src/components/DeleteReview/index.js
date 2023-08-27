import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteReview } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import * as sessionActions from "../../store/session"
import "./deletereview.css"


export const DeleteReview = ({review}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReview(review.id))
        .then(closeModal)
      };

      return (
        <div>
            <div className="title">
            <h1> Confirm Delete </h1>
            <h2>Are you sure you want to remove this review from the listing?</h2>
            <div>
                <button type="button" onClick={handleDelete}>
                    Yes (Delete Review)
                </button>
                <button type="button" onClick={closeModal}>
                    No (keep Review)
                </button>
            </div>
            </div>
        </div>
      );
    }



export default DeleteReview
