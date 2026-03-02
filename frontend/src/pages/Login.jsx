// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/login", null, {
//         params: { username, password },
//       });

//       localStorage.setItem("token", res.data.access_token);
//       navigate("/dashboard");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow w-96">
//         <h2 className="text-2xl mb-6 font-bold text-center">Login</h2>

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
//           onClick={handleLogin}
//           className="w-full bg-purple-600 text-white p-2 rounded"
//         >
//           Login
//         </button>

//         <p className="text-center mt-4 text-sm">
//   Don't have an account?{" "}
//   <a href="/register" className="text-indigo-600 font-semibold">
//     Register
//   </a>
// </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/login", {
        username: username,
        password: password,
      });

      localStorage.setItem("token", res.data.access_token);

      alert("Login successful");
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl mb-6 font-bold text-center">Login</h2>

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
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}