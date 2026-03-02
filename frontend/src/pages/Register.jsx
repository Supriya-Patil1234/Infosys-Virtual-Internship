// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       await axios.post("http://127.0.0.1:8000/register", null, {
//         params: { username, password },
//       });

//       alert("Registration successful");
//       navigate("/login");
//     } catch (err) {
//       alert("User already exists");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow w-96">
//         <h2 className="text-2xl mb-6 font-bold text-center">Register</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full p-2 border mb-4"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleRegister}
//           className="w-full bg-green-600 text-white p-2 rounded"
//         >
//           Register
//         </button>

//         <p className="text-center mt-4 text-sm">
//   Already have an account?{" "}
//   <a href="/login" className="text-indigo-600 font-semibold">
//     Login
//   </a>
// </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/register", {
        username: username,
        password: password
      });

      alert("Registration successful");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl mb-6 font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}