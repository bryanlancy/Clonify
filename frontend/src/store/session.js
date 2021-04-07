import { fetch } from './csrf.js'

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'
const UPDATE_SPOTIFY_TOKEN = 'session/updatseSpo'

const setUser = user => ({
	type: SET_USER,
	payload: user,
})

const removeUser = () => ({
	type: REMOVE_USER,
})

const updateSpotifyAccess = token => ({
	type: UPDATE_SPOTIFY_TOKEN,
	token,
})

export const login = ({ credential, password }) => async dispatch => {
	const res = await fetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({ credential, password }),
	})
	dispatch(setUser(res.data.user))
	return res
}

export const restoreUser = () => async dispatch => {
	const res = await fetch('/api/session')
	dispatch(setUser(res.data.user))
	return res
}

export const signup = user => async dispatch => {
	const { username, email, password } = user
	const response = await fetch('/api/users', {
		method: 'POST',
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	})

	dispatch(setUser(response.data.user))
	return response
}

export const logout = () => async dispatch => {
	const response = await fetch('/api/session', {
		method: 'DELETE',
	})
	dispatch(removeUser())
	return response
}

export const updateSpotifyToken = () => async dispatch => {}

const initialState = { user: null }

export default function reducer(state = initialState, action) {
	let newState
	switch (action.type) {
		case SET_USER:
			newState = Object.assign({}, state, { user: action.payload })
			return newState
		case REMOVE_USER:
			newState = Object.assign({}, state, { user: null })
			return newState
		default:
			return state
	}
}