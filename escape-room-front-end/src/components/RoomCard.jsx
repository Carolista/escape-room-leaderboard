function RoomCard({ room }) {
	return (
		<article className="room-card">
			{room.image ? (
				<img
					src={room.image}
					alt={room.alt}
					className="room-card-image"
				/>
			) : (
				<div className="room-card-image room-card-placeholder">
					<img src="/building-lock.svg" alt="" />
					<span>Photos coming soon</span>
				</div>
			)}
			<div className="room-card-body">
				<h3>{room.name}</h3>
				<p className="room-tagline">{room.tagline}</p>
				<p>{room.desc1}</p>
			</div>
		</article>
	);
}

export default RoomCard;
