const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config')
const { User } = require('../db/models')
const axios = require('axios')
const qs = require('qs')
const { token } = require('morgan')

const { secret, expiresIn } = jwtConfig

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
	// Create the token.
	const token = jwt.sign(
		{ data: user.toSafeObject() },
		secret,
		{ expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
	)

	const isProduction = process.env.NODE_ENV === 'production'

	// Set the token cookie
	res.cookie('token', token, {
		maxAge: expiresIn * 1000, // maxAge in milliseconds
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction && 'Lax',
	})

	return token
}

const setSpotifyToken = async (req, res, next) => {
	if (Date.now() > process.env.SPOTIFY_ACCESS_EXPIRES) {
		console.log('Expired token. Getting a new one......')
		const config = {
			method: 'post',
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Cookie: '__Host-device_id=AQB5PRUSy0rxG1oqGFbPqTpE9BxZyLyY7ITqE8jNgmex4899LW2EpUznkUxsBpkn324qOrBcS81Pci7c1ZqgiaOAz_IiBs7rkto',
			},
			data: qs.stringify({
				grant_type: 'client_credentials',
				client_id: process.env.SPOTIFY_CLIENT_ID,
				client_secret: process.env.SPOTIFY_CLIENT_SECRET,
			}),
		}

		const response = await axios(config)

		if (response.status === 200) {
			process.env.SPOTIFY_ACCESS_TOKEN = response.data.access_token
			process.env.SPOTIFY_ACCESS_EXPIRES = Date.now() + response.data.expires_in * 1000
			console.log('New token successfully acquired.')
		} else {
			console.log('Error getting new token')
		}
	}
	return next()
}

const restoreUser = (req, res, next) => {
	// token parsed from cookies
	const { token } = req.cookies

	return jwt.verify(token, secret, null, async (err, jwtPayload) => {
		if (err) {
			return next()
		}

		try {
			const { id } = jwtPayload.data
			req.user = await User.scope('currentUser').findByPk(id)
		} catch (e) {
			res.clearCookie('token')
			return next()
		}

		if (!req.user) res.clearCookie('token')

		return next()
	})
}

// If there is no current user, return an error
const requireAuth = [
	restoreUser,
	function (req, res, next) {
		if (req.user) return next()

		const err = new Error('Unauthorized')
		err.title = 'Unauthorized'
		err.errors = ['Unauthorized']
		err.status = 401
		return next(err)
	},
]

module.exports = { setTokenCookie, setSpotifyToken, restoreUser, requireAuth }
