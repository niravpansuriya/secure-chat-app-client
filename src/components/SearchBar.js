import React, { useState } from 'react';
import axios from '../utils/axios';

export default function SearchBar({ handleSearchSelection }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	const handleChange = (event) => {
		const { value } = event.target;
		setSearchTerm(value);

		fetchSuggestions(value);
	};

	const handleSuggestionClick = (suggestion) => {
		handleSearchSelection(suggestion);
		setSuggestions([]);
		setSearchTerm('');
	};

	const fetchSuggestions = async (value) => {
		try {
			const res = await axios.get('/user/search', {
				params: { search: value },
			});
			const usernames = res?.data?.usernames;
			if (usernames) {
				setSuggestions(usernames);
			}
		} catch (error) {}
	};

	return (
		<div className="relative">
			<input
				type="text"
				className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Search..."
				value={searchTerm}
				onChange={handleChange}
			/>
			{searchTerm && (
				<ul className="absolute top-full left-0 z-10 bg-white border border-gray-300 rounded-md shadow-md w-full">
					{suggestions && suggestions?.map((suggestion, index) => (
						<li
							key={index}
							className="py-2 px-4 cursor-pointer hover:bg-gray-100"
							onClick={() => handleSuggestionClick(suggestion)}
						>
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
