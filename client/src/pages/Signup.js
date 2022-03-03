import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {

	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password, firstName, lastName}
		axios.post('/api/auth/signup', requestBody)
			.then(response => {
				// redirect to login
				navigate('/login')
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}
    const handleEmail = e => setEmail(e.target.value)
	const handleFirstName = e => setFirstName(e.target.value)
    const handleLastName = e => setLastName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)
	const [errorMessage, setErrorMessage] = useState(undefined);

	return (
		<>
			<h1>Signup</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email: </label>
				<input type="text" value={email} onChange={handleEmail} />
				<label htmlFor="password">Password: </label>
				<input type="password" value={password} onChange={handlePassword} />
				<label htmlFor="firstName">First Name: </label>
				<input type="text" value={firstName} onChange={handleFirstName} />
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" value={lastName} onChange={handleLastName} />
				<button type="submit">Sign Up</button>
			</form>

			{errorMessage && <h5>{errorMessage}</h5>}

			<h3>Already have an account?</h3>
			<Link to='/login'>Login</Link>
		</>
	)
}