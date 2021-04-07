import React, { useEffect, useState } from 'react'

import Card from '../Card'
import TrackRow from '../Tracks/TrackRow'

export default function SearchList({ results, type }) {
	let list

	const [columns, setColumns] = useState('1fr 1fr 1fr 1fr')
	const [cardImageSize, setCardImageSize] = useState('50px')

	function getGridSize() {
		setColumns('1fr 1fr 1fr 1fr')
		setCardImageSize('50px')
	}

	useEffect(() => {
		switch (type) {
			case 'artist':
			case 'album':
			case 'playlist':
				setColumns('1fr 1fr 1fr 1fr')
				break
			case 'track':
				setColumns('1fr')
				break
			default:
				break
		}
	}, [type])

	if (!(Object.entries(results) == 0)) {
		list = (
			<div className="search-list" style={{ gridTemplateColumns: columns }}>
				{Object.entries(results.results).map(result => {
					switch (type) {
						case 'album':
							return <Card key={result[0]} size={cardImageSize} type={type} id={result[0]} cardInfo={{ image: result[1].image, title: result[1].name, text: result[1].artists.join(', ') }} />
						case 'artist':
							return <Card key={result[0]} size={cardImageSize} type={type} id={result[0]} cardInfo={{ image: result[1].image, title: result[1].name, text: result[1].genres.join(', ') }} />
						case 'playlist':
							return <Card key={result[0]} size={cardImageSize} type={type} id={result[0]} cardInfo={{ image: result[1].image, title: result[1].name, text: result[1].description }} />
						case 'track':
							return <TrackRow key={result[0]} id={result[0]} rowInfo={result[1]} />
						default:
							break
					}
				})}
			</div>
		)
	}

	return (
		<>
			{!(Object.entries(results) == 0) && (
				<>
					<h1>
						Search for "{results.q}" returned {results.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} results
					</h1>
					{list}
				</>
			)}
		</>
	)
}
