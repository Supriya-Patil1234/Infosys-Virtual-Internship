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