import LandingPageHeader from "../../components/LandingPageHeader/LandingPageHeader";
import dashboard from "../../assets/images/wrkflw-dashboard-example.png";
import "./LandingPage.scss";
import {
  FileText,
  Landmark,
  Share2,
  ShieldPlus,
  Clock,
  HandCoins,
  ChartGantt,
  CalendarDays,
  ScanBarcode,
  UserRoundCheck,
} from "lucide-react";

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
        <div className="main-content">
          <section className="wrkflw-features">
            <h3>Built Around Your Business</h3>
            <h4>
              Wrkflw adapts to your industry, offering only the tools you need:{" "}
            </h4>
            <div className="feature__card">
              <p className="feature__title">Smart Industry Matching</p>
              <p className="feature__description">
                Select your industry and get instant recommendations for
                essential tools.
              </p>
            </div>
            <div className="feature__card">
              <p className="feature__title">Smart Industry Matching</p>
              <p className="feature__description">
                Select your industry and get instant recommendations for
                essential tools.
              </p>
            </div>
            <div className="feature__card">
              <p className="feature__title">Customizable Dashboard</p>
              <p className="feature__description">
                Choose the features that matter most to your business.
              </p>
            </div>
            <div className="feature__card">
              <p className="feature__title">Brand-Aligned Interface</p>
              <p className="feature__description">
                Your workspace reflects your brand with custom theming and logo
                integration.
              </p>
            </div>
          </section>

          <div className="img-wrapper">
            <img
              src={dashboard}
              className="dashboard__img"
              alt="blurred dashboard example from wrkflw"
            />
          </div>

          <p className="components">Our Features</p>
          <section className="components-section">
            <div className="component">
              {" "}
              <p className="component-title">
                <Landmark /> Invoicing & Finance
              </p>
              <p className="component-desc">
                Streamline your financial operations with integrated invoicing,
                payment tracking, and financial reporting.
              </p>
            </div>

            <div className="component">
              <p className="component-title">
                {" "}
                <FileText />
                Document Management
              </p>
              <p className="component-desc">
                Keep all your important files organized, accessible, and secure
                in one central location.
              </p>
            </div>

            <div className="component">
              <p className="component-title">
                {" "}
                <ShieldPlus />
                Safety Compliance
              </p>
              <p className="component-desc">
                Stay compliant with automated safety protocol tracking and
                documentation management.
              </p>
            </div>

            <div className="component">
              <p className="component-title">
                {" "}
                <Clock />
                Time Tracking
              </p>
              <p className="component-desc">
                Monitor project hours, employee time, and productivity with
                intuitive tracking tools.
              </p>
            </div>

            <div className="component">
              <p className="component-title">
                {" "}
                <HandCoins />
                Payroll Management
              </p>
              <p className="component-desc">
                Expand your reach with integrated marketing and campaign
                management features.
              </p>
            </div>

            <div className="component">
              <p className="component-title">
                {" "}
                <ChartGantt />
                Project Management
              </p>
              <p className="component-desc">
                Keep your projects on track with comprehensive planning and
                tracking tools.
              </p>
            </div>

            <div className="component">
              <p className="component-title">
                {" "}
                <Share2 />
                Marketing Tools
              </p>
              <p className="component-desc">
                Expand your reach with integrated marketing and campaign
                management features.
              </p>
            </div>

            <div className="component">
              <p className="component-title">
                {" "}
                <CalendarDays />
                Booking System
              </p>
              <p className="component-desc">
                Manage appointments and schedules effortlessly with our
                automated booking system.
              </p>
            </div>

            <div className="component">
              <p className="component-title">
                {" "}
                <ScanBarcode />
                Inventory Managment
              </p>
              <p className="component-desc">
                Track stock levels and manage supply chains with real-time
                inventory monitoring.
              </p>
            </div>

            <div className="component">
              <p className="component-title">
                {" "}
                <UserRoundCheck />
                Client Relationship Management (CRM)
              </p>
              <p className="component-desc">
                Build stronger client relationships with our integrated CRM
                system.
              </p>
            </div>
          </section>
          <section className="why-wrkflw">
            <p className="why-header">Experience the Difference</p>
            <ul>
              <li>
                Industry-Specific: Tools and features tailored to your business
                sector{" "}
              </li>
              <li>Unified Platform: All your essential tools in one place</li>
              <li>
                Simple Setup: Get started in minutes with our guided onboarding
              </li>
              <li>Custom Branding: Your workspace, your brand</li>
              <li>Scalable Solution: Grows with your business needs</li>
            </ul>
          </section>
          <section className="wrkflw-pricing">
            <p>Transparent Pricing</p>
            <p>Start Free! Scale as You Grow</p>
            <p>Only pay for the components you need</p>
            <p>Starting as low as $25/month</p>
          </section>
          <section className="wrkflw-cta">
            <p className="cta-text">
              Join thousands of businesses already transforming their business
              operations with Wrkflw.
            </p>{" "}
            <button className="get-started__btn">Get Started</button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
