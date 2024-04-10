import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  UpdateProfile,
  Sidebar,
  Profile,
  DashboardPosts,
  AdminDashboard,
  Users,
} from "../components";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("profile");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);
  return (
    <section className="container min-h-screen mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="flex gap-6">
        {/* Sidebar */}
        <Sidebar tab={tab} />
        {/* Main */}
        <div className="dashboard-main">
          {tab === "profile-update" && <UpdateProfile />}
          {tab === "profile" && <Profile />}
          {tab === "posts" && <DashboardPosts />}
          {tab === "dashboard" && <AdminDashboard />}
          {tab === "users" && <Users />}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
