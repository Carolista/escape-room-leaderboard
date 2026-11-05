function About() {
	return (
		<section>
			<h1>About Us</h1>
			<div className="about-grid">
				<div>
					<p>
						Escape Artists opened in a restored brick building in
						the heart of St. Louis with a simple idea: the best
						puzzles are the ones that feel like your day job, only
						with a countdown clock.
					</p>
					<p>
						Every room is built around the everyday disasters of
						software teams, from the merge conflict that won't
						resolve to the meeting that won't end. Gather your team,
						split up the clues, and find the way out before time
						runs out.
					</p>
					<p>
						Every session is timed and recorded, and the fastest
						teams earn a place on our leaderboard. Bragging rights
						are permanent.
					</p>
				</div>
				<img
					src="/images/escape-artists-storefront.png"
					alt="Two players leaving the Escape Artists storefront"
					className="about-image"
				/>
			</div>
		</section>
	);
}

export default About;
