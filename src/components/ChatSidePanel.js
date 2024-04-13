import React, { useState, useEffect } from 'react';
//  entities = [
// 	{
// username, status
// 	}
// ]

export default function ChatSidePanel({ entities, updateMessages }) {
	const [selectedChat, setSelectedChat] = useState('');

	/**
	 * Handles the selection of a chat entity.
	 */
	const handleChatSelect = (id) => {
		setSelectedChat(id);
		updateMessages(id);
	};

	useEffect(() => {
		// Set the selected chat to the first entity if no chat is selected and there are entities available
		if (!selectedChat && entities && entities.length > 0) {
			setSelectedChat(entities[0]?.username);
		}
	}, [entities]);

	return (
		<>
			<ul className="space-y-2 my-3 flex-1 overflow-y-auto">
				{entities &&
					entities?.map((entity) => (
						<li
							key={entity?.username}
							className={`cursor-pointer hover:bg-gray-300 p-2 px-4 rounded flex items-center ${
								selectedChat === entity?.username
									? 'bg-gray-300'
									: ''
							}`}
							onClick={() => handleChatSelect(entity?.username)}
						>
							<div className="w-full flex justify-between items-center">
								<span
									className="font-semibold"
									style={{ display: 'inline-block' }}
								>
									{entity?.username}
								</span>
								{entity?.is_direct_message ? (
									<div
										className={`h-2 w-2 rounded-full ${
											entity?.status === 'online'
												? 'bg-green-500'
												: 'bg-red-500'
										} `}
									></div>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
										/>
									</svg>
								)}
							</div>
						</li>
					))}
			</ul>
		</>
	);
}
