function Footer() {
	return (
		<footer className="site-footer">
			<div className="container footer-inner">
				<div className="footer-brand">
					<img
						src="/building-lock.svg"
						alt=""
						className="footer-logo"
					/>
					<strong>Escape Artists</strong>
				</div>
				<p>
					&copy; {new Date().getFullYear()} Escape Artists. A
					fictional business for teaching purposes.
				</p>
			</div>
		</footer>
	);
}

export default Footer;
