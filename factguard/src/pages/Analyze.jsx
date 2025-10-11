// src/pages/Analyze.jsx
import Sidebar from "../components/Sidebar";
import AccountMenu from "../components/AccountMenu";
import React, { useState, useEffect, useRef } from "react";
import { analyzeText } from "../api";


import {
  Loader2,
  Upload,
  Lightbulb,
  ArrowUp,
  AlertCircle,
  Menu,
} from "lucide-react";

const GOOGLE_API_KEY = ""; // Move to backend in production - must do 0_0

const Analyze = () => {
  const fileInputRef = useRef(null);
  const [input, setInput] = useState("");
  const [comparison, setComparison] = useState("");
  const [, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [googleResults, setGoogleResults] = useState([]);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const exampleHeadlines = [
    "COVID-19 vaccines cause infertility, says study",
    "NASA confirms water on the Moon",
    "Pakistan to host World Cup in 2027",
  ];

  const handleExampleClick = (text) => {
    setInput(text);
    setResult(null);
    setGoogleResults([]);
    setError("");
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setUploading(true);
      setFile(uploadedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setInput(reader.result);
        setUploading(false);
      };

      if (
        uploadedFile.type.includes("text") ||
        uploadedFile.name.endsWith(".txt")
      ) {
        reader.readAsText(uploadedFile);
      } else if (uploadedFile.type === "application/pdf") {
        alert("PDF upload supported, but parsing not implemented yet.");
        setUploading(false);
      } else {
        alert("Unsupported file type.");
        setUploading(false);
      }
    }
  };

  const fetchGoogleFactCheck = async (query) => {
    try {
      const res = await fetch(
        `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(
          query
        )}&key=${GOOGLE_API_KEY}`
      );
      const data = await res.json();
      if (data.claims) {
        return data.claims.map((claim) => ({
          text: claim.text || "",
          claimant: claim.claimant || "",
          claimReview:
            claim.claimReview?.map((cr) => ({
              publisher: cr.publisher?.name || "",
              reviewRating: cr.textualRating || cr.rating?.alternateName || "",
              url: cr.url || "",
            })) || [],
        }));
      }
      return [];
    } catch (err) {
      console.error("Google Fact Check error:", err);
      return [];
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setResult(null);
    setGoogleResults([]);
    setError("");

    if (!input.trim()) {
      setError("Please enter a valid headline or upload a file.");
      return;
    }

    setLoading(true);
    try {
      // Backend analysis
      const data = await analyzeText(input, comparison);

      // Set ML/fake news + Gemini result
      const normalized = {
        fakeNews: data.fakeNews ?? { isFake: null, score: null, label: null },
        entities: data.entities ?? [],
        sentiment: data.sentiment ?? [],
        semantics: data.semantics ?? [],
        similarity: data.similarity ?? null,
        gemini: data.gemini ?? null,
        vertex: data.vertex ?? null, 
      };
      setResult(normalized);

      // Fetch Google FactCheck
      const googleData = await fetchGoogleFactCheck(input);
      setGoogleResults(googleData);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  const startNewAnalysis = () => {
    setInput("");
    setComparison("");
    setResult(null);
    setGoogleResults([]);
    setError(null);
    setUploading(false);
  };

  const sentimentClass = (label) => {
    const l = (label || "").toString().toLowerCase();
    if (l.includes("neg")) return "text-red-700 bg-red-100";
    if (l.includes("pos")) return "text-green-700 bg-green-100";
    if (l.includes("neu") || l.includes("neutral"))
      return "text-gray-700 bg-gray-100";
    return "text-gray-800 bg-gray-100";
  };

  const nerColor = (label) => {
    switch ((label || "").toUpperCase()) {
      case "ORG":
        return "bg-blue-600 text-white";
      case "PER":
        return "bg-red-600 text-white";
      case "LOC":
        return "bg-green-600 text-white";
      case "GPE":
        return "bg-teal-600 text-white";
      case "MISC":
        return "bg-purple-600 text-white";
      case "DATE":
        return "bg-orange-500 text-white";
      case "TIME":
        return "bg-yellow-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const renderResults = () => {
    if (!result && googleResults.length === 0) return null;

    return (
      <div className="mt-6 w-full max-w-2xl mx-auto space-y-5">
       
      {/* Gemini Analysis */}
{result?.gemini && (
  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-700 border border-gray-600 shadow-lg text-white">
    <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
    {result.gemini.error ? (
      <p className="text-red-300">Error: {result.gemini.error}</p>
    ) : (
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Summary:</span>{" "}
          {result.gemini.summary}
        </p>
        <p>
          <span className="font-semibold">Credibility:</span>{" "}
          {result.gemini.credibility}
        </p>
        <p>
          <span className="font-semibold">Reasoning:</span>{" "}
          {result.gemini.reasoning}
        </p>
                        
                {/* Show SerpAPI evidence */}
{result.gemini.serpapiEvidence && (
  <div className="mt-2 text-sm text-indigo-200">
    <span className="font-semibold">Google Evidence:</span>
    <div className="mt-1 space-y-1">
      {result.gemini.serpapiEvidence.split("\n").map((line, i) => (
        <p key={i} className="pl-2 border-l border-indigo-400">
          {line}
        </p>
      ))}
    </div>
  </div>
)} 
                        
        {/* New: show grounded response with citations */}
        {result.gemini.citations && (
          <p className="text-sm text-indigo-200 mt-2">
            <span className="font-semibold">Sources:</span>{" "}
            <span
              dangerouslySetInnerHTML={{ __html: result.gemini.citations }}
            />
          </p>
        )}
      </div>
    )}
  </div>
)}

        {/* Google Fact Check */}
        {googleResults.length > 0 && (
          <div className="p-4 rounded-2xl bg-white/5 border border-gray-600 shadow-lg backdrop-blur-md">
            <h3 className="text-primary font-semibold text-lg mb-3">
              AI Fact Check
            </h3>
            {googleResults.map((claim, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/10 border border-gray-600 mb-3"
              >
                <p className="text-sm mb-1">
                  <span className="font-semibold">Claim:</span> {claim.text}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Claimant:</span>{" "}
                  {claim.claimant}
                </p>
                {claim.claimReview.map((cr, i) => (
                  <div
                    key={i}
                    className="text-sm mb-1 pl-2 border-l border-gray-500"
                  >
                    <p>
                      <span className="font-semibold">Publisher:</span>{" "}
                      {cr.publisher}
                    </p>
                    <p>
                      <span className="font-semibold">Rating:</span>{" "}
                      {cr.reviewRating}
                    </p>
                    {cr.url && (
                      <p>
                        <a
                          href={cr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:underline"
                        >
                          Read Review
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* NER */}
        {result?.entities?.length > 0 && (
          <div className="p-4 rounded-2xl bg-white/5 border border-gray-600 shadow-lg backdrop-blur-md">
            <h3 className="font-semibold mb-3 text-primary text-lg">
              Named Entities
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.entities.map((ent, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm font-medium shadow-md ${nerColor(
                    ent.label
                  )}`}
                >
                  {ent.text}{" "}
                  <span className="ml-1 text-xs opacity-80">({ent.label})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sentiment */}
        {result?.sentiment?.length > 0 && (
          <div className="p-4 rounded-2xl bg-white/5 border border-gray-600 shadow-lg backdrop-blur-md">
            <h3 className="font-semibold mb-2 text-primary text-lg">Sentiment</h3>
            <div
              className={`inline-block px-3 py-1 rounded-full font-medium text-sm shadow-md ${sentimentClass(
                result.sentiment[0].label
              )}`}
            >
              {result.sentiment[0].label} (
              {(result.sentiment[0].score * 100).toFixed(1)}%)
            </div>
          </div>
        )}

       
         {/* Fake News ML */}

        {result?.fakeNews?.isFake !== null && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 shadow-lg flex flex-col gap-3">
            <p className="text-lg font-bold text-white flex items-center gap-2">
              our Custom model Prediction:
            </p>

            <div className="flex items-center gap-3">

              <span

                className={`px-4 py-1 rounded-full text-sm font-semibold shadow-md ${

                  result.fakeNews.isFake

                    ? "bg-red-500/90 text-white"

                    : "bg-green-500/90 text-white"

                }`}

              >

                {result.fakeNews.label ??

                  (result.fakeNews.isFake ? "Fake ❌" : "True ✅")}
              </span>

              {result.fakeNews.score !== null && (

                <span className="text-sm text-gray-300">

                  {(result.fakeNews.score * 100).toFixed(1)}%

                </span>

              )}

            </div>

          </div>

        )}

        {/* Similarity */}
        {result?.similarity?.score !== undefined && (
          <div className="p-4 rounded-2xl bg-white/5 border border-gray-600 shadow-lg backdrop-blur-md">
            <h3 className="font-semibold mb-2 text-primary text-lg">Similarity</h3>
            <div className="flex items-center gap-3">
              <span className="font-medium text-white">
                {result.similarity.label}
              </span>
              <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className="bg-indigo-500 h-3 rounded-full"
                  style={{
                    width: `${(result.similarity.score * 100).toFixed(1)}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-300">
                {(result.similarity.score * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="h-screen w-full bg-background text-text flex">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-y-auto relative">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center px-6 py-2 border-b border-border bg-background z-40">
          <span className="text-xl font-bold text-primary tracking-tight font-space">
            FactGuard
          </span>
          <AccountMenu />
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-50 flex justify-between items-center px-4 py-2 bg-background shadow-md">
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-teal-400"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-sm font-semibold text-muted">FactGuard</h1>
          <button
            onClick={startNewAnalysis}
            className="text-sm px-4 py-2 rounded-full bg-gradient-to-r text-gray-400 hover:text-teal-400"
          >
            Reset
          </button>
        </div>

        {/* Main */}
        <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-6 pb-28 w-full max-w-7xl mx-auto">
          {/* Example headlines */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {exampleHeadlines.map((headline, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(headline)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-gray-600 text-gray-300 hover:text-white hover:bg-primary/20 shadow-sm backdrop-blur-md text-sm transition-all duration-300"
              >
                <Lightbulb size={14} className="inline-block mr-2" /> {headline}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <form
            onSubmit={handleAnalyze}
            className="w-full max-w-2xl flex flex-col gap-3 bg-surface border border-border rounded-2xl shadow-xl px-5 py-4 backdrop-blur-md transition-all duration-300 focus-within:ring-2 focus-within:ring-primary relative"
          >
            {/* Input Textarea */}
            <textarea
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter headline or URL..."
              className="w-full bg-white/5 text-white placeholder:text-gray-400 text-sm font-inter p-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition shadow-inner"
            />

            {/* Comparison Textarea */}
            <textarea
              rows={3}
              value={comparison}
              onChange={(e) => setComparison(e.target.value)}
              placeholder="Optional: Enter second text for similarity..."
              className="w-full bg-white/5 text-white placeholder:text-gray-400 text-sm font-inter p-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition shadow-inner"
            />

            {/* Buttons */}
            <div className="flex gap-3 items-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload
                  size={20}
                  className="text-gray-400 hover:text-primary transition"
                  title="Upload File"
                />
              </label>
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="submit"
                disabled={loading || uploading}
                className="bg-gradient-to-br from-primary to-secondary text-black p-3 rounded-full shadow-lg hover:scale-105 transition flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <ArrowUp size={18} />
                )}
              </button>
            </div>
          </form>

          {/* Error */}
          {error && (
            <div className="text-danger text-sm mt-4 flex items-center gap-2 font-inter">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {/* Results */}
          {renderResults()}
        </main>
      </div>
    </section>
  );
};

export default Analyze;

