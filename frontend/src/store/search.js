import { fetch } from './csrf.js'

const NEW_SEARCH = 'search/newSearch'
const UPDATE_SEARCH = 'search/updateSearch'

const newSearch = (category, q, total, results) => ({
	type: NEW_SEARCH,
	category,
	q,
	total,
	results,
})

const updateSearch = (category, results) => ({
	type: UPDATE_SEARCH,
	category,
	results,
})

export const searchResults = ({ q, type, limit, offset }) => async (dispatch, getState) => {
	const res = await fetch(`/api/music/search?q=${q}&type=${type}&limit=${limit}&offset=${offset}`)
	if (res.status === 200) {
		const { [type]: results, total } = res.data
		const state = getState()
		const { [type]: prevSearch } = state.search
		//if the current search is the same as the previous search then update
		if (!(q === prevSearch.q)) dispatch(newSearch(type, q, total, results))
		else dispatch(updateSearch(type, results))
		return true
	} else {
		return false
	}
}

const initialState = {
	album: {},
	artist: {},
	playlist: {},
	track: {},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case NEW_SEARCH:
			return {
				...state,
				[action.category]: {
					q: action.q,
					total: action.total,
					results: {
						...action.results,
					},
				},
			}
		case UPDATE_SEARCH:
			return {
				...state,
				[action.category]: {
					...state[action.category],
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
