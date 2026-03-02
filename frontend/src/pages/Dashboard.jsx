import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  // 🔐 PROTECT DASHBOARD
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

          <h1 className="text-3xl font-bold mb-6">
            Welcome Back
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            <Card title="Files Uploaded" value="12" />
            <Card title="Transcripts Generated" value="10" />
            <Card title="Summaries Created" value="10" />

          </div>

        </div>

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>
      <p className="text-3xl font-bold text-indigo-600 mt-2">
        {value}
      </p>
    </div>
  );
}