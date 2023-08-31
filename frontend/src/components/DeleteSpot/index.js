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

    const [show, setShow] = useState("show")

    const sessionUser = useSelector((state) => {
        if (state.session.user) {
            return state.session.user
        } else {
            return null
        }
    })

    useEffect(() => {
        if (sessionUser) {
            if (spot.ownerId !== sessionUser.id) {
                return setShow("noshow")
            }
        } else {
            return setShow("noshow")
        }

    }, [show])

    return (
        <div>
            <div className={show}>
            <OpenModalButton
            modalComponent={<DeleteById spot={spot}/>}
            buttonText="Delete"
            />
            </div>
        </div>
    )
}

export default DeleteModal
