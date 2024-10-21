import gantt from "./assets/roadmap.png";
import "./App.scss";
import LandingPageHeader from "./components/LandingPageHeader/LandingPageHeader";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div>
      <LandingPageHeader />
      <div className="container">
        <h1> A customizable work hub for small businesses</h1>
        <h2>
          Streamline all business operations within one platform to make
          strategic decisions with confidence
        </h2>
        <Button className="get-started__btn">Get Started</Button>
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
          <Button>View More</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
