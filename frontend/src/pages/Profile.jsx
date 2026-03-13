import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => alert("Failed to load profile"));

  }, []);

  if (!profile) return null;

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8 max-w-3xl">

          <h1 className="text-3xl font-bold mb-6">
            Profile
          </h1>

          <div className="bg-white shadow rounded-xl p-8 space-y-6">

            <div>
              <p className="text-gray-500 text-sm">Username</p>
              <p className="text-lg font-semibold">
                {profile.username}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Transcripts</p>
              <p className="text-lg font-semibold">
                {profile.transcript_count}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}