import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.scss";
import { useAuth } from "@/contexts/BaseAuthContext";
import {
  ChevronDown,
  LogOut,
  Settings,
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
  House,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";

function DashboardPage() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, company, allCompanies, loading, switchCompany, logout } =
    useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isProfileOpen]);

  const handleCompanySwitch = (companyId: number) => {
    switchCompany(companyId);
    setIsProfileOpen(false);
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      logout();
      navigate("/");
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

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

  const projectTasks = [
    {
      id: 1,
      project_name: "Project 1",
      task_name: "Task 1",
      status: "In Progress",
      due_date: 1730341807,
    },
    {
      id: 2,
      project_name: "Project 2",
      task_name: "Task 2",
      status: "In Progress",
      due_date: 1730601007,
    },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="header__content">
          <div className="header__text">
            <h1 className="header__title">Welcome, {user?.firstName}</h1>
            <p className="header__subtitle">{company?.name} Dashboard</p>
            <input
              type="search"
              placeholder="Search..."
              className="search-bar"
            />
            {/* <div className="profile-dropdown">
              <button
                className="profile-dropdown__trigger"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="profile__info">
                  {company?.logoUrl ? (
                    <img
                      src={`http://localhost:8080/${company.logoUrl}`}
                      alt={company.name}
                      className="company-logo"
                    />
                  ) : (
                    <div className="profile__avatar--default">
                      {company?.name?.[0] || "W"}
                    </div>
                  )}
                </div>
                <ChevronDown
                  className={`dropdown-arrow ${isProfileOpen ? "open" : ""}`}
                />
              </button>

              {isProfileOpen && (
                <div className="dropdown__content">
                  <div className="dropdown__user-info">
                    <p className="user-name">{user?.firstName}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>

                  {allCompanies.length > 1 && (
                    <div className="dropdown__companies">
                      <p className="dropdown__label">Switch Company</p>
                      {allCompanies.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleCompanySwitch(c.id)}
                          className={`company-option ${
                            c.id == company?.id ? "active" : ""
                          }`}
                        >
                          {c.logoUrl ? (
                            <img
                              src={`http://localhost:8080/${c.logoUrl}`}
                              alt={c.name}
                              className="profile__avatar"
                            />
                          ) : (
                            <div className="profile__avatar--default">
                              {c.name[0]}
                            </div>
                          )}

                          <span>{c.name}</span>
                          {c.id === company?.id && (
                            <span className="active-indicator">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="dropdown__actions">
                    <button type="button" className="action-btn">
                      <Settings />
                      Settings
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="action-btn"
                    >
                      <LogOut />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className="profile-dropdown" ref={dropdownRef}>
          <button
            className="profile-dropdown__trigger"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="profile__info">
              {company?.logoUrl ? (
                <img
                  src={`http://localhost:8080/${company.logoUrl}`}
                  alt={company.name}
                  className="company-logo"
                />
              ) : (
                <div className="profile__avatar--default">
                  {company?.name?.[0] || "W"}
                </div>
              )}
            </div>
            <ChevronDown
              className={`dropdown-arrow ${isProfileOpen ? "open" : ""}`}
            />
          </button>

          {isProfileOpen && (
            <>
              <div className="dropdown__content" role="menu">
                <div className="dropdown__user-info">
                  <p className="user-name">{user?.firstName}</p>
                  <p className="user-email">{user?.email}</p>
                </div>

                {allCompanies.length > 1 && (
                  <div className="dropdown__companies">
                    <p className="dropdown__label">Switch Company</p>
                    {allCompanies.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleCompanySwitch(c.id)}
                        className={`company-option ${
                          c.id == company?.id ? "active" : ""
                        }`}
                      >
                        {c.logoUrl ? (
                          <img
                            src={`http://localhost:8080/${c.logoUrl}`}
                            alt={c.name}
                            className="profile__avatar"
                          />
                        ) : (
                          <div className="profile__avatar--default">
                            {c.name[0]}
                          </div>
                        )}

                        <span className="company-option__name">{c.name}</span>
                        {c.id === company?.id && (
                          <span className="active-indicator">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <div className="dropdown__actions">
                  <button type="button" className="action-btn">
                    <Settings />
                    Settings
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="action-btn"
                  >
                    <LogOut />
                    Logout
                  </button>
                </div>
              </div>
              <div
                onClick={() => setIsProfileOpen(false)}
                className={`dropdown-overlay ${isProfileOpen ? "active" : ""}`}
              />
            </>
          )}
        </div>
      </header>

      <nav className="navbar">
        <div>
          <p className="nav-title">
            <House /> Home{" "}
          </p>
        </div>
        <div>
          {hasInvoicing && (
            <p className="nav-title">
              <Landmark /> Invoicing
            </p>
          )}
        </div>
        <div>
          {hasDocumentManagement && (
            <p className="nav-title">
              <FileText />
              Documents
            </p>
          )}
        </div>
        <div>
          {hasSafetyCompliance && (
            <p className="nav-title">
              <ShieldPlus />
              Safety
            </p>
          )}
        </div>
        <div>
          {" "}
          {hasTimeTracking && (
            <p className="nav-title">
              <Clock />
              Time
            </p>
          )}
        </div>
        <div>
          {hasPayroll && (
            <p className="nav-title">
              <HandCoins />
              Payroll
            </p>
          )}
        </div>
        <div>
          {hasProjectManagement && (
            <p className="nav-title">
              <ChartGantt />
              Projects
            </p>
          )}
        </div>
        <div>
          {" "}
          {hasMarketingTools && (
            <p className="nav-title">
              <Share2 />
              Marketing
            </p>
          )}
        </div>
        <div>
          {hasBookingSystem && (
            <p className="nav-title">
              <CalendarDays />
              Bookings
            </p>
          )}
        </div>
        <div>
          {hasInventoryManagement && (
            <p className="nav-title">
              <ScanBarcode />
              Inventory
            </p>
          )}
        </div>
        <div>
          {hasClientRelationshipManagement && (
            <p className="nav-title">
              <UserRoundCheck />
              CRM
            </p>
          )}
        </div>
      </nav>

      <div className="dashboard__grid">
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.project_name}</TableCell>
                        <TableCell>{task.task_name}</TableCell>
                        <TableCell>{task.status}</TableCell>
                        <TableCell>
                          {new Date(task.due_date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                <p className="card__text">Leads</p>
                <p className="card__text">Complaints</p>
              </CardContent>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
