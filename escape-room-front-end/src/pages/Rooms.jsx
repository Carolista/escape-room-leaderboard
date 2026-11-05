import RoomCard from '../components/RoomCard';
import rooms from '../mock-data/rooms.json';

function Rooms() {

    // TODO 13: Same idea as TODO 11, but for this page. Swap the mock data import
    //  for what App now passes down.
    
	return (
		<section>
			<h1>Our Rooms</h1>
			<p className="page-intro">
				Choose your conundrum. Every session is sixty minutes, and each
				room is built for 2-6 players.
			</p>
			{/* TODO 14: Show the loading and error states here, too. Notice
			how much of this you've already figured out on the Home page. Is
			there anything about this page's layout that changes where these
			messages should go, or when the grid should appear? */}
			{rooms.length > 0 && (
				<div className="room-grid">
					{rooms.map(room => (
						<RoomCard key={room.id} room={room} />
					))}
				</div>
			)}
		</section>
	);
}

export default Rooms;
