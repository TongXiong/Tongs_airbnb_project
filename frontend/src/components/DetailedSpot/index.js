import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { oneSpot, review } from "../../store/spotreducer"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import Review from "../reviews/reviews"
import UpdateSpot from "../updateSpot";
import "./OneSpot.css"


export const GetOneSpot = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const theSpot = useSelector((state) => {
        if (state.spots) {
          return state.spots[spotId][0]
        } else {
          return null
        }
      })

      const newFeature = () => {
        alert("Feature coming soon!")
      }

      useEffect(() => {
          dispatch(oneSpot(spotId))
    }, [dispatch, spotId])

    if (!theSpot) {
        return null;
    }
    const theOwner = theSpot.Owner
    const images = [theSpot.SpotImages[0]]

    const bigImage = images.shift()

    return (
        <div>
            <div className="titleinfo">
            <h1>
                {theSpot.name}
            </h1>
            <h3> {theSpot.city} {theSpot.state} {theSpot.country}</h3>
            </div>
            <div className="bigimagecontainer">
                <div>
                    <img src={bigImage.url} className="bigimages"></img>
                </div>
                <ul className="smallimagecontainer">
                    {images.map((image) => {
                        return <span key={image.id}>
                            <li>
                                <img src={image.url} className="smallimages"/>
                            </li>
                        </span>
                    })}
                </ul>
            </div>
            <div className="Desciptions">
            <div>
                <div className="host"> Hosted By {theOwner.firstName} {theOwner.lastName}</div>
                <div className="paragraph">{theSpot.description}</div>
            </div>
            <div className="info">
                ${theSpot.price} night {(theSpot.avgStarRating) ? (!Number.isInteger(theSpot.avgStarRating)) ? `${Math.round(theSpot.avgStarRating)}.0` : `${theSpot.avgStarRating}.0` : ""} {theSpot.numReviews} reviews
                <button
                onClick={(() => {
                    newFeature()
                })}
                >
                    Reserve
                </button>
            </div>
            </div>
            <div>
                <Review spot={theSpot}/>
            </div>
        </div>
    )
}


export default GetOneSpot;
