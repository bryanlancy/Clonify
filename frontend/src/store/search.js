import { fetch } from './csrf.js'

const NEW_SEARCH = 'search/newSearch'
const UPDATE_SEARCH = 'search/updateSearch'

const newSearch = (category, query, total, results) => ({
	type: NEW_SEARCH,
	category,
	query,
	total,
	results,
})

const updateSearch = (category, results) => ({
	type: UPDATE_SEARCH,
	category,
	results,
})

export const searchResults = ({ q, type }) => async (dispatch, getState) => {
	const res = await fetch(`/api/music/search?q=${q}&type=${type}`)
	if (res.ok) {
		const { [type]: results, total } = res.data
		if (true) {
			const state = getState()
			// console.log(state.search[type])
			dispatch(newSearch(type, q, total, results))
		} else {
		}
	}
}

const initialState = {}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case NEW_SEARCH:
			return {
				...state,
				[action.category]: {
					query: action.query,
					total: action.total,
					results: {
						...state[action.category].results,
						...action.results,
					},
				},
			}
		case UPDATE_SEARCH:
			return {
				...state,
				[action.category]: {
					results: {
						...state[action.category].results,
						...action.results,
					},
				},
			}
		default:
			return state
	}
}
