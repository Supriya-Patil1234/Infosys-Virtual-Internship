import Navbar from "../components/Navbar";

export default function Home() {

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight">

            Transform Audio into  
            <span className="text-indigo-600"> AI Insights</span>

          </h1>

          <p className="mt-6 text-lg text-gray-600">

            Upload meetings, lectures, or podcasts and instantly get transcripts, summaries, keywords, and chat with your audio.

          </p>

          <div className="mt-8 flex gap-4">

            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 shadow-md">

              Upload Audio

            </button>

            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50">

              View Demo

            </button>

          </div>

        </div>

        {/* Right */}
        <div className="bg-white shadow-xl rounded-xl border p-6">

          <h3 className="font-semibold mb-4 text-gray-800">

            Live Preview

          </h3>

          <div className="space-y-3">

            <div className="bg-gray-100 p-3 rounded">

              Transcript: "Welcome to today's AI project meeting..."

            </div>

            <div className="bg-indigo-50 p-3 rounded text-indigo-700">

              Summary: Key action items and deadlines discussed.

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-12">

          Powerful AI Features

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            title="Speech to Text"
            desc="Accurate transcription using Whisper AI."
          />

          <FeatureCard
            title="AI Summarization"
            desc="Generate concise summaries instantly."
          />

          <FeatureCard
            title="Chat with Audio"
            desc="Ask questions and interact with transcript."
          />

        </div>

      </section>

    </div>

  );

}


function FeatureCard({ title, desc }) {

  return (

    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">

      <h3 className="text-xl font-semibold mb-2 text-indigo-600">
        {title}
      </h3>

      <p className="text-gray-600">
        {desc}
      </p>

    </div>

  );

}