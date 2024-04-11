import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainLogo from '../assets/main_logo.png';
import axios from '../utils/axios';

export default function Signup() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const handleRegister = async (e) => {
		e.preventDefault();
		if (password != confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			await registerUser(username, password);
			navigate('/login');
		} catch (error) {}
	};

	const registerUser = async (username, password) => {
		try {
			const res = await axios.post('/auth/signup', {
				username: username,
				password: password,
			});
			return res;
		} catch (error) {
			const statusCode = error.response.status;
			if (statusCode == 400) {
				setError('Username already exists');
			}
			throw error;
		}
	};

	return (
		<div>
			<div class="text-center mt-24">
				<div class="flex items-center justify-center">
					<img
						src={mainLogo}
						alt="main logo"
						class="w-20 h-20 text-blue-500"
					></img>
				</div>
				<h2 class="text-4xl tracking-tight">Register a new account</h2>
				<span class="text-sm">
					or{' '}
					<a href="/login" class="text-blue-500">
						Login here
					</a>
				</span>
			</div>
			<div class="flex justify-center my-2 mx-4 md:mx-0">
				<form class="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
					<div class="flex flex-wrap -mx-3 mb-6">
						<div class="w-full md:w-full px-3 mb-6">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
								for="username"
							>
								Username
							</label>
							<input
								class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
								type="input"
								onChange={(e) => setUsername(e.target.value)}
								required
							></input>
						</div>
						<div class="w-full md:w-full px-3 mb-6">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
								for="Password"
							>
								Password
							</label>
							<input
								class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								required
							></input>
						</div>
						<div class="w-full md:w-full px-3 mb-6">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
								for="Confirm Password"
							>
								Confirm Password
							</label>
							<input
								class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
								type="password"
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								required
							></input>
							<div>
								{error && (
									<p class="text-red-500 text-xs my-2 ">
										{error}
									</p>
								)}
							</div>
						</div>

						<div class="w-full md:w-full px-3 mb-6">
							<button
								class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500  "
								onClick={handleRegister}
							>
								Register
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
