import axois from './axios';

export async function getMessages(username) {
	try {
		const res = await axois.get(`/chat/messages/${username}`);
		const messages = res?.data?.messages;
		return messages || [];
	} catch (error) {
		return [];
	}
}
