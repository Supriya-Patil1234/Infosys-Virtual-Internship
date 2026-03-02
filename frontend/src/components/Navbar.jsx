// import { Link } from "react-router-dom";
// import { MicrophoneIcon } from "@heroicons/react/24/solid";

// export default function Navbar() {
//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-50">

//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <MicrophoneIcon className="h-7 w-7 text-indigo-600"/>
//           <span className="text-xl font-bold text-gray-900">
//             TranscribeFlow AI+
//           </span>
//         </div>

//         {/* Center Nav */}
//         <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">

//           <Link to="/" className="hover:text-indigo-600 transition">
//             Features
//           </Link>

//           <Link to="/dashboard" className="hover:text-indigo-600 transition">
//             Dashboard
//           </Link>

//           <Link to="/about" className="hover:text-indigo-600 transition">
//             About
//           </Link>

//         </nav>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">

//           <Link
//             to="/login"
//             className="text-gray-600 hover:text-indigo-600 font-medium"
//           >
//             Login
//           </Link>

//           <Link to="/signup">
//             <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 shadow-sm">
//               Get Started
//             </button>
//           </Link>

//         </div>

//       </div>

//     </header>
//   );
// }



// import { Link } from "react-router-dom";
// import { MicrophoneIcon } from "@heroicons/react/24/solid";

// export default function Navbar() {

//   return (

//     <header className="bg-indigo-600 sticky top-0 z-50 shadow-md">

//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <div className="flex items-center gap-2">

//           <MicrophoneIcon className="h-7 w-7 text-white"/>

//           <span className="text-xl font-bold text-white">
//             TranscribeFlow AI+
//           </span>

//         </div>

//         {/* Center Links */}
//         <nav className="hidden md:flex items-center gap-8 text-white font-medium">

//           <Link to="/" className="hover:text-indigo-200 transition">
//             Features
//           </Link>

//           <Link to="/dashboard" className="hover:text-indigo-200 transition">
//             Dashboard
//           </Link>

//           <Link to="/about" className="hover:text-indigo-200 transition">
//             About
//           </Link>

//         </nav>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">

//           <Link
//             to="/login"
//             className="text-white hover:text-indigo-200 font-medium"
//           >
//             Login
//           </Link>

//           <Link to="/signup">

//             <button className="bg-white text-indigo-600 px-5 py-2 rounded-lg hover:bg-gray-100 font-semibold">

//               Get Started

//             </button>

//           </Link>

//         </div>

//       </div>

//     </header>

//   );

// }





// import { Link, useNavigate } from "react-router-dom";
// import { MicrophoneIcon } from "@heroicons/react/24/solid";

// export default function Navbar() {

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (

//     <header className="bg-indigo-600 sticky top-0 z-50 shadow-md">

//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <div className="flex items-center gap-2">

//           <MicrophoneIcon className="h-7 w-7 text-white"/>

//           <span className="text-xl font-bold text-white">
//             TranscribeFlow AI+
//           </span>

//         </div>

//         {/* Center Links */}
//         {token && (
//           <nav className="hidden md:flex items-center gap-8 text-white font-medium">

//             <Link to="/dashboard" className="hover:text-indigo-200 transition">
//               Dashboard
//             </Link>

//             <Link to="/upload" className="hover:text-indigo-200 transition">
//               Upload
//             </Link>

//             <Link to="/history" className="hover:text-indigo-200 transition">
//               History
//             </Link>

//             <Link to="/profile" className="hover:text-indigo-200 transition">
//               Profile
//             </Link>

//           </nav>
//         )}

//         {/* Right Side */}
//         <div className="flex items-center gap-4">

//           {!token ? (
//             <>
//               <Link
//                 to="/login"
//                 className="text-white hover:text-indigo-200 font-medium"
//               >
//                 Login
//               </Link>

//               <Link to="/register">
//                 <button className="bg-white text-indigo-600 px-5 py-2 rounded-lg hover:bg-gray-100 font-semibold">
//                   Get Started
//                 </button>
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="bg-white text-indigo-600 px-5 py-2 rounded-lg hover:bg-gray-100 font-semibold"
//             >
//               Logout
//             </button>
//           )}

//         </div>

//       </div>

//     </header>

//   );

// }






import { Link, useNavigate, useLocation } from "react-router-dom";
import { MicrophoneIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]); // refresh on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <header className="bg-indigo-600 sticky top-0 z-50 shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <MicrophoneIcon className="h-7 w-7 text-white"/>
          <span className="text-xl font-bold text-white">
            TranscribeFlow AI+
          </span>
        </div>


         {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 relative">

          {!token ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-indigo-600 px-5 py-2 rounded-lg hover:bg-gray-100 font-semibold"
            >
              Sign Up
            </button>
          ) : (
            <>
              <UserCircleIcon
                className="h-9 w-9 text-white cursor-pointer"
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg w-40">
                  
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Account
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>

                </div>
              )}
            </>
          )}

        </div>

      </div>

    </header>
  );
}