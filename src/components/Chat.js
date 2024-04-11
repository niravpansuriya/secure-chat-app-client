import React, { useState, useEffect, useRef } from 'react';
import ChatBox from './ChatBox';
import ChatSidePanel from './ChatSidePanel';
import axios from '../utils/axios';
import {
	clearOnLogout,
	getUsernameFromCookie,
	isLoggedIn,
} from '../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { socket as so } from '../socket.io';
import SearchBar from './SearchBar';
import { getMessages } from '../utils/chat';

export default function Chat() {
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [currentChatParty, setCurrentChatParty] = useState('');
	const [socket, setSocket] = useState(null);
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		if (!isLoggedIn()) {
			navigate('/login');
			return;
		}

		(async () => {
			function onOpen() {
				console.log('socket connection successful');
			}

			if (!so.isInit) {
				so.connect(getUsernameFromCookie());
				so.socket.onopen = onOpen;
				setSocket(so);
			}

			const contacts = await getUserContacts();
			setContacts(contacts);
			if (contacts.length) {
				setCurrentChatParty(contacts[0]?.username);
			}
		})();
	}, []);

	useEffect(() => {
		if (!isLoggedIn()) {
			navigate('/login');
			return;
		}
		so.socket.onmessage = function (event) {
			event = JSON.parse(event?.data);
			const type = event.type;
			if (type === 'SEND_MESSAGE_USER') {
				const data = event?.data;
				const sender = data?.sender;

				if (currentChatParty === sender) {
					setMessages((messages) => {
						return [...messages, data];
					});
				}
			} else if (type == 'UPDATE_STATUS') {
				const data = event?.data;
				const { target, status } = data;
				setContacts((contacts) => {
					return contacts.map((contact) => {
						if (contact.username === target) {
							return { ...contact, status };
						}
						return contact;
					});
				});
			} else if (type == 'ADD_CONTACT') {
				const data = event?.data;
				const contact = data?.contact;
				setContacts((contacts) => {
					return [...contacts, contact];
				});
			}
		};
		updateMessages();
	}, [currentChatParty]);

	const getUserContacts = async () => {
		try {
			const response = await axios.get('/chat/contacts');
			const contacts = response?.data?.contacts || [];
			return contacts;
		} catch (error) {}
	};

	const updateMessages = async () => {
		if (currentChatParty) {
			const newMessages = await getMessages(currentChatParty);
			setMessages(newMessages);
		}
	};

	const handleSearchSelection = async (suggestion) => {
		if (suggestion) {
			setCurrentChatParty(suggestion);
		}
	};

	const handleSendMessageButton = async (message) => {
		if (socket && currentChatParty) {
			socket.sendMessage('SEND_MESSAGE_USER', {
				receiver: currentChatParty,
				message: message,
			});
			setMessages((messages) => [
				...messages,
				{
					sender: getUsernameFromCookie(),
					receiver: currentChatParty,
					message,
				},
			]);
		}
	};
	const handleLogout = () => {
		if (clearOnLogout()) {
			so.disconnect();
			navigate('/login');
		}
	};
	return (
		<>
			<div className="bg-gray-100 h-screen flex w-full">
				{/* Side panel */}
				<div className="w-1/4 bg-gray-200 h-screen ">
					<div className="p-4 h-screen flex-1 flex flex-col">
						<SearchBar
							handleSearchSelection={handleSearchSelection}
						/>
						{/* Chat list */}
						<ChatSidePanel
							entities={contacts}
							updateMessages={(username) =>
								setCurrentChatParty(username)
							}
						/>
						<button
							className="mb-2 flex flex-col space-y-1 border border-red-500 text-red-500 rounded-full px-4 p-2 focus:outline-none w-56 m-auto font-bold hover:opacity-80 text-center items-center justify-center"
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				</div>
				<ChatBox
					currentChatParty={currentChatParty}
					messages={messages}
					handleSendMessageButton={handleSendMessageButton}
				/>
			</div>
		</>
	);
}
