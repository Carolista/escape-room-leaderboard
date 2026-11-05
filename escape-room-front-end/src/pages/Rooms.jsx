import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import RoomCard from '../components/RoomCard';

function Rooms({ rooms, roomsLoading, roomsError }) {
	return (
		<section>
			<h1>Our Rooms</h1>
			<p className="page-intro">
				Choose your conundrum. Every session is sixty minutes, and each room
				is built for 2-6 players.
			</p>
			{roomsLoading && <Loading what="rooms" />}
			{roomsError && <ErrorMessage what="rooms" error={roomsError} />}
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
