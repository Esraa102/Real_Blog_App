import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UpdateProfile, Sidebar, Profile, Posts } from "../components";

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
    <section className="container mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="flex gap-6">
        {/* Sidebar */}
        <Sidebar tab={tab} />
        {/* Main */}
        <div className="dashboard-main">
          {tab === "profile-update" && <UpdateProfile />}
          {tab === "profile" && <Profile />}
          {tab === "posts" && <Posts />}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
