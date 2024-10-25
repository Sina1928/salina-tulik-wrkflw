import { useState } from "react";
import "./DashboardPage.scss";
import { useCompany, useLogin } from "@/contexts/LoginContext";
import axios from "axios";
import { BarChart } from "recharts";

function DashboardPage() {
  const { user } = useLogin();
  const { company, allCompanies, switchCompany, multipleCompanies } =
    useCompany();
  return (
    <div>
      DashboardPage
      <div>
        {user}
        {company}
        {allCompanies}
        {switchCompany}
        {multipleCompanies}
      </div>
    </div>
  );
}

export default DashboardPage;
