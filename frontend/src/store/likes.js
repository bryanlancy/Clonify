import { fetch } from './csrf.js'

const LOAD_LIKES = 'likes/loadLikes'
const ADD_LIKES = 'likes/addLikes'
const REMOVE_LIKES = 'likes/removeLikes'

//action creator
const loadLikes = likes => ({
	type: LOAD_LIKES,
	likes,
})

const addLikes = likes => ({
	type: ADD_LIKES,
	likes,
})

const removeLikes = id => ({
	type: REMOVE_LIKES,
	id,
})

export const getLikes = id => async dispatch => {
	const res = await fetch(`/api/social/likes/${id}`)

	dispatch(loadLikes(res.data))
}

export const addLike = (userId, spotId, type) => async dispatch => {
	const res = await fetch(`/api/social/likes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userId,
			spotId,
			type,
		}),
	})
	if (res.status === 200) {
		dispatch(addLikes(res.data))
		return true
	} else {
		return false
	}
}

export const removeLike = (userId, spotId) => async dispatch => {
	const res = await fetch(`/api/social/likes/${spotId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userId,
		}),
	})
	if (res.status === 200) {
		dispatch(removeLikes(spotId))
		return false
	} else {
		return true
	}
}

const initialState = {}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_LIKES:
			return {
				...state,
				...action.likes,
			}
		case ADD_LIKES:
			return {
				...state,
				...action.likes,
			}
		case REMOVE_LIKES:
			const newState = { ...state }
			delete newState[action.id]
			return newState
		default:
			return state
	}
}
