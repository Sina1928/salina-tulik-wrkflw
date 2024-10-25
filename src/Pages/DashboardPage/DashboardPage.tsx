// import { useState } from "react";
import "./DashboardPage.scss";
import { User, Company } from "@/contexts/BaseAuthContext";
import { useCompany, useLogin } from "@/contexts/LoginContext";
// import axios from "axios";
// import { BarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardPage() {
  const { user, loading, error } = useLogin();
  const { company, allCompanies, switchCompany, multipleCompanies } =
    useCompany();

  const handleCompanySwitch = async (companyId: string) => {
    try {
      await switchCompany(companyId);
    } catch (err) {
      console.error("Error switching company: ", err);
    }
  };
  return (
    <div>
      DashboardPage
      <div>
        {user.first_name}
        {company.name}
        {allCompanies}
        {switchCompany}
        {multipleCompanies}
      </div>
      <div className="dashboard__grid">
        <Card className="dashboard__card">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardContent>{user.name}</CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
