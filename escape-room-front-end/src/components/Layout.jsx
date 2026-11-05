import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

function Layout() {
	return (
		<>
			<Header />
			<main className="container main-content">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default Layout;
