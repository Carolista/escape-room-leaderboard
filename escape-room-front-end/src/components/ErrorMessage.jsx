function ErrorMessage({ what, error }) {
	return (
		<p className="status-message status-error">
			Couldn't load {what} ({error}). Is the back end running?
		</p>
	);
}

export default ErrorMessage;
