import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { retrieveSpots } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const SpotsBrowser = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const spots = useSelector((state) => {
        if (state.spots) {
            return state.spots
        } else {
            return null;
        }
    })

    useEffect(() => {
        dispatch(retrieveSpots())
    }, [dispatch])

    if (!spots) {
        return null;
    }
    const spotsArr = Object.values(spots)

    const handleClick = () => {
        history.push(`/api/spots/${spots.id}`)
    }


    return (
        <div>
            <ul>
                {spotsArr.map((spot) => {
                    return <span key={spot.id}>
                        <li>
                            <img src={spot.previewImage} onClick={handleClick}></img>
                            <h3>{spot.city}</h3>
                            <h3>{spot.state}</h3>
                            <h3> star {spot.avgRating}</h3>
                            <h3>${spot.price} night </h3>
                        </li>
                    </span>
                })}
            </ul>
        </div>
    )
}

export default SpotsBrowser;
