import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import TrackRow from '../Tracks/TrackRow'
import { updateSongLink } from '../../store/songbar'
import { getAlbums } from '../../store/albums'
import { checkText } from '../../utils/format'
import './AlbumDetailPage.css'

const getColors = require('get-image-colors')

export default function AlbumDetailPage() {
	const defaultImage =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX29/fW1tbz9PTX19ft7u7w8fHc3Nzn6Ojk5OT19vbd3d3q6+vh4eHT09Pj4+Pv7+8nGkdkAAAENklEQVR4nO2d7ZKrIAyGFaqgiL3/u111t1vrVkugm5jO+8zs+dcZ3kPIF6GtKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwL/RGWM66UX8EyaMva3rOk5/th+DkV7Qe2m8jbO0OzHasZFe1tsI9lHdr0obpJf2Fvb0fYpG0+7rWzS2ym3VHetbNDrpRZbQvxY4SRykl5lNZxP0zbRKQ6RJ1DdhVUrs0gVOKJSYbKJqd7ElCZzOovSCqQxEgXUcpZdMI6SEiY3Ei/SiKdC8zA3pVVMg2+iCIju90m10JuqpGal+9Iaa9C1zC2s9cT/vFM5oKTOyt7C20ktPIyMW3lDia/KNVIuZ0lLuR3rpxadg8o1UyUEsOIZKDqIvEKgj/S5xNHXU0D/tSxSqcKa5Sek3Xnr5CZQp1FBBQaF+hWWeRsM5LIoWKnxpWcTXEA/LsjYNt4lNiUIdfYwSgSpqiyJnqiFYVJXLF6iitCgrgaXXnkh+VqOlJZwdL1TEioXcXpSeW9KEKZqnW6jDzyzkbaKeLayqS84mquiz/ZJRYEQNhdMKup1qstEZev6tIudeQwyKekLhHZJEFZXvHwgSdQokSNQqsKquiQoV5TJbuhdT3ssGWlWRvmouzvuVX/SvJK4DfeO9C82Jw0bj27g8HIn9fZXmcNZ7PapvhuWzMVp/ztDhHt5VrDq7za6pxnZ1AtfNj2jP1xn29ebVT7s6XWZ88qok1sNqq7bvMmJ9Lv96fabgYRuurl8ssP75t320xCcV5cP/kTTPK94/SzRNCM65EK4bZ7LzsOY8YXLXXyY+h9n//EkKqoOAkPJy6/Dl1yk6xMe52eQVj+KbcQf60q3gX3ldCMZ+byPD63dRJ6iqUor5GHu3XWnj+piSmYs/NUluyMS6HXwIl8slBD+0dXJpJdwHJzYr4je0z8jaadngRRqiLaqiG+1URAN/ybBsOoIXwyxbKHqfwXEKZ8ROYtnUBQExdzoyCZQbYGATKHW/n/+8iYyQrykaYCMiY6ZcnnRGJCR2fEYqdD+cdZOdrVAic+M8hjKzw2XTzlQk0hpWgRIRseiJGh0BV8PqaERifsEUaRb8bcWyRwd0+BtSnBnNDL8z5Wlg3OHP23gdzeRquAUyB4tJIXfvm7E4/FHI3clgDocCAZGpkbhSyF1dcAd8/pDPWzvNcNdPn6+Qr1d6g7sZxZ2W8iemUAiFUPgXbk/z+dHi83Oaz8+8WW8tFoXss1Gf38XgdjX8FxdsYwrfSAwr8LYTJW5meO8PrwIKWa/XZL5PkfC9+cUIjdGydaPkBtsyv1mALFBwnJ1Fouy8PoNDlf4uiS7ph1YK9PXSs/rTNh6/CSnTZ8/xgLYZtr/I9RZ10Y4icf45zfyrau8rN+z8y2zyr2UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAn5AvEEjipkcYsygAAAABJRU5ErkJggg=='
	const dispatch = useDispatch()
	const { id } = useParams()
	const [colorState, setColorState] = useState('#000000')
	const [isLoaded, setIsLoaded] = useState(false)
	const [isLiked, setIsLiked] = useState(false)
	const { [id]: album } = useSelector(state => state.albums)

	function setBackgroundColor(image) {
		getColors(image)
			.then(colorArray => {
				const firstColor = colorArray[0]._rgb
				setColorState(`rgba(${firstColor[0]},${firstColor[1]},${firstColor[2]},${firstColor[3]})`)
			})
			.catch(e => {
				console.log(e)
			})
	}

	useEffect(() => {
		if (album) setBackgroundColor(album.image)
	}, [album])

	useEffect(() => {
		if (!album) dispatch(getAlbums(id))
		else {
			setIsLoaded(true) //! LOADS NOTHING IF NO ALBUM IS LOADED
		}
	}, [id, dispatch, album])

	function convertTime(ms) {
		const minutes = ms / 1000 / 60
		const seconds = (minutes % 1).toFixed(4) * 60
		return `${Math.floor(minutes)} min, ${Math.floor(seconds)} sec`
	}

	function changeLike() {
		setIsLiked(!isLiked)
	}

	function updatePlayer() {
		dispatch(updateSongLink(`https://open.spotify.com/embed/album/${id}`))
	}

	return (
		<div className="page album-page">
			<div className="album" style={{ background: `linear-gradient(${colorState},#0f0f0f 550px)` }}>
				{isLoaded && (
					<>
						<div className="album-details">
							<img className="album-image" src={album?.image} alt="album-cover" />
							<div className="album-text">
								<p>ALBUM</p>
								<h1>{checkText(album?.name, 30)}</h1>
								<div className="album-stats">
									<div className="album-artist">
										<img className="album-artist-image" src={album?.artists[0]?.image || defaultImage} alt="artist-avatar" />
										<a className="album-artist-name" href={`/artist/${album?.artists[0]?.id}`}>
											{album?.artists[0]?.name}
										</a>
									</div>
									<p className="album-year">{album?.release_date}</p>
									<p className="album-songs">{`${album?.songs.total} songs, ${convertTime(album?.songs.playtime)}`}</p>
								</div>
							</div>
						</div>
						<div className="album-tracks">
							<div className="buttons">
								<div className="play-button">
									<i className="fas fa-play"></i>
								</div>
								<i className={`${isLiked ? 'fas' : 'fal'} fa-heart heart-album`} onClick={changeLike} style={{ color: isLiked ? '#1db954' : '' }}></i>
								<i className="far fa-ellipsis-h dropdown-button"></i>
							</div>
							<div className="tracks">
								<>
									{album?.songs.tracks.map(track => (
										<TrackRow id={track.id} rowInfo={{ name: track.name, artists: track.artists, explicit: track.explicit, duration: track.duration, number: track.track_number }} />
									))}
								</>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
