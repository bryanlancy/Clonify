import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getLists } from '../../../store/dashboard'

import Card from '../../Card'

import './Dashboard.css'

export default function Dashboard() {
	const dispatch = useDispatch()
	const likes = useSelector(state => state.likes)
	const { featured, newReleases, recommended } = useSelector(state => state.dashboard)

	function getGreeting() {
		const now = new Date().getHours()
		if (now < 12) return 'Good morning'
		else if (now < 16) return 'Good afternoon'
		else return 'Good evening'
	}

	useEffect(() => {
		let tracks = []
		for (const likeId in likes) {
			const { type } = likes[likeId]
			if (type === 'track') tracks.push(likeId)
		}
		if (tracks.length > 0) dispatch(getLists(tracks.slice(0, 5).join(',')))
	}, [dispatch, likes])

	let tilesHeader = [],
		tilesRelease = [],
		tilesFeatured = [],
		tilesRecommended = [],
		tilesCategory = []
	if (featured) {
		for (const id in featured.playlists) {
			const playlist = featured.playlists[id]
			const { image, name: title, description: text } = playlist
			tilesFeatured.push(<Card key={id} type="playlist" id={id} cardInfo={{ image, title, text }} />)
		}
	}
	if (newReleases) {
		for (const id in newReleases.albums) {
			const album = newReleases.albums[id]
			const { image, name: title, artists } = album
			tilesRelease.push(<Card key={id} type="album" id={id} cardInfo={{ image, title, text: artists.join(', ') }} />)
		}
	}
	if (recommended) {
		for (const id in recommended.tracks) {
			const track = recommended.tracks[id]
			const { image, name: title, artists } = track
			tilesRecommended.push(<Card key={id} type="track" id={id} cardInfo={{ image, title, text: artists.join(', ') }} />)
		}
	}
	const count = 4
	const maxCards = 4
	const style = { gridTemplateColumns: `repeat(${count},1fr)`, '--columns': count }

	return (
		<div className="page dashboard">
			<div className="dashboard__container">
				<div className="dashboard__header">
					<h1>{getGreeting()}</h1>
					{/* <div className="dashboard__header-tiles">{tilesHeader}</div> */}
				</div>
				<div className="dashboard__section">
					<b>New Releases</b>
					<div className="dashboard__release-tiles dashboard__grid" style={style}>
						{tilesRelease.slice(0, maxCards)}
					</div>
				</div>
				<div className="dashboard__section">
					<b>Featured Playlists</b>
					<div className="dashboard__featured-tiles dashboard__grid" style={style}>
						{tilesFeatured.slice(0, maxCards)}
					</div>
				</div>
				<div className="dashboard__section">
					<b>Recommendations</b>
					<div className="dashboard__recommended-tiles dashboard__grid" style={style}>
						{tilesRecommended.slice(0, maxCards)}
					</div>
				</div>
			</div>
			{/* <div>
				<b>Categories??</b>
				<div className="dashboard__category-tiles">{tilesCategory}</div>
			</div> */}
		</div>
	)
}
