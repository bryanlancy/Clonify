import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
//Page Components
import SignupFormPage from './components/SignupFormPage'
import LoginFormPage from './components/LoginFormPage'
import AlbumDetailPage from './components/AlbumDetailPage'
//Other Components
import Navigation from './components/Navigation'
import SongBar from './components/SongBar'
import ProtectedRoute from './components/ProtectedRoute'
import SearchPage from './components/SearchPage'
//Redux
import { restoreUser } from './store/session'

function App() {
	const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		dispatch(restoreUser()).then(() => setIsLoaded(true))
	}, [dispatch])

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<>
					<Switch>
						<Route path="/login">
							<LoginFormPage />
						</Route>
						<Route path="/signup">
							<SignupFormPage />
						</Route>
						<ProtectedRoute path="/search">
							<SearchPage />
						</ProtectedRoute>
						<ProtectedRoute path="/album/:id">
							<AlbumDetailPage />
						</ProtectedRoute>
					</Switch>
					<SongBar />
				</>
			)}
		</>
	)
}

export default App
