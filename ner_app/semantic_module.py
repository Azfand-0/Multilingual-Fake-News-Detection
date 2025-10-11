# ner_app/semantic_module.py

from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

# Best multilingual sentiment model
model_name = "cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual"

# Load tokenizer & model
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Build pipeline
semantic_pipeline = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

# Label mapping from model output to human-readable labels
label_map = {
    "LABEL_0": "negative",
    "LABEL_1": "neutral",
    "LABEL_2": "positive"
}

def analyze_semantics(text):
    """
    Returns semantic sentiment analysis of the input text.
    Output: [{'label': 'positive/neutral/negative', 'score': confidence}]
    """
    results = semantic_pipeline(text)
    # Map labels for readability
    for r in results:
        r["label"] = label_map.get(r["label"], r["label"])
    return results

