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
				Object.assign(
					...likes.map(like => {
						return {
							[like.spotId]: {
								type: like.type,
							},
						}
					})
				)
			)
		} else res.status(400).json({ message: "Missing 'id'." })
	})
)

//POST like
router.post(
	'/likes',
	asyncHandler(async (req, res) => {
		const { userId, type, spotId } = req.body
		if ((userId, type, spotId)) {
			try {
				const like = await Like.create({ userId, type, spotId })
				res.status(200).json(like)
			} catch (error) {
				res.status(500).json(error)
			}
		} else res.status(400).json({ message: "Missing 'userId', 'type', and/or 'spotId'." })
	})
)

//DELETE like by spotId
router.delete(
	'/likes/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params //spotId
		const { userId } = req.body

		if (id || userId) {
			try {
				const likes = await Like.destroy({
					where: {
						userId,
						spotId: id,
					},
				})
				res.status(likes > 0 ? 200 : 204).json({ status: `Successfully deleted ${likes} entries` })
			} catch (error) {
				res.status(500).json({ error })
			}
		} else res.status(400).json({ message: "Missing 'id' and/or 'userId'." })
	})
)

module.exports = router
