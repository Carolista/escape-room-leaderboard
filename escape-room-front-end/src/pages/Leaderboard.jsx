import { useState } from 'react';
import sessions from '../mock-data/sessions.json';
import rooms from '../mock-data/rooms.json';

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

function Leaderboard() {
    const [sessionFilter, setSessionFilter] = useState(ALL);
	const [roomFilter, setRoomFilter] = useState(ALL);
    
    // TODO 6: Sessions only matter to this page, so this is where they should be
    //  fetched (rooms get lifted up to App later; see TODO 9). Replace the mock data
    //  import with a request to your back end's /sessions endpoint. Think about:
    //  - What do you need to hold in state, and what should it start as before
    //    the response arrives?
    //  - When should the request happen, and how many times? Which React hook is
    //    designed for that, and what should you give it as a dependency array?
    //  - fetch() doesn't throw on a 404 or 500. How will you know the request
    //    actually succeeded before you use the response?
    //  - How should you handle the JSON in the response?
    //  Check the Network tab in your browser's dev tools to see what's happening.
    
    // TODO 15: Once App is passing rooms down (TODO 9-10), remove this import and
    //  receive them as props instead, just like on the other pages.
    
	// TODO 16: By now this page depends on two different data sources: sessions
	//  (fetched here) and rooms (fetched in App). The page is only ready when
	//  both are. How can you combine their loading statuses into one
	//  value for the page? And their errors? Use those combined values with
	//  TODO 7 and TODO 8 below.

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
				The fastest teams to break out. (Everyone else is still in
				there.)
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

			{/* TODO 7: Show the Loading component while sessions are being
			fetched. Check what props it needs. */}
			{/* TODO 8: Show the ErrorMessage component if the request
			fails. Check what props it needs, and which of your state values
			holds what it needs to display. Then try it out: stop the back end
			and reload the page. After that, take a second look at the "No
			sessions recorded yet" message below. When would it be misleading
			to show it? */}
			{sessions.length === 0 && (
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
										{session.rank ?? '—'}
									</td>
									<td className="team">{session.teamName}</td>
									<td className="room">
										{getRoomName(session.roomId)}
									</td>
									<td className="numeric">
										{formatDuration(session.minutesToSolve)}
									</td>
									<td className="result">
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
