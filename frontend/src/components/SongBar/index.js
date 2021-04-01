import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './SongBar.css'

export default function SongBar() {
	const songbar = useSelector(state => state.songbar)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(true)
	}, [songbar])

	return isLoaded && <iframe className="songbar" src={songbar.link} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
}
