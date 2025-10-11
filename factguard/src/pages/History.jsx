import React, { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history/")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  // Filtered results (client-side search)
  const filtered = history.filter((item) =>
    item.headline?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-[#00F0B5]">Query History</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search headlines..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded-lg w-full mb-6 
                   focus:outline-none focus:ring-2 focus:ring-[#00F0B5] transition"
      />

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-[#00F0B5]">
              <th className="border border-gray-700 px-4 py-3 text-left">Headline</th>
              <th className="border border-gray-700 px-4 py-3">Verdict</th>
              <th className="border border-gray-700 px-4 py-3">Credibility</th>
              <th className="border border-gray-700 px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } hover:bg-gray-700 transition`}
                >
                  <td className="border border-gray-700 px-4 py-2">{item.headline}</td>
                  <td className="border border-gray-700 px-4 py-2">{item.verdict}</td>
                  <td className="border border-gray-700 px-4 py-2">{item.credibility}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

