import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteSpot } from "../../store/spotreducer"
import { useHistory, useParams, NavLink } from "react-router-dom"
import { retrieveSpotsbyUser } from "../../store/spotreducer"
import * as sessionActions from '../../store/session';
import DeleteById from "../removeSpot"
import DeleteModal from "../DeleteSpot"
import UpdateSpot from "../updateSpot"

export const CurrentUserSpot = ({user}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const spots = useSelector((state) => {
        if (state.spots) {
            return Object.values(state.spots)
        } else {
            return null
        }
    })

    const arr = (spots.flat())

    useEffect(() => {
        dispatch(retrieveSpotsbyUser())
    },[dispatch])

    if (!spots.length) return (
        <div>
        <h1> Manage your Spots</h1>
            <NavLink exact to="/spots">
          create new spot
        </NavLink>
        </div>
    )
    return (
        <div>
        <div className="landingpage">
            <div>
            <ul>
                {arr.map((spot) => {
                    return <span key={spot.id} className="listcontainer">
                        <li>
                            <img src={spot.previewImage} className="images" onClick={(() => {
                                history.push(`/spots/${spot.id}`)
                            })}></img>
                            <div className="info">
                            <h3>{spot.city}, {spot.state}</h3>
                            <h3> ★ {spot.avgRating}</h3>
                            </div>
                            <h3 className="price">${spot.price} night </h3>
                            <DeleteModal spot={spot}/>
                            <NavLink to={`/spots/${spot.id}/edit`}>
                                {/* <button type="button">
                                UpdateSpot
                                </button> */}
                            </NavLink>
                        </li>
                    </span>
                })}
            </ul>
            </div>
        </div>
        </div>
    )
}

export default CurrentUserSpot
