// src/api.js
const API_URL = "http://127.0.0.1:8000"; // Django backend

export async function analyzeText(text, text2 = "") {
  const response = await fetch(`${API_URL}/analyze/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, text2 }),
  });
  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`Server error ${response.status}: ${txt}`);
  }
  return response.json();
}

