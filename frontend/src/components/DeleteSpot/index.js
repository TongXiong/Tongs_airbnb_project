import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteSpot } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import DeleteById from "../removeSpot"
import "./DeleteModal.css"


export const DeleteModal = ({spot}) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    return (
        <div>
            <div>
            <OpenModalButton
            modalComponent={<DeleteById spot={spot}/>}
            buttonText="Delete"
            />
            </div>
        </div>
    )
}

export default DeleteModal
