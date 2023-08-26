import { csrfFetch } from "./csrf"

const ALL_SPOTS = "spotreducer/allSpots"
const ONE_SPOT = "spotreducer/ONE_SPOT"
const ONE_REVIEW = "spotreducer/ONE_REVIEW"
const REMOVE_SPOT = "spotreducer/REMOVE_SPOT"
const REMOVE_REVIEW = "spotreducer/REMOVE_REVIEW"
const CREATE_SPOT = "spotreducer/CREATE_SPOT"
const CREATE_IMAGE = "spotreducer/CREATE_IMAGE"
const CREATE_REVIEW = "spotreducer/CREATE_REVIEW"
const UPDATE_SPOT = "spotreducer/UPDATE_SPOT"
const USER_SPOTS = "spotreducer/CURRENT_SPOT"

export const getSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots: Object.values(spots)
    }
}

export const userSpots = (spots) => {
    return {
        type: USER_SPOTS,
        spots: Object.values(spots)
    }
}

export const detailedSpot = (Spot) => {
    return {
        type: ONE_SPOT,
        Spot
    }
}

export const reviewById = (Spot) => {
    return {
        type: ONE_REVIEW,
        Spot
    }
}

export const removeSpot = (Spot) => {
    return {
        type: REMOVE_SPOT,
        Spot

    }
}

export const removeReview = (review) => {
    return {
        type: REMOVE_REVIEW,
        review

    }
}

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}
export const createImage = (image) => {
    return {
        type: CREATE_IMAGE,
        image
    }
}

export const createReview =(review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

export const retrieveSpots = () => {
    return async (dispatch, getState) => {
        const res = await fetch("/api/spots")
        if (res.ok) {
            const spots = await res.json()
            dispatch(getSpots(spots))
        } else {
            const error = await res.json()
            return error;
        }
    }
}

export const retrieveSpotsbyUser = () => {
    return async (dispatch, getState) => {
        const res = await fetch("/api/current")
        if (res.ok) {
            const spots = await res.json()
            dispatch(userSpots(spots))
        } else {
            const error = await res.json()
            return error;
        }
    }
}

export const oneSpot = (spotId) => {
    return async (dispatch, getState) => {
        const res = await fetch (`/api/spots/${spotId}`)
        if (res.ok) {
            const spot = await res.json()
            dispatch(detailedSpot(spot))
        } else {
            const error = await res.json()
            return error;
        }
    }
}

export const review = (spotId) => {
    return async (dispatch, getState) => {
        const res = await fetch(`/api/spots/${spotId}/reviews`)
        if (res.ok) {
            const review = await res.json()
            dispatch(reviewById(review))
        } else {
            const error = await res.json()
            return error;
        }
    }
}

export const deleteSpot = (spotId) => {
    return async (dispatch, getState) => {
      const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
      })
      if (res.ok) {
        dispatch(removeSpot(spotId))
      } else {
        const error = await res.json()
        return error
      }
    }
  }

  export const deleteReview = (reviewId) => {
    return async (dispatch, getState) => {
        const res = await csrfFetch (`/api/reviews/${reviewId}`, {
            method: "DELETE"
        })
        if (res.ok) {
            dispatch(removeReview(reviewId))
        } else {
            const error = await res.json()
            return error
        }
    }
  }

  export const createForm = (body, uploads) => {
    return async (dispatch, getState) => {
        const res = await csrfFetch("/api/spots", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const newSpot = await res.json()
            const pics = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: "POST",
                body: JSON.stringify(uploads)
            })
            if (pics.ok) {
                dispatch(createSpot(newSpot))
            }
        } else {
            const errors = await res.json()
            return errors;
        }
    }
  }

  export const createReviewForm = (body, spotId) => {
    return async (dispatch, getState) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const newReview = await res.json()
            dispatch(createReview(newReview))
        } else {
            const error = await res.json()
            return error;
        }
    }
}
export const updateSpotForm = (body, spotId) => {
    return async (dispatch, getState) => {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "PUT",
            body: JSON.stringify(body)
        })
        if (res.ok) {
            const newSpot2 = await res.json()
            dispatch(updateSpot(newSpot2))
        } else {
            const error = await res.json()
            return error;
        }
    }
}

//   export const newImage = (spotId, image) => {
//     return async (dispatch, getState) => {
//         const {image} = image
//         const res = await csrfFetch(`/api/spots/${spotId}/images`, {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(body)
//         })
//         if (res.ok) {
//             const newImage = await res.json()
//             dispatch(createImage(newImage))
//         } else {
//             const errors = await res.json()
//             return errors;
//         }
//     }
//   }

const iniState = {}

const spotReducer = (state = iniState, action) => {
    switch (action.type) {
      case ALL_SPOTS:
        const spotState = {};
        action.spots[0].forEach((el) => {
            spotState[el.id] = el
        })
        return spotState;
        // page: action.spots[1], size: action.spots[2]
      case ONE_SPOT:
        return {...state, Spot: action.Spot};
        case USER_SPOTS:
            return action.spots
      case ONE_REVIEW:
        const currentState = {...state, "review": {}}
        action.Spot.reviews.map((review) => {
            currentState.review[review.id] = review
        })
        return currentState
      case REMOVE_SPOT:
        const newState = { ...state};
        delete newState[action.Spot];
        return newState;
    case REMOVE_REVIEW:
        const newState1 = {...state, spot: {...state.spot}};
        delete newState1.spot[action.review]
        return newState1
    case CREATE_SPOT:
        const newState2 = {...state, spot: {...state.spot}}
        newState2.spot = action.spot
        return newState2;
    case CREATE_IMAGE:
        const newState3 = {...state, spot: {...state.spot, ['Images']: action.image}}
        return newState3;
    case CREATE_REVIEW:
        const newState4 ={...state, spot: {...state.spot, ["review"]: action.review}}
        return newState4;
    case UPDATE_SPOT:
        const newstate5 ={...state, spot: {...state.spot}}
        newstate5.spot = action.spot
        return newstate5;
    // action.Review = id
      // case ADD_REPORT:
      //   return {...state, [action.report.id]: action.report}
      default:
        return state;
    }
  };

export default spotReducer
