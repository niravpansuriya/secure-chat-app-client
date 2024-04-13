import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { getUsernameFromCookie } from '../utils/cookie';
import mainLogo from '../assets/main_logo.png';

export default function ChatBox({
	currentChatParty,
	messages,
	handleSendMessageButton,
}) {
	const [message, setMessage] = useState('');
	const host = getUsernameFromCookie();
	const messagesEndRef = useRef(null);

	/**
	 * Scrolls to the bottom of the chat messages.
	 */
	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	/**
	 * Handles sending a message when the enter key is pressed.
	 * @param {Object} event - The keydown event.
	 */
	const handleSendMessage = (event) => {
		if (event.keyCode === 13) {
			handleSendMessageButton(message);
			setMessage('');
		}
	};

	return (
		<>
			{/* Main chat area */}
			<div className="flex-1 bg-gray-50 flex flex-col">
				{/* Chat header */}
				<div className="bg-blue-600 py-2 px-4 text-white flex justify-between items-center">
					<span className="font-bold text-x">{currentChatParty}</span>
					<div className="flex items-center">
						<div className="font-bold text-x mr-2">
							<div class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-[#FDEEBF] rounded-full ">
								<span class="font-medium text-black">
									{getUsernameFromCookie()?.[0]?.toUpperCase()}
								</span>
							</div>
						</div>
						<div>
							<img
								src={mainLogo}
								alt="main logo"
								class="w-10 h-10 text-blue-500"
							></img>
						</div>
					</div>
				</div>
				{/* Chat messages */}
				<div className="flex-1 overflow-y-auto p-4">
					<div className="flex flex-col space-y-1">
						{/* Render messages based on selected chat */}
						{messages &&
							messages?.map((message, index) => {
								return (
									<ChatMessage
										key={index}
										text={message.message}
										type={
											message.sender === host
												? 'SENT'
												: 'RECEIVED'
										}
										sender={message?.sender}
										isGroupMessage={
											!message.is_direct_message
										}
									/>
								);
							})}
						{/* Empty div used for scrolling to bottom */}
						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* Input box for sending messages */}
				<div className="p-6 flex items-center">
					<input
						type="text"
						placeholder="Type your message..."
						className="flex-1 border border-gray-400 rounded-full px-4 py-2 focus:outline-none"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleSendMessage}
					/>
					<button
						className="bg-blue-600 text-white font-bold rounded-full px-4 p-2 ml-2 focus:outline-none hover:opacity-90"
						onClick={(e) => {
							handleSendMessageButton(message);
							setMessage('');
						}}
					>
						Send
					</button>
				</div>
			</div>
		</>
	);
}
