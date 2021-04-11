import { updateSongLink } from '../store/songbar'
const detectColors = require('get-image-colors')

export function checkText(text, maxText) {
	if (typeof text === 'object') {
		let total = 0

		//! --------------------------------------------------------------------------
		//! BEFORE GOING TO BED
		//! attempt ot make function that will shorten the length of a list of react <a> tags
		//! will cut off extra and append '...' to the end

		text.forEach(t => {
			if (total > maxText) {
			}
			total += t.props.children.length
		})
		return text
	}
	return text.length > maxText ? text.slice(0, maxText) + '...' : text
}

export function getColors(image, a = 1) {
	return new Promise(async (res, rej) => {
		const colors = await detectColors(image)
		res(
			colors.map(color => {
				const [r, g, b] = color._rgb
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

export const defaultAvatar =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX29/fW1tbz9PTX19ft7u7w8fHc3Nzn6Ojk5OT19vbd3d3q6+vh4eHT09Pj4+Pv7+8nGkdkAAAENklEQVR4nO2d7ZKrIAyGFaqgiL3/u111t1vrVkugm5jO+8zs+dcZ3kPIF6GtKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwL/RGWM66UX8EyaMva3rOk5/th+DkV7Qe2m8jbO0OzHasZFe1tsI9lHdr0obpJf2Fvb0fYpG0+7rWzS2ym3VHetbNDrpRZbQvxY4SRykl5lNZxP0zbRKQ6RJ1DdhVUrs0gVOKJSYbKJqd7ElCZzOovSCqQxEgXUcpZdMI6SEiY3Ei/SiKdC8zA3pVVMg2+iCIju90m10JuqpGal+9Iaa9C1zC2s9cT/vFM5oKTOyt7C20ktPIyMW3lDia/KNVIuZ0lLuR3rpxadg8o1UyUEsOIZKDqIvEKgj/S5xNHXU0D/tSxSqcKa5Sek3Xnr5CZQp1FBBQaF+hWWeRsM5LIoWKnxpWcTXEA/LsjYNt4lNiUIdfYwSgSpqiyJnqiFYVJXLF6iitCgrgaXXnkh+VqOlJZwdL1TEioXcXpSeW9KEKZqnW6jDzyzkbaKeLayqS84mquiz/ZJRYEQNhdMKup1qstEZev6tIudeQwyKekLhHZJEFZXvHwgSdQokSNQqsKquiQoV5TJbuhdT3ssGWlWRvmouzvuVX/SvJK4DfeO9C82Jw0bj27g8HIn9fZXmcNZ7PapvhuWzMVp/ztDhHt5VrDq7za6pxnZ1AtfNj2jP1xn29ebVT7s6XWZ88qok1sNqq7bvMmJ9Lv96fabgYRuurl8ssP75t320xCcV5cP/kTTPK94/SzRNCM65EK4bZ7LzsOY8YXLXXyY+h9n//EkKqoOAkPJy6/Dl1yk6xMe52eQVj+KbcQf60q3gX3ldCMZ+byPD63dRJ6iqUor5GHu3XWnj+piSmYs/NUluyMS6HXwIl8slBD+0dXJpJdwHJzYr4je0z8jaadngRRqiLaqiG+1URAN/ybBsOoIXwyxbKHqfwXEKZ8ROYtnUBQExdzoyCZQbYGATKHW/n/+8iYyQrykaYCMiY6ZcnnRGJCR2fEYqdD+cdZOdrVAic+M8hjKzw2XTzlQk0hpWgRIRseiJGh0BV8PqaERifsEUaRb8bcWyRwd0+BtSnBnNDL8z5Wlg3OHP23gdzeRquAUyB4tJIXfvm7E4/FHI3clgDocCAZGpkbhSyF1dcAd8/pDPWzvNcNdPn6+Qr1d6g7sZxZ2W8iemUAiFUPgXbk/z+dHi83Oaz8+8WW8tFoXss1Gf38XgdjX8FxdsYwrfSAwr8LYTJW5meO8PrwIKWa/XZL5PkfC9+cUIjdGydaPkBtsyv1mALFBwnJ1Fouy8PoNDlf4uiS7ph1YK9PXSs/rTNh6/CSnTZ8/xgLYZtr/I9RZ10Y4icf45zfyrau8rN+z8y2zyr2UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAn5AvEEjipkcYsygAAAABJRU5ErkJggg=='
