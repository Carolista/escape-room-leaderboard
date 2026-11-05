import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';

function App() {
	const [rooms, setRooms] = useState([]);
	const [roomsLoading, setRoomsLoading] = useState(true);
	const [roomsError, setRoomsError] = useState(null);

	useEffect(() => {
		async function loadRooms() {
			try {
				const response = await fetch('http://localhost:8080/rooms');
				if (!response.ok) {
					throw new Error(`Server responded with ${response.status}`);
				}
				const data = await response.json();
				setRooms(data);
				setRoomsLoading(false);
			} catch (err) {
				setRoomsError(err.message);
				setRoomsLoading(false);
			}
		}

		loadRooms();
	}, []);

	const roomProps = { rooms, roomsLoading, roomsError };

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home {...roomProps} />} />
					<Route path="about" element={<About />} />
					<Route path="rooms" element={<Rooms {...roomProps} />} />
					<Route
						path="leaderboard"
						element={<Leaderboard {...roomProps} />}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
