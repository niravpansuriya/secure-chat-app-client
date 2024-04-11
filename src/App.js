import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Signup />}></Route>
				<Route path="/chat" element={<Chat />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
