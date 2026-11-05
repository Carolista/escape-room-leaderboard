import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';

function App() {
    
	// TODO 9: Rooms are needed by Home, Rooms, AND Leaderboard, and right now
	//  each of those pages imports its own copy of the mock data. Once you've
	//  finished the sessions work above (TODO 6-8), come back here and decide
	//  where the one shared copy of the rooms data should live. Why is App
	//  the right spot? (Think about where those three pages sit in the tree.)
	//  Fetch rooms from the back end here, and track everything you tracked for
	//  sessions: the data itself, whether it's still loading, and whether it
	//  failed. Then remove the mock-data imports from the three pages (see
	//  TODO 11, 13, and 15).

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					{/* TODO 10: Pass what the pages need (the rooms, plus their
					loading and error status) down to Home, Rooms, and
					Leaderboard. Think about how you can send several related
					values without repeating yourself three times. */}
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="rooms" element={<Rooms />} />
					<Route path="leaderboard" element={<Leaderboard />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
