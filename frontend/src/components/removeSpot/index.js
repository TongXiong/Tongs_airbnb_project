import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteSpot } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import * as sessionActions from "../../store/session"
import "./removespot.css"


export const DeleteById = ({spot}) => {

    const dispatch = useDispatch()
    const {closeModal} = useModal()



    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot.id))
        .catch(async (res) => {
            const data = await res.json()
            alert(data.message)
        })
        .then(closeModal)
      };


      return (
        <div>
            <div className="title">
            <h1> Confirm Delete </h1>
            <h2>Are you sure you want to remove this spot from the listing?</h2>
            <div>
                <button type="button" onClick={handleDelete}>
                    Yes (Delete Spot)
                </button>
                <button type="button" onClick={closeModal}>
                    No (keep Spot)
                </button>
            </div>
            </div>
        </div>
      );
    }



export default DeleteById
