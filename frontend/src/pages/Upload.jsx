// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";

// export default function Upload() {

//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   return (

//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <div className="flex-1 p-8">

//           <h1 className="text-3xl font-bold mb-6">
//             Upload Audio
//           </h1>

//           {/* Upload Card */}
//           <div className="bg-white shadow-md rounded-xl p-8 max-w-xl">

//             <div className="border-2 border-dashed border-indigo-400 rounded-lg p-8 text-center">

//               <p className="text-gray-600 mb-4">
//                 Drag and drop your audio file here
//               </p>

//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="mb-4"
//               />

//               <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">

//                 Upload

//               </button>

//             </div>

//             {/* File Preview */}
//             {file && (

//               <div className="mt-4 p-4 bg-gray-100 rounded-lg">

//                 <p className="font-medium">
//                   Selected File:
//                 </p>

//                 <p className="text-gray-600">
//                   {file.name}
//                 </p>

//               </div>

//             )}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }


// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";

// export default function Upload() {

//   const [file, setFile] = useState(null);
//   const [dragging, setDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);

//     if (e.dataTransfer.files.length > 0) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     setUploading(true);

//     setTimeout(() => {
//       setUploading(false);
//       alert("File uploaded successfully (backend integration next)");
//     }, 2000);
//   };

//   return (

//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <div className="flex-1 p-8">

//           <h1 className="text-3xl font-bold mb-6">
//             Upload Audio
//           </h1>

//           <div className="bg-white shadow-md rounded-xl p-8 max-w-xl">

//             {/* Drag and Drop Area */}
//             <div
//               className={`border-2 border-dashed rounded-lg p-10 text-center transition
//                 ${dragging ? "border-indigo-600 bg-indigo-50" : "border-indigo-300"}
//               `}
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 setDragging(true);
//               }}
//               onDragLeave={() => setDragging(false)}
//               onDrop={handleDrop}
//             >

//               <p className="text-gray-600 mb-4">
//                 Drag & Drop audio file here
//               </p>

//               <p className="text-sm text-gray-400 mb-4">
//                 Supported: MP3, WAV, M4A
//               </p>

//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="mb-4"
//               />

//               <br />

//               <button
//                 onClick={handleUpload}
//                 disabled={!file || uploading}
//                 className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
//               >

//                 {uploading ? "Processing..." : "Upload"}

//               </button>

//             </div>

//             {/* File Preview */}
//             {file && (

//               <div className="mt-6 p-4 bg-gray-100 rounded-lg">

//                 <p className="font-medium">
//                   Selected File:
//                 </p>

//                 <p className="text-gray-600">
//                   {file.name}
//                 </p>

//                 <p className="text-sm text-gray-400">
//                   {(file.size / 1024 / 1024).toFixed(2)} MB
//                 </p>

//               </div>

//             )}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }



// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";
// import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

// export default function Upload() {

//   const [file, setFile] = useState(null);
//   const [dragging, setDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);

//     if (e.dataTransfer.files.length > 0) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     setUploading(true);

//     setTimeout(() => {
//       setUploading(false);
//       alert("Backend integration coming next");
//     }, 2000);
//   };

//   return (

//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         <div className="flex-1 p-10">

//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Upload Audio
//           </h1>

//           <p className="text-gray-500 mb-8">
//             Upload your audio file to generate transcript and AI insights
//           </p>

//           {/* Upload Card */}
//           <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl">

//             <div
//               className={`border-2 border-dashed rounded-xl p-12 text-center transition-all
//               ${dragging
//                 ? "border-indigo-600 bg-indigo-50"
//                 : "border-gray-300 hover:border-indigo-500 hover:bg-gray-50"
//               }`}
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 setDragging(true);
//               }}
//               onDragLeave={() => setDragging(false)}
//               onDrop={handleDrop}
//             >

//               {/* Icon */}
//               <CloudArrowUpIcon className="h-16 w-16 text-indigo-500 mx-auto mb-4"/>

//               <h2 className="text-xl font-semibold text-gray-700 mb-2">
//                 Drag & Drop your audio file
//               </h2>

//               <p className="text-gray-500 mb-6">
//                 or click to browse
//               </p>

//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="mb-6"
//               />

//               <br />

//               <button
//                 onClick={handleUpload}
//                 disabled={!file || uploading}
//                 className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition"
//               >
//                 {uploading ? "Processing..." : "Upload File"}
//               </button>

//               <p className="text-sm text-gray-400 mt-4">
//                 Supported formats: MP3, WAV, M4A
//               </p>

//             </div>

//             {/* File Preview */}
//             {file && (

//               <div className="mt-6 border rounded-lg p-4 bg-gray-50">

//                 <p className="font-semibold text-gray-700">
//                   Selected File
//                 </p>

//                 <p className="text-gray-600 mt-1">
//                   {file.name}
//                 </p>

//                 <p className="text-sm text-gray-400">
//                   {(file.size / 1024 / 1024).toFixed(2)} MB
//                 </p>

//               </div>

//             )}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }


// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";
// import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";

// export default function Upload() {

// const [recording, setRecording] = useState(false);
// const [mediaRecorder, setMediaRecorder] = useState(null);
// const [audioBlob, setAudioBlob] = useState(null);

// const startRecording = async () => {

// const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

// const recorder = new MediaRecorder(stream);

//   recorder.ondataavailable = (event) => {
//     setAudioBlob(event.data);
//   };

//   recorder.start();
//   setMediaRecorder(recorder);
//   setRecording(true);
// };

// const stopRecording = () => {
//   mediaRecorder.stop();
//   setRecording(false);
// };

//   const sendRecording = async () => {

//   const formData = new FormData();
//   formData.append("file", audioBlob, "recording.wav");

//   const response = await fetch("http://127.0.0.1:8000/upload", {
//     method: "POST",
//     body: formData
//   });

//   const data = await response.json();

//   localStorage.setItem("transcript", data.transcript);
//   localStorage.setItem("filename", "recording.wav");

//   window.location.href = "/results";
// };

//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const navigate = useNavigate();

// const handleUpload = async () => {

//   if (!file) return;

//   setUploading(true);

//   try {

//     const formData = new FormData();
//     formData.append("file", file);

//     const response = await fetch("http://127.0.0.1:8000/upload", {
//       method: "POST",
//       body: formData
//     });

//     // DEBUG
//     console.log("Response status:", response.status);

//     const data = await response.json();

//     console.log("Backend response:", data);

//     if (response.ok) {

//   localStorage.setItem("transcript", data.transcript);
//   localStorage.setItem("filename", data.filename);

//   navigate("/results");

// };

//   } catch (error) {

//     console.error("Upload error:", error);
//     alert("Upload failed");

//   }

//   setUploading(false);

// };

//   return (

//     <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">

//       <Navbar />

//       <div className="flex">

//         <Sidebar />

//         {/* Hero Section */}
//         <div className="flex-1 flex items-center justify-center p-10">

//           <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full">

//             {/* LEFT SIDE TEXT */}
//             <div>

//               <h1 className="text-5xl font-bold text-gray-800 mb-6">
//                 AI Audio
//                 <span className="text-indigo-600"> Transcription</span>
//               </h1>

//               <p className="text-gray-600 text-lg mb-6">
//                 Upload your audio and instantly generate transcript,
//                 summary, and AI insights powered by advanced models.
//               </p>

//               <div className="flex gap-4">

//                 <div className="bg-white shadow-md px-4 py-2 rounded-lg">
//                   ⚡ Fast Processing
//                 </div>

//                 <div className="bg-white shadow-md px-4 py-2 rounded-lg">
//                   🤖 AI Powered
//                 </div>

//                 <div className="bg-white shadow-md px-4 py-2 rounded-lg">
//                   🔒 Secure
//                 </div>

//               </div>

//             </div>


//             {/* RIGHT SIDE UPLOAD CARD */}
//             <div className="bg-white shadow-xl rounded-2xl p-8">

//               <CloudArrowUpIcon className="h-14 w-14 text-indigo-600 mb-4"/>

//               <h2 className="text-xl font-semibold mb-2">
//                 Upload Audio File
//               </h2>

//               <p className="text-gray-500 mb-6">
//                 MP3, WAV, M4A supported
//               </p>

//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="mb-4"
//               />

//               <button
//                 onClick={handleUpload}
//                 disabled={!file || uploading}
//                 className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
//               >

//                 {uploading ? "Processing..." : "Generate Transcript"}

//               </button>

//               {!recording ? (
//   <button onClick={startRecording} className="bg-green-600 px-6 py-3 rounded-lg text-white">
//     Start Recording
//   </button>
// ) : (
//   <button onClick={stopRecording} className="bg-red-600 px-6 py-3 rounded-lg text-white">
//     Stop Recording
//   </button>
// )}

// {audioBlob && (
//   <button onClick={sendRecording} className="bg-indigo-600 px-6 py-3 rounded-lg text-white ml-4">
//     Transcribe Recording
//   </button>
// )}

//               {file && (

//                 <div className="mt-4 bg-gray-100 p-3 rounded-lg">

//                   <p className="text-sm font-medium">
//                     {file.name}
//                   </p>

//                 </div>

//               )}

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }



import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Upload() {

  const navigate = useNavigate();

  // 🔐 PROTECT PAGE
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/upload", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  },
  body: formData,
});
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("transcript", data.transcript);
        localStorage.setItem("summary", data.summary);
        localStorage.setItem("filename", file.name);
        localStorage.setItem("record_id", data.record_id);

        navigate("/results");
      } else {
        console.error(data);
        alert("Upload failed");
      }

    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }

    setUploading(false);
  };

  // 🎙 RECORDING
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      setAudioBlob(event.data);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const sendRecording = async () => {

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("transcript", data.transcript);
        localStorage.setItem("summary", data.summary);
        localStorage.setItem("filename", "recording.wav");
        localStorage.setItem("record_id", data.record_id);

        navigate("/results");
      } else {
        alert("Recording upload failed");
      }

    } catch (error) {
      console.error("Recording error:", error);
      alert("Recording failed");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 flex items-center justify-center p-10">

          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">

            <CloudArrowUpIcon className="h-14 w-14 text-indigo-600 mb-4" />

            <h2 className="text-xl font-semibold mb-4">
              Upload Audio File
            </h2>

            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4"
            />

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg mb-4"
            >
              {uploading ? "Processing..." : "Generate Transcript"}
            </button>

            {!recording ? (
              <button
                onClick={startRecording}
                className="w-full bg-green-600 py-3 rounded-lg text-white mb-2"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="w-full bg-red-600 py-3 rounded-lg text-white mb-2"
              >
                Stop Recording
              </button>
            )}

            {audioBlob && (
              <button
                onClick={sendRecording}
                className="w-full bg-indigo-600 py-3 rounded-lg text-white"
              >
                Transcribe Recording
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}