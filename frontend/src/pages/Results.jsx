// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// export default function Results() {

//   // temporary demo data (later comes from backend)
//   const transcript = `
//   Welcome everyone to today's meeting. We discussed the AI project timeline and key milestones. The development phase will begin next week.
//   `;

//   const summary = `
//   The meeting covered AI project milestones and confirmed the development phase starts next week.
//   `;

//   const keywords = ["AI Project", "Timeline", "Milestones", "Development"];

//   return (

//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <div className="flex-1 p-8">

//           <h1 className="text-3xl font-bold mb-6">
//             Results
//           </h1>

//           {/* Transcript */}
//           <Card title="Transcript">

//             <p className="text-gray-700 whitespace-pre-line">
//               {transcript}
//             </p>

//           </Card>

//           {/* Summary */}
//           <Card title="Summary">

//             <p className="text-gray-700">
//               {summary}
//             </p>

//           </Card>

//           {/* Keywords */}
//           <Card title="Keywords">

//             <div className="flex gap-2 flex-wrap">

//               {keywords.map((word, index) => (

//                 <span
//                   key={index}
//                   className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm"
//                 >
//                   {word}
//                 </span>

//               ))}

//             </div>

//           </Card>

//           {/* Chat Button */}
//           <div className="mt-6">

//             <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">

//               Chat with Transcript

//             </button>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }

// function Card({ title, children }) {

//   return (

//     <div className="bg-white shadow-md rounded-xl p-6 mb-6">

//       <h2 className="text-xl font-semibold mb-3 text-indigo-600">
//         {title}
//       </h2>

//       {children}

//     </div>

//   );

// }



// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// export default function Results() {

//   const transcript = localStorage.getItem("transcript");
//   const filename = localStorage.getItem("filename");

//   return (

//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <div className="flex-1 p-8">

//           <h1 className="text-3xl font-bold mb-6">
//             Transcription Result
//           </h1>

//           <div className="bg-white shadow-md rounded-xl p-6">

//             <p className="text-gray-500 mb-2">
//               File: {filename}
//             </p>

//             <div className="bg-gray-100 p-4 rounded-lg">

//               <p className="whitespace-pre-line">
//                 {transcript}
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }


// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";

// export default function Results() {

//   const transcript = localStorage.getItem("transcript");
//   const filename = localStorage.getItem("filename");

//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(transcript);
//     setCopied(true);

//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleDownload = () => {
//     const element = document.createElement("a");
//     const file = new Blob([transcript], { type: "text/plain" });
//     element.href = URL.createObjectURL(file);
//     element.download = "transcript.txt";
//     document.body.appendChild(element);
//     element.click();
//   };

//   return (

//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <div className="flex-1 p-8 max-w-5xl mx-auto">

//           {/* Header */}
//           <div className="mb-6">

//             <h1 className="text-3xl font-bold text-gray-800">
//               Transcription Result
//             </h1>

//             <p className="text-gray-500 mt-1">
//               AI-generated transcript using Whisper
//             </p>

//           </div>


//           {/* File Info Card */}
//           <div className="bg-white shadow-sm rounded-xl p-5 mb-6 border">

//             <div className="flex justify-between items-center">

//               <div>

//                 <p className="text-sm text-gray-500">File</p>

//                 <p className="font-semibold text-gray-800">
//                   {filename}
//                 </p>

//               </div>

//               <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
//                 AI Generated
//               </span>

//             </div>

//           </div>


//           {/* Transcript Card */}
//           <div className="bg-white shadow-sm rounded-xl p-6 border">

//             <div className="flex justify-between items-center mb-4">

//               <h2 className="text-lg font-semibold text-gray-800">
//                 Transcript
//               </h2>

//               <div className="flex gap-3">

//                 <button
//                   onClick={handleCopy}
//                   className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm"
//                 >
//                   {copied ? "Copied" : "Copy"}
//                 </button>

//                 <button
//                   onClick={handleDownload}
//                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
//                 >
//                   Download
//                 </button>

//               </div>

//             </div>


//             <div className="bg-gray-50 p-5 rounded-lg border max-h-96 overflow-y-auto">

//               <p className="whitespace-pre-line text-gray-700 leading-relaxed">
//                 {transcript}
//               </p>

//             </div>

//           </div>


//           {/* Summary Section (Next Step Ready) */}
//           <div className="bg-white shadow-sm rounded-xl p-6 border mt-6">

//             <div className="flex justify-between items-center mb-4">

//               <h2 className="text-lg font-semibold text-gray-800">
//                 AI Summary
//               </h2>

//               <button
//                 className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
//               >
//                 Generate Summary
//               </button>

//             </div>

//             <div className="bg-gray-50 p-5 rounded-lg border text-gray-400">

//               Summary will appear here...

//             </div>

//           </div>


//         </div>

//       </div>

//     </div>

//   );

// }



// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";

// export default function Results() {

//   const transcript = localStorage.getItem("transcript");
//   const filename = localStorage.getItem("filename");

//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);

//   const generateSummary = async () => {

//     setLoading(true);

//     try {

//       const res = await fetch("http://127.0.0.1:8000/summarize", {

//         method: "POST",

//         headers: {
//           "Content-Type": "application/json"
//         },

//         body: JSON.stringify({
//           text: transcript
//         })

//       });

//       const data = await res.json();

//       setSummary(data.summary);

//     } catch (error) {

//       alert("Summary failed");

//     }

//     setLoading(false);

//   };

//   const copyTranscript = () => {

//     navigator.clipboard.writeText(transcript);

//     alert("Copied");

//   };

//   const downloadTranscript = () => {

//     const blob = new Blob([transcript], { type: "text/plain" });

//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");

//     a.href = url;
//     a.download = filename + ".txt";

//     a.click();

//   };

//   const downloadJSON = () => {

//   const transcript = localStorage.getItem("transcript");
//   const summary = localStorage.getItem("summary");
//   const filename = localStorage.getItem("filename");

//   const data = {
//     filename: filename,
//     transcript: transcript,
//     summary: summary,
//     generatedAt: new Date().toISOString()
//   };

//   const blob = new Blob(
//     [JSON.stringify(data, null, 2)],
//     { type: "application/json" }
//   );

//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "transcription_result.json";
//   a.click();
// };

//   return (

//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <div className="flex-1 p-8 max-w-4xl">

//           <h1 className="text-3xl font-bold mb-1">
//             Transcription Result
//           </h1>

//           <p className="text-gray-500 mb-6">
//             AI-generated transcript using Whisper
//           </p>


//           {/* File card */}
//           <div className="bg-white shadow rounded-xl p-4 mb-6 flex justify-between">

//             <div>
//               <p className="text-gray-500 text-sm">File</p>
//               <p className="font-medium">{filename}</p>
//             </div>

//             <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
//               AI Generated
//             </span>

//           </div>


//           {/* Transcript card */}
//           <div className="bg-white shadow rounded-xl p-6 mb-6">

//             <div className="flex justify-between mb-4">

//               <h2 className="font-semibold text-lg">
//                 Transcript
//               </h2>

//               <div className="space-x-2">

//                 <button
//                   onClick={copyTranscript}
//                   className="px-3 py-1 bg-gray-200 rounded"
//                 >
//                   Copy
//                 </button>

//                 <button
//   onClick={downloadJSON}
//   className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
// >
//   Download JSON
// </button>

//               </div>

//             </div>

//             <div className="bg-gray-100 p-4 rounded whitespace-pre-line">
//               {transcript}
//             </div>

//           </div>


//           {/* Summary card */}
//           <div className="bg-white shadow rounded-xl p-6">

//             <div className="flex justify-between mb-4">

//               <h2 className="font-semibold text-lg">
//                 AI Summary
//               </h2>

//               <button
//                 onClick={generateSummary}
//                 disabled={loading}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//               >
//                 {loading ? "Generating..." : "Generate Summary"}
//               </button>

//             </div>

//             <div className="bg-gray-100 p-4 rounded">

//               {summary || "Summary will appear here..."}

//             </div>

//           </div>


//         </div>

//       </div>

//     </div>

//   );

// }











// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Results() {

//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const transcript = localStorage.getItem("transcript");
//   const filename = localStorage.getItem("filename");
//   const record_id = localStorage.getItem("record_id");

//   if (!token) {
//     alert("Please login first");
//     navigate("/login");
//   }

//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);

//   // -------- GENERATE & SAVE SUMMARY --------
//   const generateSummary = async () => {

//     if (!record_id) {
//       alert("No record found");
//       return;
//     }

//     setLoading(true);

//     try {

//       const res = await fetch("http://127.0.0.1:8000/summarize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           record_id: record_id,
//           text: transcript,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSummary(data.summary);
//         localStorage.setItem("summary", data.summary);
//       } else {
//         alert("Summary failed");
//       }

//     } catch (error) {
//       alert("Summary failed");
//     }

//     setLoading(false);
//   };

//   // -------- COPY --------
//   const copyTranscript = () => {
//     navigator.clipboard.writeText(transcript);
//     alert("Copied");
//   };

//   // -------- DOWNLOAD JSON --------
//   const downloadJSON = () => {

//     const data = {
//       filename: filename,
//       transcript: transcript,
//       summary: summary || localStorage.getItem("summary") || "",
//       generatedAt: new Date().toISOString(),
//     };

//     const blob = new Blob(
//       [JSON.stringify(data, null, 2)],
//       { type: "application/json" }
//     );

//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "transcription_result.json";
//     a.click();
//   };

//   return (

//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <div className="flex-1 p-8 max-w-4xl">

//           <h1 className="text-3xl font-bold mb-1">
//             Transcription Result
//           </h1>

//           <p className="text-gray-500 mb-6">
//             AI-generated transcript using Whisper
//           </p>

//           {/* File Info */}
//           <div className="bg-white shadow rounded-xl p-4 mb-6 flex justify-between">

//             <div>
//               <p className="text-gray-500 text-sm">File</p>
//               <p className="font-medium">{filename}</p>
//             </div>

//             <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
//               AI Generated
//             </span>

//           </div>

//           {/* Transcript */}
//           <div className="bg-white shadow rounded-xl p-6 mb-6">

//             <div className="flex justify-between mb-4">

//               <h2 className="font-semibold text-lg">
//                 Transcript
//               </h2>

//               <div className="space-x-2">

//                 <button
//                   onClick={copyTranscript}
//                   className="px-3 py-1 bg-gray-200 rounded"
//                 >
//                   Copy
//                 </button>

//                 <button
//                   onClick={downloadJSON}
//                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   Download JSON
//                 </button>

//               </div>

//             </div>

//             <div className="bg-gray-100 p-4 rounded whitespace-pre-line">
//               {transcript}
//             </div>

//           </div>

//           {/* Summary */}
//           <div className="bg-white shadow rounded-xl p-6">

//             <div className="flex justify-between mb-4">

//               <h2 className="font-semibold text-lg">
//                 AI Summary
//               </h2>

//               <button
//                 onClick={generateSummary}
//                 disabled={loading}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded"
//               >
//                 {loading ? "Generating..." : "Generate Summary"}
//               </button>

//             </div>

//             <div className="bg-gray-100 p-4 rounded">

//               {summary || "Summary will appear here..."}

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }



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

                <button
                  onClick={copyTranscript}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Copy
                </button>

                <button
                  onClick={downloadJSON}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                  Download JSON
                </button>

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
