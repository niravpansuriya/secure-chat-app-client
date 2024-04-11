const URL = 'ws://localhost:8000/ws/chat/';

class Socket {
	constructor() {
		this.socket = null;
		this.isInit = false;
	}

	connect(username) {
		this.socket = new WebSocket(URL + username + '/');
		this.isInit = true;
	}

	disconnect() {
		this.socket.close();
	}

	sendMessage(type, message) {
		this.socket.send(JSON.stringify({ type, message }));
	}
}

export const socket = new Socket();
