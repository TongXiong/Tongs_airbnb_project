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
import "./createmodal.css"


export const CreateReviewModal = ({spot}) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user);

    const [create, setCreate] = useState("create")

    useEffect(() => {
      if (!sessionUser) {
        setCreate("createHidden")
      } else {
        setCreate("create")
      }
    }, [create, sessionUser])

    return (
        <div>
            <div className={create}>
            <OpenModalButton
            modalComponent={<CreateReview spot={spot}/>}
            buttonText="Post your Reviews"
            />
            </div>
            <button>
            </button>
        </div>
    )
}

export default CreateReviewModal
