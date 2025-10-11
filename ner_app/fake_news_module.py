# ner_app/fake_news_module.py

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# -------------------------------
# 1. Model Setup (Laptop-Friendly)
# -------------------------------
# TinyBERT is lightweight (~14M parameters), ideal for low-resource laptops
MODEL_NAME = "Thegame1161/tiny-bert-detect-fake-news"

# Load tokenizer and model
tokenizer_fake = AutoTokenizer.from_pretrained(MODEL_NAME)
model_fake = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

# Set device: GPU if available, else CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model_fake.to(device)

# Set evaluation mode (disables dropout for consistent predictions)
model_fake.eval()

# -------------------------------
# 2. Fake News Classification
# -------------------------------
def classify_fake_news(text: str, max_length: int = 512):
    """
    Classify text as FAKE or REAL.

    Returns:
        dict: {
            "label": "FAKE"|"REAL",
            "isFake": True|False|None,
            "score": float (0-1),
            "raw_label": original model label for debugging
        }
    """
    # Guard clause
    if not text or not text.strip():
        return {"error": "No text provided to classifier.", "label": None, "isFake": None, "score": None}

    # -------------------------------
    # 2a. Tokenization
    # -------------------------------
    inputs = tokenizer_fake(
        text,
        padding="max_length",   # pad to max_length for single input
        truncation=True,
        max_length=max_length,
        return_tensors="pt"
    ).to(device)

    # -------------------------------
    # 2b. Model Prediction
    # -------------------------------
    with torch.no_grad():
        outputs = model_fake(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=1).cpu().numpy()[0]

    # -------------------------------
    # 2c. Label Mapping
    # -------------------------------
    label_map = getattr(model_fake.config, "id2label", None)
    if label_map:
        raw_label = label_map[int(probs.argmax())].upper()
    else:
        raw_label = "LABEL_0" if probs.argmax() == 0 else "LABEL_1"

    # Normalize to FAKE / REAL
    if "FAKE" in raw_label:
        label = "FAKE"
        is_fake = True
    elif "REAL" in raw_label or "TRUE" in raw_label:
        label = "REAL"
        is_fake = False
    else:
        # Fallback for generic labels
        if raw_label.endswith("0") or "LABEL_0" in raw_label:
            label = "REAL"
            is_fake = False
        elif raw_label.endswith("1") or "LABEL_1" in raw_label:
            label = "FAKE"
            is_fake = True
        else:
            label = raw_label
            is_fake = None

    # Confidence score
    score = float(probs[int(probs.argmax())])

    # Return structured result
    return {
        "label": label,
        "isFake": is_fake,
        "score": round(score, 4),
        "raw_label": raw_label
    }

