import LandingPageHeader from "../../components/LandingPageHeader/LandingPageHeader";
import gantt from "../../assets/roadmap.png";
import "./LandingPage.scss";

function LandingPage() {
  return (
    <div className="landing-page">
      <LandingPageHeader />
      <div className="lp__ctnr">
        <div className="title__ctnr">
          <h1 className="title">
            The customizable work hub solution for your small businesses
          </h1>
          <h2 className="subtitle">
            Streamline all business operations within one platform to make
            strategic decisions with confidence
          </h2>
          <button className="get-started__btn">Get Started</button>
        </div>
        <div>
          <div className="img-wrapper">
            <img
              src={gantt}
              className="gantt"
              alt="blurred gantt chart example from wrkflw"
            />
          </div>
          <h3>Which industry do you work in?</h3>
          <div>Healthcare, Construction, fdsjkljf</div>
          <button className="view-more__btn">View More</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
