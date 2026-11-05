import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';

const TOP_COUNT = 10;
const ALL = 'all';
const TOP = 'top';

// Successful escapes first (fastest wins), then unsuccessful attempts.
// Only successful sessions get a rank.
function rankSessions(sessions) {
	const sorted = [...sessions].sort((a, b) => {
		if (a.successful !== b.successful) {
			return a.successful ? -1 : 1;
		}
		return a.minutesToSolve - b.minutesToSolve;
	});
	return sorted.map((session, index) => ({
		...session,
		rank: session.successful ? index + 1 : null,
	}));
}

// 55.733 -> "55:44"
function formatDuration(minutes) {
	const totalSeconds = Math.round(minutes * 60);
	const mins = Math.floor(totalSeconds / 60);
	const secs = String(totalSeconds % 60).padStart(2, '0');
	return `${mins}:${secs}`;
}

function Leaderboard({ rooms, roomsLoading, roomsError }) {
	const [sessions, setSessions] = useState([]);
	const [loadingSessions, setLoadingSessions] = useState(true);
	const [sessionsError, setSessionsError] = useState(null);
	const [sessionFilter, setSessionFilter] = useState(ALL);
	const [roomFilter, setRoomFilter] = useState(ALL);

	useEffect(() => {
		async function loadSessions() {
			try {
				const response = await fetch('http://localhost:8080/sessions');
				if (!response.ok) {
					throw new Error(`Server responded with ${response.status}`);
				}
				const data = await response.json();
				setSessions(data);
				setLoadingSessions(false);
			} catch (err) {
				setSessionsError(err.message);
				setLoadingSessions(false);
			}
		}

		loadSessions();
	}, []);

	const loading = loadingSessions || roomsLoading;
	const error = sessionsError || roomsError;

	// Sessions only refer to their room by id, so look up the name
	function getRoomName(roomId) {
		const room = rooms.find(room => room.id === roomId);
		return room ? room.name : 'Unknown room';
	}

	// Filter by room first so ranks are relative to what's being shown
	const inRoom =
		roomFilter === ALL
			? sessions
			: sessions.filter(session => session.roomId === Number(roomFilter));
	const ranked = rankSessions(inRoom);
	const visibleSessions =
		sessionFilter === TOP
			? ranked.filter(session => session.successful).slice(0, TOP_COUNT)
			: ranked;

	return (
		<section>
			<h1>Leaderboard</h1>
			<p className="page-intro">
				The fastest teams to break out. (Everyone else is still in there.)
			</p>

			<div className="filters">
				<label>
					Sessions
					<select
						value={sessionFilter}
						onChange={event => setSessionFilter(event.target.value)}
					>
						<option value={ALL}>All</option>
						<option value={TOP}>Top {TOP_COUNT}</option>
					</select>
				</label>
				<label>
					Room
					<select
						value={roomFilter}
						onChange={event => setRoomFilter(event.target.value)}
					>
						<option value={ALL}>All rooms</option>
						{rooms.map(room => (
							<option key={room.id} value={room.id}>
								{room.name}
							</option>
						))}
					</select>
				</label>
			</div>

			{loading && <Loading what="the leaderboard" />}
			{error && <ErrorMessage what="the leaderboard" error={error} />}
			{!loading && !error && sessions.length === 0 && (
				<p className="status-message">No sessions recorded yet.</p>
			)}
			{sessions.length > 0 && visibleSessions.length === 0 && (
				<p className="status-message">
					No sessions match these filters.
				</p>
			)}

			{visibleSessions.length > 0 && (
				<div className="table-wrap">
					<table className="leaderboard">
						<thead>
							<tr>
								<th scope="col">Rank</th>
								<th scope="col">Team</th>
								<th scope="col">Room</th>
								<th scope="col" className="numeric">
									Time
								</th>
								<th scope="col">Result</th>
							</tr>
						</thead>
						<tbody>
							{visibleSessions.map(session => (
								<tr key={session.id}>
									<td className="rank">
										{session.rank ?? '–'}
									</td>
									<td className="team">{session.teamName}</td>
									<td>{getRoomName(session.roomId)}</td>
									<td className="numeric">
										{formatDuration(session.minutesToSolve)}
									</td>
									<td>
										<span
											className={
												session.successful
													? 'badge badge-success'
													: 'badge badge-failure'
											}
										>
											{session.successful
												? 'Escaped'
												: 'Trapped'}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}

export default Leaderboard;
