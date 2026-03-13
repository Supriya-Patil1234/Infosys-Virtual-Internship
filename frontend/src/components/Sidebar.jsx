import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  const menu = [
    { name: "Overview", path: "/dashboard" },
    { name: "Upload Audio", path: "/upload" },
    { name: "History", path: "/history" },
    { name: "Chat", path: "/chat" },
    { name: "Profile", path: "/profile" },
  ];

  return (

    <div className="w-64 bg-white border-r min-h-screen p-6">

      <h2 className="text-xl font-bold mb-6 text-indigo-600">
        TranscribeFlow
      </h2>

      <nav className="flex flex-col gap-2">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-indigo-100 text-indigo-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>

        ))}

      </nav>

    </div>

  );

}