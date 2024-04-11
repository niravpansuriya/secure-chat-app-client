import React, { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleInputChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleUserSelection = (e) => {
        const selectedUserId = e.target.value;
        if (!selectedUsers.includes(selectedUserId)) {
            setSelectedUsers([...selectedUsers, selectedUserId]);
        }
    };

    const handleCreateGroup = () => {
        console.log('Creating group:', groupName);
        console.log('Selected users:', selectedUsers);
        handleClose();
    };

    const handleClose = () => {
        setGroupName('');
        setSelectedUsers([]);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-60"></div>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full">
                                        <div className="text-center">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Create Group</h3>
                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="group-name" className="block text-sm font-medium ">
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
                                            <label htmlFor="user-select" className="block text-sm font-medium">
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
                                                <option className="my-1 py-1 px-2" value="1">User 1</option>
                                                <option className="my-1 py-1 px-2" value="2">User 2</option>
                                                <option className="my-1 py-1 px-2" value="3">User 3</option>
                                                <option className="my-1 py-1 px-2" value="4">User 4</option>
                                                <option className="my-1 py-1 px-2" value="5">User 5</option>
                                                <option className="my-1 py-1 px-2" value="6">User 6</option>
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
