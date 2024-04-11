import React, { useState, useEffect } from 'react';

//  entities = [
// 	{
// username, status
// 	}
// ]
export default function ChatSidePanel({ entities, updateMessages }) {
	const [selectedChat, setSelectedChat] = useState("");
	const handleChatSelect = (id) => {
		setSelectedChat(id);
		updateMessages(id);
	};

	useEffect(() => {
		if (!selectedChat && entities && entities.length > 0) {
			setSelectedChat(entities[0]?.username);
		}
	}, [entities]);

	return (
		<>
			<ul className="space-y-2 my-3 flex-1 overflow-y-auto">
				{entities && entities?.map((entity) => (
					<li
						key={entity?.username}
						className={`cursor-pointer hover:bg-gray-300 p-2 px-4 rounded flex items-center ${
							selectedChat === entity?.username
								? 'bg-gray-300'
								: ''
						}`}
						onClick={() => handleChatSelect(entity?.username)}
					>
						{/* <img
						src={entity.profilePic}
						alt="Profile"
						className="w-10 h-10 rounded-full mr-2"
					/> */}
						<div className="w-full flex justify-between items-center">
							<span
								className="font-semibold"
								style={{ display: 'inline-block' }}
							>
								{entity?.username}
							</span>
							<div
								className={`h-2 w-2 rounded-full ${
									entity?.status === 'online'
										? 'bg-green-500'
										: 'bg-red-500'
								} `}
							></div>
							{/* <p className="text-sm text-gray-500">
							"hey"
						</p> */}
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
