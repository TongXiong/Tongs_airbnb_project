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
import CurrentUserSpot from "../currentSpot"

export const ManageButton = ({user}) => {
    const dispatch = useDispatch()

    return (
        <div>
        <h1>
            manage
        </h1>
        <CurrentUserSpot user={user}/>
        </div>
    )
}

export default ManageButton
