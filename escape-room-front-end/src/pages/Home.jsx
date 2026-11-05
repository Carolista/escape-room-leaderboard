import { Link } from 'react-router';
import RoomCard from '../components/RoomCard';
import rooms from '../mock-data/rooms.json';

function Home() {
    const featuredRooms = rooms.filter(room => room.image).slice(0, 3);

    // TODO 11: Once App owns the rooms (TODO 9-10), this page shouldn't import
    //  its own copy of the mock data anymore. Get rid of the import above and receive 
    //  what you need from the parent instead. What does a component's function receive
    //  from its parent, and how do you pick out just the pieces you want?

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
				{/* TODO 12: Show visitors what's going on while the rooms load,
				or if something goes wrong. The Loading and ErrorMessage
				components in src/components are ready and waiting; check what
				props they expect. Only one of the two (or neither) should
				show at a time. Also: What does the page look like when a rooms array
                exists but is still empty? */}
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
