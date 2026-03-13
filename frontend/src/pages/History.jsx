import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {

  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setRecords(data);
      })
      .catch(() => {
        alert("Failed to load history");
      });

  }, []);

  const openRecord = (record) => {
    localStorage.setItem("transcript", record.transcript);
    localStorage.setItem("summary", record.summary);
    localStorage.setItem("filename", record.filename);
    localStorage.setItem("record_id", record.id);
    navigate("/results");
  };

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8 max-w-5xl">

          <h1 className="text-3xl font-bold mb-6">
            Your History
          </h1>

          {records.length === 0 ? (
            <div className="bg-white shadow rounded-xl p-6 text-gray-500">
              No transcripts found.
            </div>
          ) : (
            <div className="space-y-4">

              {records.map(record => (

                <div
                  key={record.id}
                  onClick={() => openRecord(record)}
                  className="bg-white shadow rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
                >

                  <div className="flex justify-between mb-2">

                    <h2 className="font-semibold text-lg">
                      {record.filename}
                    </h2>

                    <span className="text-sm text-gray-400">
                      ID: {record.id}
                    </span>

                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {record.summary || "No summary generated yet."}
                  </p>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

    </div>

  );

}