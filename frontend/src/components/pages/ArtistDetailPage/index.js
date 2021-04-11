import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import Card from '../../Card'
import TrackRow from '../../Tracks/TrackRow'

import { getArtist } from '../../../store/artist'
import { checkText, updatePlayer, getColors } from '../../../utils'

import './ArtistDetailPage.css'

export default function ArtistDetailPage() {
	const max = 4

	const dispatch = useDispatch()
	const { id } = useParams()

	const [isLoaded, setIsLoaded] = useState(false)
	const [isFollowed, setIsFollowed] = useState(false)
	const [colorState, setColorState] = useState('#000')
	const [showMore, setShowMore] = useState(false)
	const { [id]: artist } = useSelector(state => state.artist)

	useEffect(() => {
		if (!artist) dispatch(getArtist(id))
		else setIsLoaded(true)
	}, [id, dispatch, artist])

	async function setBackgroundColor(image) {
		setColorState((await getColors(image, 0.35))[0])
	}
	useEffect(() => {
		if (artist) setBackgroundColor(artist.image)
	}, [artist])
	function changeFollow() {
		setIsFollowed(!isFollowed)
	}

	let count
	const { name, followers, image, topTracks, albums, relatedArtists } = artist || {}

	let tracks
	if (topTracks) {
		tracks = Object.entries(topTracks).map((track, i) => {
			const [id, rowInfo] = track
			if (i < (showMore ? 10 : 5)) return <TrackRow key={id} id={id} rowInfo={rowInfo} />
		})
	}
	let discography
	if (albums) {
		discography = Object.entries(albums).map((album, i) => {
			const [albumId, albumInfo] = album
			const { image, name, artists } = albumInfo
			if (i < max) return <Card key={albumId} type="album" id={albumId} cardInfo={{ image, title: name, text: artists.join(', ') }} />
		})
		count = Math.min(Object.keys(albums).length, max)
	}

	let related
	if (relatedArtists) {
		related = Object.entries(relatedArtists).map((artistRel, i) => {
			const [artistId, artistInfo] = artistRel
			const { name, image } = artistInfo
			if (i < max) return <Card key={artistId} type="artist" id={artistId} cardInfo={{ image, title: name, text: 'Artist' }} />
		})
	}

	return (
		<div className="page artist-page">
			<div className="artist" style={{}}>
				{isLoaded && artist && (
					<>
						<div className="artist__details" style={{ backgroundImage: `linear-gradient(${colorState} 25%,#000000aa), url(${image})` }}>
							<div className="artist-text">
								{(followers > 500000 || name === 'LilDeuceDeuce') && (
									<div className="verified-artist">
										<i className="fad fa-badge-check" style={{ '--fa-primary-color': '#fff', '--fa-secondary-color': '#2e77d0', '--fa-secondary-opacity': 1 }}></i>
										<p>Verified Artist</p>
									</div>
								)}
								<h1>{checkText(name, 30)}</h1>

								<div className="artist-stats">
									<p>{followers?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} followers</p>
								</div>
							</div>
						</div>

						<div className="artist__music">
							<div className="buttons">
								<div className="play-button" onClick={e => updatePlayer(dispatch, e, 'artist', id)}>
									<i className="fas fa-play"></i>
								</div>
								<div className={`follow-button ${isFollowed ? 'active' : ''}`} onClick={changeFollow}>
									<b>{isFollowed ? 'FOLLOWING' : 'FOLLOW'}</b>
								</div>
								<i className="far fa-ellipsis-h dropdown-button"></i>
							</div>
							<div className="artist__top-tracks">
								<b className="artist__detail-title">Popular</b>
								<div>{tracks}</div>
								<div>
									<b onClick={() => setShowMore(!showMore)} className="artist__tracks-toggle">
										{showMore ? 'SEE LESS' : 'SEE MORE'}
									</b>
								</div>
							</div>
							<div className="artist__discography">
								<b className="artist__detail-title">Discography</b>
								<div className="artist__discography-list" style={{ gridTemplateColumns: `repeat(${count},1fr)`, '--columns': count }}>
									{discography}
								</div>
							</div>
							<div className="artist__related">
								<b className="artist__detail-title">More like {name}</b>
								<div className="artist__related-list" style={{ gridTemplateColumns: `repeat(${count},1fr)`, '--columns': count }}>
									{related}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
