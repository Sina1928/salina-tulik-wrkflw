import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1 className="error-title">404</h1>
      <p className="error-subtitle">
        Oops! That page might have gotten lost. Sorry for the inconvenience.
      </p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
