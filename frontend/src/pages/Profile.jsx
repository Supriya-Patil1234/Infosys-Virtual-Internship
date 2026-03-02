// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// export default function Profile() {

//   // demo user data (later from database)
//   const user = {
//     name: "Supriya Patil",
//     email: "supriya@example.com",
//     role: "User",
//     filesUploaded: 12,
//     transcriptsGenerated: 10
//   };

//   return (

//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <div className="flex-1 p-8">

//           <h1 className="text-3xl font-bold mb-6">
//             Profile
//           </h1>

//           {/* Profile Card */}
//           <div className="bg-white shadow-md rounded-xl p-6 mb-6 max-w-xl">

//             <h2 className="text-xl font-semibold mb-4 text-indigo-600">
//               Account Information
//             </h2>

//             <p className="mb-2">
//               <span className="font-medium">Name:</span> {user.name}
//             </p>

//             <p className="mb-2">
//               <span className="font-medium">Email:</span> {user.email}
//             </p>

//             <p>
//               <span className="font-medium">Role:</span> {user.role}
//             </p>

//             <button className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700">
//               Edit Profile
//             </button>

//           </div>

//           {/* Stats */}
//           <div className="grid md:grid-cols-2 gap-6 max-w-xl">

//             <StatCard
//               title="Files Uploaded"
//               value={user.filesUploaded}
//             />

//             <StatCard
//               title="Transcripts Generated"
//               value={user.transcriptsGenerated}
//             />

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }

// function StatCard({ title, value }) {

//   return (

//     <div className="bg-white shadow-md rounded-xl p-6">

//       <h3 className="text-gray-600">
//         {title}
//       </h3>

//       <p className="text-2xl font-bold text-indigo-600 mt-2">
//         {value}
//       </p>

//     </div>

//   );

// }




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