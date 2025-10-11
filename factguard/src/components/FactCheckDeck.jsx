import React, { useState } from "react";

const FactCheckCard = ({ claim }) => {
  const { text, claimant, claimReview } = claim || {};

  return (
    <div style={{
      minWidth: "300px",
      maxWidth: "350px",
      margin: "1rem",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "200px",
      textAlign: "left"
    }}>
      <p style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem" }}>
        {text || "No claim text available."}
      </p>
      <small><strong>Claimant:</strong> {claimant || "Unknown"}</small>
      {claimReview && claimReview.length > 0 && (
        <div style={{ marginTop: "0.5rem" }}>
          <small><strong>Reviewed by:</strong> {claimReview[0].publisher || "N/A"}</small><br />
          <small><strong>Rating:</strong> {claimReview[0].reviewRating || "N/A"}</small><br />
          {claimReview[0].url && (
            <a href={claimReview[0].url} target="_blank" rel="noopener noreferrer" 
               style={{ color: "#3b82f6", textDecoration: "underline" }}>
              Read full review
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const FactCheckDeck = ({ claims }) => {
  const [current, setCurrent] = useState(0);

  if (!claims || claims.length === 0) return <p>No fact-check claims found.</p>;

  const prevCard = () => setCurrent((c) => (c === 0 ? claims.length - 1 : c - 1));
  const nextCard = () => setCurrent((c) => (c === claims.length - 1 ? 0 : c + 1));

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
        <button 
          onClick={prevCard} 
          aria-label="Previous card"
          style={{
            fontSize: "2rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "1rem"
          }}
        >
          ‹
        </button>

        <FactCheckCard claim={claims[current]} />

        <button 
          onClick={nextCard} 
          aria-label="Next card"
          style={{
            fontSize: "2rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "1rem"
          }}
        >
          ›
        </button>
      </div>
      <p style={{ marginTop: "0.5rem" }}>
        Card {current + 1} of {claims.length}
      </p>
    </div>
  );
};

export default FactCheckDeck;

