import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Results() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const transcript = localStorage.getItem("transcript");
  const summary = localStorage.getItem("summary");
  const filename = localStorage.getItem("filename");

  // 🔐 Protect page
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  // -------- COPY --------
  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    alert("Copied");
  };

  // -------- DOWNLOAD JSON --------
  const downloadJSON = () => {

    const data = {
      filename: filename,
      transcript: transcript,
      summary: summary || "",
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription_result.json";
    a.click();
  };

  const downloadTXT = () => {

  const textContent = `
File: ${filename}

----- TRANSCRIPT -----

${transcript}


----- SUMMARY -----

${summary || localStorage.getItem("summary") || ""}

Generated At: ${new Date().toISOString()}
`;

  const blob = new Blob([textContent], { type: "text/plain" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "transcription_result.txt";
  a.click();
};

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8 max-w-4xl">

          <h1 className="text-3xl font-bold mb-1">
            Transcription Result
          </h1>

          <p className="text-gray-500 mb-6">
            AI-generated transcript using Whisper + T5
          </p>

          {/* File Info */}
          <div className="bg-white shadow rounded-xl p-4 mb-6 flex justify-between">

            <div>
              <p className="text-gray-500 text-sm">File</p>
              <p className="font-medium">{filename}</p>
            </div>

            <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
              AI Generated
            </span>

          </div>

          {/* Transcript */}
          <div className="bg-white shadow rounded-xl p-6 mb-6">

            <div className="flex justify-between mb-4">

              <h2 className="font-semibold text-lg">
                Transcript
              </h2>

              <div className="space-x-2">

                <div className="space-x-2">
                  
                <button
                  onClick={copyTranscript}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Copy
                </button>
                  
                <button
                  onClick={downloadTXT}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Download TXT
                </button>
                  
                <button
                  onClick={downloadJSON}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                  Download JSON
                </button>
                  
                </div>
                  
              </div>

            </div>

            <div className="bg-gray-100 p-4 rounded whitespace-pre-line">
              {transcript}
            </div>

          </div>


          {/* Summary */}
          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="font-semibold text-lg mb-4">
              AI Summary
            </h2>

            <div className="bg-gray-100 p-4 rounded whitespace-pre-line">
              {summary || "No summary generated."}
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}
