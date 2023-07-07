// const REMOVE_REVIEW = "spotreducer/REMOVE_REVIEW"


// export const removeReview = (Review) => {
//     return {
//         type: REMOVE_REVIEW,
//         Review

//     }
// }


// export const deleteReview = (reviewId) => {
//     return async (dispatch, getState) => {
//         const res = await fetch (`/api/spots/${reviewId}/reviews`)
//         if (res.ok) {
//             dispatch(removeReview(reviewId))
//         } else {
//             const error = res.json()
//             return error
//         }
//     }
//   }

//   const initState = {};


// export const reviewReducer = (state = initState, action) => {
//     switch(action.type) {
//         case REMOVE_REVIEW:
//             const newState1 = {...state};
//             return newState1[action.Review];
//             default:
//             return state
//     }
// }

// export default reviewReducer
