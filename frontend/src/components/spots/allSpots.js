import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback, useMemo} from "react"
import { retrieveSpots } from "../../store/spotreducer"
import { useHistory} from "react-router-dom"
import DeleteModal from "../DeleteSpot"
import "./allspots.css"


export const SpotsBrowser = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [isHover, setIsHover] = useState()

    const handleMouseEnter = () => {
        return setIsHover(true)
    }

    const handleMouseLeave = useMemo(() => {
        return setIsHover(false)
    }, [])

    const boxStyle = {
        cursor: isHover ? 'pointer' : 'none'
    }

    const spots = useSelector((state) => {
        if (state.spots) {
            return Object.values(state.spots)
        } else {
            return null;
        }
    })

    console.log(spots)
    useEffect(() => {
        dispatch(retrieveSpots())
    }, [dispatch])

    if (!spots) {
        return null;
    }

    return (
        <div className="landingpage">
            <ul>
                {spots.map((spot) => {
                    return <span key={spot.id} className="listcontainer">
                        <li>
                            <img src={spot.previewImage} className="images" onClick={(() => {
                                history.push(`spots/${spot.id}`)
                            })}
                            style={boxStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            title={spot.name}
                            >
                            </img>
                            <div className="info">
                            <h3>{spot.city}, {spot.state}</h3>
                            <h3> ★ {(spot.avgRating !== null) ? (!Number.isInteger(spot.avgRating)) ? `${Math.round(spot.avgRating)}.0` : `${spot.avgRating}.0` : "New"}</h3>
                            </div>
                            <h3 className="price">${spot.price} night </h3>
                            <DeleteModal spot={spot}/>
                        </li>
                    </span>
                })}
            </ul>
        </div>
    )
}

export default SpotsBrowser;
