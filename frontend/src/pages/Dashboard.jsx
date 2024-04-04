import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Profile, Sidebar } from "../components";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
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
        <div className="dashboard-main">{tab === "profile" && <Profile />}</div>
      </div>
    </section>
  );
};

export default Dashboard;
