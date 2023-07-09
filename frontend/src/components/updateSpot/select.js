import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { createForm, retrieveSpots } from "../../store/spotreducer"
import { NavLink, Route } from "react-router-dom"
import { useHistory, useParams} from "react-router-dom"
import { updateSpotForm } from "../../store/spotreducer"
import { oneSpot } from "../../store/spotreducer"
import UpdateSpot from "."
import NewSpot from "../createSpot"


const SelectiveId = () => {

    const {spotId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const spot = useSelector((state) => {
        if (state.spots) {
          return state.spots
        } else {
          return null
        }
      })

      useEffect(() => {
        dispatch(oneSpot(spotId))
      }, [dispatch, spotId])

      const updateValues = {}

      const spotArr = Object.values(spot).flat()
      spotArr.map((el) => {
        updateValues.country = el.country;
        updateValues.address = el.address;
        updateValues.city = el.city;
        updateValues.state = el.state;
        updateValues.description = el.description;
        updateValues.name = el.name;
        updateValues.price = el.price;
      })

    return (
        <div>
            <UpdateSpot spot={updateValues}
            />
        </div>
    )
}

export default SelectiveId
