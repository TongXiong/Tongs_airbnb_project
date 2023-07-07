import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { createForm, retrieveSpots } from "../../store/spotreducer"
import { NavLink, Route } from "react-router-dom"
import { useHistory, useParams} from "react-router-dom"
import { updateSpotForm } from "../../store/spotreducer"
import { oneSpot } from "../../store/spotreducer"
import UpdateSpot from "../../store/spotreducer"

const SelectiveId = () => {

    const {spotId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const spots = useSelector((state) => {
        if (state.spots) {
          return state.spots[spotId]
        } else {
          return null
        }
      })

      useEffect(() => {
        dispatch(oneSpot(spotId))
      }, [dispatch, spotId])

      
    return (
        <div>
            <UpdateSpot spots={spots}/>
        </div>
    )
}

export default SelectiveId
