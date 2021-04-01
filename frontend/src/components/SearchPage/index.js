import React, { useEffect, useState } from 'react'
import './SearchPage.css'

export default function SearchPage() {
	const types = ['album', 'artist', 'playlist', 'track']

	const [searchInput, setSearchInput] = useState('')
	const [searchType, setSearchType] = useState('album')

	useEffect(() => {
		console.log({ input: searchInput, type: searchType })
	}, [searchInput, searchType])

	return (
		<div className="page">
			<div className="search-input">
				<select value={searchType} onChange={e => setSearchType(e.target.value)}>
					{types.map(type => (
						<option value={type} key={type}>
							{type.slice(0, 1).toUpperCase() + type.slice(1, type.length)}
						</option>
					))}
				</select>
				<input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Enter search here" type="text" maxLength={50}></input>
			</div>
			<h1>Search Page</h1>
			<h1>Search Results down here biiiiiiiiiitch</h1>
		</div>
	)
}
