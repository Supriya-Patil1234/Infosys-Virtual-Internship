import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Chat() {

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! Ask anything about your transcript."
    }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    const aiMessage = {
      sender: "ai",
      text: "This is a demo response. Backend integration coming next."
    };

    setMessages([...messages, userMessage, aiMessage]);

    setInput("");
  };

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8 flex flex-col">

          <h1 className="text-3xl font-bold mb-6">
            Chat with Transcript
          </h1>

          {/* Chat Box */}
          <div className="bg-white rounded-xl shadow-md p-6 flex-1 overflow-y-auto max-h-[500px]">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >

                <div
                  className={`px-4 py-2 rounded-lg max-w-md ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >

                  {msg.text}

                </div>

              </div>

            ))}

          </div>

          {/* Input Area */}
          <div className="mt-4 flex gap-4">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >

              Send

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}