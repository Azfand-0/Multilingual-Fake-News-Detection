# ner_app/ner_module.py

from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline

model_name = "Davlan/bert-base-multilingual-cased-ner-hrl"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForTokenClassification.from_pretrained(model_name)

ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")

def get_named_entities(text):
    raw_results = ner_pipeline(text)
    unique = set()
    entities = []

    for ent in raw_results:
        word = ent.get("word", "").replace("##", "")
        label = ent.get("entity_group", "")
        key = (word, label)

        if key not in unique:
            unique.add(key)
            entities.append({
                "text": word,
                "label": label
            })

    return entities



