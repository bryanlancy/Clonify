import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './SearchPage.css'

import { searchResults } from '../../store/search'

export default function SearchPage() {
	//state management
	const dispatch = useDispatch()
	const [searchInput, setSearchInput] = useState('')
	const [searchType, setSearchType] = useState('album')
	const { [searchType]: searchResults } = useSelector(state => state.search)

	const types = ['album', 'artist', 'playlist', 'track']

	function checkKey(e) {
		const codes = ['Enter', 'NumpadEnter']
		//if enter key was pressed, submit search
		if (codes.includes(e.code)) submitSearch()
	}
	function changeType(e) {
		setSearchType(e.target.value)
		getFocus()
	}

	function submitSearch() {
		if (searchInput) dispatch(searchResults({ q: searchInput, type: searchType }))
	}

	let searchInputField
	function getFocus() {
		searchInputField.focus()
	}
	useEffect(() => {
		getFocus()
	}, [])

	useEffect(() => {
		console.log(searchType, searchResults)
	}, [searchResults])

	return (
		<div className="page">
			<div className="search-input">
				<select value={searchType} onChange={changeType}>
					{types.map(type => (
						<option value={type} key={type}>
							{type.slice(0, 1).toUpperCase() + type.slice(1, type.length)}
						</option>
					))}
				</select>
				<input
					onKeyPress={checkKey}
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
					placeholder="Enter search here"
					type="text"
					maxLength={50}
					ref={elementRef => {
						searchInputField = elementRef
					}}
				></input>
			</div>

			<h1>Search Page</h1>
			<h1>Search Results down here biiiiiiiiiitch</h1>
		</div>
	)
}
