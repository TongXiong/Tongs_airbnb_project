const ALL_SPOTS = "spotreducer/allSpots"
const ONE_SPOT = "spotreducer/ONE_SPOT"
const ONE_REVIEW = "spotreducer/ONE_REVIEW"
export const getSpots = (spots) => {
    return {
        type: ALL_SPOTS,
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

export const retrieveSpots = () => {
    return async (dispatch, getState) => {
        const res = await fetch("/api/spots")
        if (res.ok) {
            const spots = await res.json()
            dispatch(getSpots(spots))
        } else {
            const error = res.json()
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
            const error = res.json()
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
        }
    }
}

const iniState = {}

const spotReducer = (state = iniState, action) => {
    switch (action.type) {
      case ALL_SPOTS:
        const spotState = {...state};
        action.spots[0].forEach((el) => {
            spotState[el.id] = el
        })
        return {...spotState};
        // page: action.spots[1], size: action.spots[2]
      case ONE_SPOT:
        return {...state, [action.Spot.Spots[0].id]: action.Spot.Spots};
      case ONE_REVIEW:
        return {...state, ["review"] : action.Spot.reviews};
    //   case REMOVE_REPORT
    //     const newState = { ...state };
    //     delete newState[action.reportId];
    //     return newState;
      // case ADD_REPORT:
      //   return {...state, [action.report.id]: action.report}
      default:
        return state;
    }
  };

export default spotReducer
