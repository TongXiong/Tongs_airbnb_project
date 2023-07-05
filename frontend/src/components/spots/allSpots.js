import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { retrieveSpots } from "../../store/spotreducer"
import { NavLink, Route } from "react-router-dom"
import { useHistory} from "react-router-dom"
import "./allspots.css"

export const SpotsBrowser = () => {
    const dispatch = useDispatch()
    const history = useHistory()

      const [goToSpot, setGoToSpot] = useState("false");

    const spots = useSelector((state) => {
        if (state.spots) {
            return state.spots
        } else {
            return null;
        }
    })

    useEffect(() => {
        dispatch(retrieveSpots())
    }, [dispatch, goToSpot])

    if (!spots) {
        return null;
    }
    const spotsArr = Object.values(spots)

    return (
        <div className="landingpage">
            <ul>
                {spotsArr.map((spot) => {
                    return <span key={spot.id} className="listcontainer">
                        <li>
                            <NavLink to={`spots/${spot.id}`}>
                            <img src={spot.previewImage} className="images"></img>
                            </NavLink>
                            <div className="info">
                            <h3>{spot.city}, {spot.state}</h3>
                            <h3> ★ {spot.avgRating}</h3>
                            </div>
                            <h3 className="price">${spot.price} night </h3>
                        </li>
                    </span>
                })}
            </ul>
        </div>
    )
}

export default SpotsBrowser;
