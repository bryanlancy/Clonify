import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
//Page Components
import { SignupFormPage, LoginFormPage, AlbumDetailPage, SearchPage, ArtistDetailPage, PlaylistDetailPage } from './components/pages'
//Other Components
import Navigation from './components/Navigation'
import SongBar from './components/SongBar'
import ProtectedRoute from './components/ProtectedRoute'
//Redux
import { restoreUser } from './store/session'

function App() {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		dispatch(restoreUser()).then(() => setIsLoaded(true))
	}, [dispatch])

	return (
		<>
			{isLoaded && (
				<>
					{sessionUser && <Navigation isLoaded={isLoaded} />}
					<Switch>
						<Route path="/login">
							{sessionUser && <Redirect to="/" />}
							<LoginFormPage />
						</Route>
						<Route path="/signup">
							{sessionUser && <Redirect to="/" />}
							<SignupFormPage />
						</Route>
						<ProtectedRoute exact path="/"></ProtectedRoute>
						<ProtectedRoute path="/search">
							<SearchPage />
						</ProtectedRoute>
						<ProtectedRoute path="/album/:id">
							<AlbumDetailPage />
						</ProtectedRoute>
						<ProtectedRoute path="/artist/:id">
							<ArtistDetailPage />
						</ProtectedRoute>
						<ProtectedRoute path="/playlist/:id">
							<PlaylistDetailPage />
						</ProtectedRoute>
					</Switch>
					{sessionUser && <SongBar />}
				</>
			)}
		</>
	)
}

export default App
