import { Link } from 'react-router';

function NotFound() {
	return (
		<section className="not-found">
			<h1>404</h1>
			<p>This page has escaped.</p>
			<Link to="/" className="button">
				Back to Home
			</Link>
		</section>
	);
}

export default NotFound;
