import React from 'react'

import './Dashboard.css'

export default function Dashboard() {
	let greeting
	const now = new Date().getHours()
	if (now < 12) greeting = 'Good morning'
	else if (now < 16) greeting = 'Good afternoon'
	else greeting = 'Good evening'

	let tilesHeader, tilesRelease, tilesFeatured, tilesRecommended, tilesCategory

	return (
		<div className="page dashboard">
			<div className="dashboard__header">
				<h1>{greeting}</h1>
				<div className="dashboard__header-tiles">{tilesHeader}</div>
			</div>
			<div>
				<b>New Releases</b>
				<div className="dashboard__release-tiles">{tilesRelease}</div>
			</div>
			<div>
				<b>Featured Playlists</b>
				<div className="dashboard__featured-tiles">{tilesFeatured}</div>
			</div>
			<div>
				<b>Recommendations</b>
				<div className="dashboard__recommended-tiles">{tilesRecommended}</div>
			</div>
			<div>
				<b>Categories??</b>
				<div className="dashboard__category-tiles">{tilesCategory}</div>
			</div>
		</div>
	)
}
