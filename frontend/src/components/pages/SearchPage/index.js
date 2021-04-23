import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import SearchList from './SearchList'
import './SearchPage.css'

import { searchResults } from '../../../store/search'

export default function SearchPage() {
	//state management
	const dispatch = useDispatch()
	const [searchInput, setSearchInput] = useState('')
	const [searchType, setSearchType] = useState('album')
	const [searchLimit] = useState(50)
	const [searchOffset, setSearchOffset] = useState(0)
	const [searchLoaded, setSearchLoaded] = useState(true)
	const [scrolled, setScrolled] = useState(false)
	const { [searchType]: searchResultsObj } = useSelector(state => state.search)

	const types = ['album', 'artist', 'playlist', 'track']

	function getDocHeight() {
		let D = document
		return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight)
	}

	function amountScrolled() {
		let winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
		let docheight = getDocHeight()
		let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
		let trackLength = docheight - winheight
		let pctScrolled = ((scrollTop / trackLength) * 100).toFixed(2) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
		return pctScrolled
	}

	function checkKey(e) {
		const codes = ['Enter', 'NumpadEnter'] //codes to accept, Enter,

		if (codes.includes(e.code)) submitSearch()
	}
	function changeType(e) {
		setSearchType(e.target.value)
		getFocus()
	}

	async function submitSearch() {
		if (searchInput) {
			setSearchLoaded(await dispatch(searchResults({ q: searchInput, type: searchType, limit: searchLimit, offset: searchOffset * searchLimit })))
		}
	}

	let searchInputField
	function getFocus() {
		searchInputField.focus()
	}

	useEffect(() => {
		getFocus()
	})

	useEffect(() => {
		submitSearch()
	}, [searchOffset, searchType])

	useEffect(() => {
		setSearchOffset(0)
	}, [searchInput, searchType])

	useScrollPosition(() => {
		let percent = amountScrolled()
		//scrolled styling
		if (percent > 0.1) setScrolled(true)
		else setScrolled(false)

		//preload for "infinite scroll"
		if (percent > 85 && searchLoaded) {
			setSearchLoaded(false)
			setSearchOffset(searchOffset + 1)
		}
	})

	return (
		<div className="page">
			<div className={`search-input ${scrolled ? 'search-scrolled' : ''}`}>
				<select className="search-input__type" value={searchType} onChange={changeType}>
					{types.map(type => (
						<option value={type} key={type}>
							{type.slice(0, 1).toUpperCase() + type.slice(1, type.length)}
						</option>
					))}
				</select>
				<input
					className="search-input__text"
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
			<div className="search-page">{searchResultsObj.q === searchInput && <SearchList results={searchResultsObj} type={searchType} />}</div>
		</div>
	)
}
