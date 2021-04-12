'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Likes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			spotId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			type: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'Users' },
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Likes')
	},
}
