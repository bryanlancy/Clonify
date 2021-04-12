const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { Like } = require('../../db/models')

//GET likes by user id, param for type
router.get(
	'/likes/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params
		const { type } = req.query

		if (id) {
			const where = { userId: id }
			if (type) where.type = type

			const likes = await Like.findAll({
				where,
			})
			res.json(
				likes.length > 0
					? Object.assign(
							...likes.map(like => {
								return {
									[like.spotId]: {
										type: like.type,
									},
								}
							})
					  )
					: {}
			)
		} else res.status(400).json({ message: "Missing 'id'." })
	})
)

//POST like
router.post(
	'/likes',
	asyncHandler(async (req, res) => {
		const { userId, type, spotId } = req.body
		if (userId && type && spotId) {
			try {
				const like = await Like.create({ userId, type, spotId })
				res.status(200).json({ [spotId]: { type } })
			} catch (error) {
				res.status(500).json(error)
			}
		} else res.status(400).json({ message: "Missing 'userId', 'type', and/or 'spotId'." })
	})
)

//DELETE like by spotId
router.delete(
	'/likes/:spotId',
	asyncHandler(async (req, res) => {
		const { spotId } = req.params //spotId
		const { userId } = req.body

		if (spotId && userId) {
			try {
				const likes = await Like.destroy({
					where: {
						userId,
						spotId,
					},
				})
				res.status(likes > 0 ? 200 : 204).json({ status: `Successfully deleted ${likes} entries`, spotId })
			} catch (error) {
				res.status(500).json({ error })
			}
		} else res.status(400).json({ message: "Missing 'id' and/or 'userId'." })
	})
)

module.exports = router

// Load all of a user's likes on login/refresh (in case state is reset)
// For each like button (playlist, track, album)
//  - Ensure proper spotId and type
//      - Track rows
//      - Detail page //!ALL TYPES!!!
//  - When liked, can delete instead (based of liked state)
//  - Ensure tracks, albums, playlists that are liked, start with a 'true' like stat e
