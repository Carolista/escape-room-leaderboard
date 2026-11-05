import { Link, NavLink } from 'react-router';

const navItems = [
	{ to: '/', label: 'Home' },
	{ to: '/about', label: 'About' },
	{ to: '/rooms', label: 'Rooms' },
	{ to: '/leaderboard', label: 'Leaderboard' },
];

function Header() {
	return (
		<header className="site-header">
			<div className="container header-inner">
				<Link to="/" className="brand">
					<img
						src="/building-lock.svg"
						alt=""
						className="brand-logo"
					/>
					<span className="brand-name">Escape Artists</span>
				</Link>
				<nav aria-label="Main">
					<ul className="nav-list">
						{navItems.map(item => (
							<li key={item.to}>
								<NavLink
									to={item.to}
									// "end" keeps Home from matching every route
									end={item.to === '/'}
									className={({ isActive }) =>
										isActive
											? 'nav-link nav-link-active'
											: 'nav-link'
									}
								>
									{item.label}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
