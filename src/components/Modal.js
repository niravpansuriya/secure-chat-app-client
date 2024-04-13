import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const Modal = ({ isOpen, onClose }) => {
	const [groupName, setGroupName] = useState('');
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [users, setUsers] = useState([]);

	const handleInputChange = (e) => {
		setGroupName(e.target.value);
	};

	const handleUserSelection = (e) => {
		const selected = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setSelectedUsers(selected);
	};

	const getAllUsers = async () => {
		try {
			const res = await axios.get('/user/all');
			const users = res?.data?.usernames;
			return users || [];
		} catch (error) {}
	};

	const createGroup = async (groupName, selectedUsers) => {
		try {
			await axios.post('/group/create', {
				groupName,
				users: selectedUsers,
			});
		} catch (error) {}
	};

	const handleCreateGroup = async () => {
		await createGroup(groupName, selectedUsers);
		handleClose();
	};

	const handleClose = () => {
		setGroupName('');
		setSelectedUsers([]);
		onClose();
	};

	useEffect(() => {
		(async () => {
			const users = await getAllUsers();
			setUsers(users);
		})();
	}, []);

	return (
		<>
			{isOpen && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen">
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gray-500 opacity-60"></div>
						</div>
						<div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 py-5 sm:p-6">
								<div className="sm:flex sm:items-start">
									<div className="w-full">
										<div className="text-center">
											<h3 className="text-lg leading-6 font-medium text-gray-900">
												Create Group
											</h3>
										</div>
										<div className="mt-5">
											<label
												htmlFor="group-name"
												className="block text-sm font-medium "
											>
												Group Name
											</label>
											<input
												type="text"
												name="group-name"
												id="group-name"
												className="mt-1 block w-full shadow-sm border border-gray-300 rounded-md p-1.5 px-2"
												placeholder="Enter group name"
												value={groupName}
												onChange={handleInputChange}
											/>
										</div>
										<div className="mt-5">
											<label
												htmlFor="user-select"
												className="block text-sm font-medium"
											>
												Select Users
											</label>
											<select
												id="user-select"
												name="user-select"
												multiple
												className="mt-1  block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
												onChange={handleUserSelection}
											>
												{/* Replace the options with your actual user data */}
												{users.map((user) => (
													<option
														className="my-1 py-1 px-2"
														value={user}
													>
														{user}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>
							</div>
							<div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mb-3">
								<button
									onClick={handleCreateGroup}
									type="button"
									className="bg-blue-600 text-white rounded-full px-4 p-1.5 ml-2 focus:outline-none hover:opacity-90"
								>
									Create Group
								</button>
								<button
									onClick={handleClose}
									type="button"
									className="bg-red-400 text-white rounded-full px-4 p-1.5 ml-2 focus:outline-none hover:opacity-90"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
