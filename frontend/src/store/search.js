import { fetch } from './csrf.js'

const ADD_RESULTS = 'search/addResults'

const addResults = results => ({
	type: ADD_RESULTS,
	results,
})

export const searchResults = ({ q, type }) => async dispatch => {
	const res = await fetch(`/api/music/search?q=${q}&type=${type}`)
	if (res.ok) {
		console.log(res.data)
	}
}

const initialState = {}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_RESULTS:
			return {
				...state,
			}
		default:
			return state
	}
}
