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
  return (
    <div>
      <div className="header__content">
        {company?.logoUrl && (
          <img
            src={`http://localhost:8080/${company.logoUrl}`}
            alt={company.name}
            className="company-logo"
          />
        )}
      </div>
      <div>
        <h1>Welcome, {user?.firstName}</h1>
        <p>{company?.name} Dashboard</p>
        <button type="button" onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        {/* {multipleCompanies} */}
      </div>
      <div className="dashboard__grid">
        <Card className="dashboard__card">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardContent>
              <p>Name: {user?.firstName}</p>
              {/* {user?.} */}
            </CardContent>
          </CardHeader>
        </Card>

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
