// components/AnalyzeBox.jsx
import { useState } from "react";

export default function AnalyzeBox() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/analyze/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, text2 }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Text Analyzer</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter primary text"
        className="w-full p-2 border rounded mb-2"
        rows={3}
      />

      <textarea
        value={text2}
        onChange={(e) => setText2(e.target.value)}
        placeholder="Enter secondary text for similarity (optional)"
        className="w-full p-2 border rounded mb-2"
        rows={2}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {result && (
        <div className="mt-4 space-y-4">
          {/* Fake News ML */}
          <div className="p-3 border rounded bg-gray-50">
            <h3 className="font-semibold mb-1">Fake News ML Prediction</h3>
            <p>
              <strong>Label:</strong>{" "}
              {result.fakeNews?.label || "N/A"}
            </p>
            <p>
              <strong>Score:</strong>{" "}
              {result.fakeNews?.score != null ? result.fakeNews.score + "%" : "N/A"}
            </p>
            <p>
              <strong>Is Fake?</strong>{" "}
              {result.fakeNews?.isFake != null ? (result.fakeNews.isFake ? "✅ Yes" : "❌ No") : "N/A"}
            </p>
          </div>

          {/* Google FactCheck */}
          <div className="p-3 border rounded bg-gray-50">
            <h3 className="font-semibold mb-1">Google FactCheck</h3>
            {result.googleFactCheck?.found ? (
              <>
                <p>
                  <strong>Claim Text:</strong> {result.googleFactCheck.text}
                </p>
                <p>
                  <strong>Claimant:</strong> {result.googleFactCheck.claimant}
                </p>
                {result.googleFactCheck.claimReviews.length > 0 && (
                  <div className="mt-2">
                    <strong>Reviews:</strong>
                    <ul className="list-disc ml-5">
                      {result.googleFactCheck.claimReviews.map((r, i) => (
                        <li key={i}>
                          <strong>{r.publisher}:</strong> {r.title} -{" "}
                          <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                            Link
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p>No fact check found.</p>
            )}
          </div>

          {/* Optional: Sentiment */}
          {result.sentiment && (
            <div className="p-3 border rounded bg-gray-50">
              <h3 className="font-semibold mb-1">Sentiment</h3>
              {result.sentiment.map((s, i) => (
                <p key={i}>
                  {s.label} ({(s.score * 100).toFixed(1)}%)
                </p>
              ))}
            </div>
          )}

          {/* Optional: Similarity */}
          {result.similarity && (
            <div className="p-3 border rounded bg-gray-50">
              <h3 className="font-semibold mb-1">Similarity</h3>
              <p>
                {result.similarity.label} ({(result.similarity.score * 100).toFixed(1)}%)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

