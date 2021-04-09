import { updateSongLink } from '../store/songbar'
const detectColors = require('get-image-colors')

export function checkText(text, maxText) {
	return text.length > maxText ? text.slice(0, maxText) + '...' : text
}

export function getColors(image) {
	return new Promise(async (res, rej) => {
		const colors = await detectColors(image)
		res(
			colors.map(color => {
				const [r, g, b, a] = color._rgb
				return `rgba(${r},${g},${b},${a})`
			})
		)
	})
}

export function updatePlayer(dispatch, e, type, id) {
	e.preventDefault()
	e.stopPropagation()
	dispatch(updateSongLink(`https://open.spotify.com/embed/${type}/${id}`))
}
