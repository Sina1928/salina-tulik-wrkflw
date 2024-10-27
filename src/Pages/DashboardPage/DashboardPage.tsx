import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.scss";
import { useAuth } from "@/contexts/BaseAuthContext";
// import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardPage() {
  const navigate = useNavigate();

  const { user, company, loading, logout } = useAuth();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (company?.themeColor) {
      document.documentElement.style.setProperty(
        "--company-theme",
        company.themeColor
      );
    }

    return () => {
      document.documentElement.style.removeProperty("--company-theme");
    };
  }, [company?.themeColor]);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="dashboard__loading">Loading...</div>;
  }

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      logout();
      navigate("/");
    } catch (err) {
      console.error("Error logging out", err);
    }
  };
  //   const {
  //     company,
  //     allCompanies,
  //     switchCompany,
  //     multipleCompanies,
  //   }: {
  //     company: Company;
  //     allCompanies: Company[];
  //     switchCompany: (companyId: number) => Promise<void>;
  //     multipleCompanies: boolean;
  //   } = useCompany();

  //   useEffect(() => {
  //     console.log("User Data:", user);
  //     console.log("Company Data:", company);
  //     console.log("All Companies:", allCompanies);
  //   }, [user, company, allCompanies]);

  //   const handleCompanySwitch = async (companyId: number): Promise<void> => {
  //     try {
  //       await switchCompany(companyId);
  //     } catch (err) {
  //       console.error("Error switching company: ", err);
  //     }
  //   };

  //   if (!user || !company) {
  //     return <div>No user or company data available</div>;
  //   }

  //   if (error) {
  //     return <div>Error</div>;
  //   }
  console.log(user);
  console.log(company);
  console.log(company?.componentIds);

  const hasInvoicing = company?.componentIds?.includes(1);
  const hasDocumentManagement = company?.componentIds?.includes(2);
  const hasSafetyCompliance = company?.componentIds?.includes(3);
  const hasTimeTracking = company?.componentIds?.includes(4);
  const hasPayroll = company?.componentIds?.includes(5);
  const hasProjectManagement = company?.componentIds?.includes(6);
  const hasMarketingTools = company?.componentIds?.includes(7);
  const hasBookingSystem = company?.componentIds?.includes(8);
  const hasInventoryManagement = company?.componentIds?.includes(9);
  const hasClientRelationshipManagement = company?.componentIds?.includes(10);

  console.log(hasProjectManagement);

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="header__content">
          <div className="header_text">
            <h1>Welcome, {user?.firstName}</h1>
            <p>{company?.name} Dashboard</p>
            <div className="profile__avatar">
              {" "}
              {company?.logoUrl && (
                <img
                  src={`http://localhost:8080/${company.logoUrl}`}
                  alt={company.name}
                  className="company-logo"
                />
              )}
            </div>
            <button type="button" onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            {/* {multipleCompanies} */}
          </div>
        </div>
      </header>
      <div className="dashboard__grid">
        <Card className="dashboard__card">
          <CardHeader>
            <CardTitle className="card__title">User Profile</CardTitle>
            <CardContent>
              <p className="card__text">
                Name: {user?.firstName}
                {company?.componentIds}
              </p>
            </CardContent>
          </CardHeader>
        </Card>

        {hasInvoicing && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">Invoicing</CardTitle>
              <CardContent>
                <p className="card__text">Accounts Payable</p>
                <p className="card__text">Accounts Receivable</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}

        {hasDocumentManagement && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">Document Management</CardTitle>
              <CardContent>
                <p className="card__text">Available Storage</p>
                <p className="card__text">Outstanding Contracts</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}

        {hasSafetyCompliance && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">Safety Compliance</CardTitle>
              <CardContent>
                <p className="card__text">Due Dates</p>
                <p className="card__text">Outstanding Documents</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}

        {hasTimeTracking && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">Time Tracking</CardTitle>
              <CardContent>
                <p className="card__text">Total Logged Hours</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}

        {hasPayroll && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">Payroll</CardTitle>
              <CardContent>
                <p className="card__text">Payroll Submission Date</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}

        {hasProjectManagement && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">Project Management</CardTitle>
              <CardContent>
                <p className="card__text">Open Projects</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}

        {hasMarketingTools && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">Marketing Tools</CardTitle>
              <CardContent>
                <p className="card__text">Previous Post Reach</p>
                <p className="card__text">Previous Post Engagement</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}

        {hasBookingSystem && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">Bookings</CardTitle>
              <CardContent>
                <p className="card__text">Today's Appointments</p>
                <p className="card__text">Upcoming Appointments</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}

        {hasInventoryManagement && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">
                Inventory Management
              </CardTitle>
              <CardContent>
                <p className="card__text">Outgoing Orders</p>
                <p className="card__text">Incoming Orders</p>
                <p className="card__text">Low Stock</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}

        {hasClientRelationshipManagement && (
          <Card className="dashboard__card">
            <CardHeader>
              <CardTitle className="card__title">
                Client Relationship Management (CRM)
              </CardTitle>
              <CardContent>
                <p className="card__text">Outgoing Orders</p>
                <p className="card__text">Incoming Orders</p>
                <p className="card__text">Low Stock</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}
        {/* <div className="company__switcher">
          {allCompanies.map((company: Company) => (
            <button
              key={company.id}
              onClick={() => handleCompanySwitch(company.id)}
            ></button>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default DashboardPage;
