import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import * as sessionActions from '../../../store/session'

import './LoginForm.css'

export default function LoginForm() {
	const [errors, setErrors] = useState([])
	const [credential, setCredential] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const handleSubmit = e => {
		e.preventDefault()
		setErrors([])
		return dispatch(sessionActions.login({ credential, password })).catch(res => {
			if (res.data && res.data.errors) setErrors(res.data.errors)
		})
	}

	return (
		<form onSubmit={handleSubmit} className="login__form">
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<label>
				Username or Email
				<input type="text" value={credential} onChange={e => setCredential(e.target.value)} placeholder="Username or email address" required />
			</label>
			<label>
				Password
				<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
			</label>
			<button type="submit">Log In</button>
		</form>
	)
}
