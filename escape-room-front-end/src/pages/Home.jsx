import { Link } from 'react-router';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import RoomCard from '../components/RoomCard';

function Home({ rooms, roomsLoading, roomsError }) {
	const featuredRooms = rooms.filter(room => room.image).slice(0, 3);

	return (
		<>
			<section className="hero">
				<img
					src="/images/escape-artists-storefront.png"
					alt="The neon Escape Artists storefront at night, with two players walking out"
					className="hero-image"
				/>
				<div className="hero-overlay">
					<p className="eyebrow">St. Louis, Missouri</p>
					<h1>Think you can get out?</h1>
					<p className="hero-text">
						Programmer-themed escape rooms for teams who debug under
						pressure. Sixty minutes. Only one way out.
					</p>
					<div className="button-row">
						<Link to="/rooms" className="button">
							Explore the Rooms
						</Link>
						<Link
							to="/leaderboard"
							className="button button-outline"
						>
							See the Leaderboard
						</Link>
					</div>
				</div>
			</section>

			<section>
				<h2>Now Locking In</h2>
				{roomsLoading && <Loading what="rooms" />}
				{roomsError && <ErrorMessage what="rooms" error={roomsError} />}
				<div className="room-grid">
					{featuredRooms.map(room => (
						<RoomCard key={room.id} room={room} />
					))}
				</div>
			</section>
		</>
	);
}

export default Home;
