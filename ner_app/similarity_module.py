# ner_app/similarity_module.py
from sentence_transformers import SentenceTransformer, util

# Load multilingual model
model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

def calculate_similarity(text1, text2):
    # Encode sentences
    embeddings = model.encode([text1, text2], convert_to_tensor=True)
    
    # Cosine similarity
    score = util.cos_sim(embeddings[0], embeddings[1]).item()

    # Label mapping
    if score > 0.7:
        label = "High Similarity"
    elif score > 0.4:
        label = "Moderate Similarity"
    else:
        label = "Low Similarity"

    return {
        "label": label,
        "score": score
    }

