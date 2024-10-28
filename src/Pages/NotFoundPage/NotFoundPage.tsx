import { Link } from "react-router-dom";
import LandingPageHeader from "@/components/LandingPageHeader/LandingPageHeader";
import "./NotFoundPage.scss";

function NotFoundPage() {
  return (
    <div className="not-found">
      <LandingPageHeader />
      <h1 className="error-title">404</h1>
      <p className="error-subtitle">
        Oops! That page might have gotten lost. Sorry for the inconvenience.
      </p>
      <Link to="/" className="back-home__btn">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
