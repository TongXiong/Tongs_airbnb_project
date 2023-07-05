import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { oneSpot, review } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import Review from "../reviews/reviews"

export const GetOneSpot = () => {
    const {spotId} = useParams()

    const dispatch = useDispatch()
    const history = useHistory()

    const spot = useSelector((state) => {
        if (state.spots) {
          return state.spots[spotId]
        } else {
          return null
        }
      })

      console.log(spot)


      useEffect(() => {
          dispatch(oneSpot(spotId))
    }, [dispatch, spotId])

    if (!spot) {
        return null;
    }
    const theSpot = spot[0]
    const owner = spot[0].Owner

    return (

        <div>
            <div className="title">
            <h1>
                {theSpot.name}
            </h1>
            <h3> {theSpot.city} {theSpot.state} {theSpot.country}</h3>
            </div>
            <div className="images">
                <div className="bigimage">
                    <img src="" ></img>
                </div>
                <div className="smallimage">
                    <img src=""></img>
                </div>
            </div>
            <div className="Desciptions">
            <div className="host">
                <h1> Hosted By {owner.firstName} {owner.lastName}</h1>
                <p>{theSpot.description}</p>
            </div>
            <div className="info">
                ${theSpot.price} night {theSpot.avgStarRating} {theSpot.numReviews} reviews
                <button>
                    Reserve
                </button>
            </div>
            </div>
            <div>
                <Review spot={spot}/>
            </div>
        </div>
    )
}


export default GetOneSpot;
