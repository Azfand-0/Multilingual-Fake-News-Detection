# ner_app/gemini_module.py
import google.generativeai as genai
import json
import requests
import urllib.parse
import re

# ==================
# CONFIG (direct keys)
# ==================
GEMINI_API_KEY = ""
GOOGLE_FACTCHECK_KEY = ""
NEWSDATA_API_KEY = ""
SERPAPI_KEY = "" 

genai.configure(api_key=GEMINI_API_KEY)
MODEL = "gemini-2.5-flash"


# ==================
# Fetch Google FactCheck
# ==================
def fetch_google_factcheck(query: str):
    if not GOOGLE_FACTCHECK_KEY:
        return "No Google FactCheck key set."
    try:
        q = urllib.parse.quote(query)
        url = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?query={q}&key={GOOGLE_FACTCHECK_KEY}"
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        results = []

        for top in data.get("claims", []):
            for r in top.get("claimReview", []):
                results.append(
                    f"- {r.get('publisher', {}).get('name')} rated: {r.get('textualRating')} "
                    f"(Title: {r.get('title')}, URL: {r.get('url')})"
                )
        return "\n".join(results) if results else "No fact-check found."
    except Exception as e:
        return f"Error fetching FactCheck: {e}"


# ==================
# Fetch Live News
# ==================
def fetch_live_news(query: str, limit: int = 3):
    if not NEWSDATA_API_KEY:
        return "No NewsData.io key set."
    try:
        url = f"https://newsdata.io/api/1/news?apikey={NEWSDATA_API_KEY}&q={query}&language=en"
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        articles = []

        for a in data.get("results", [])[:limit]:
            articles.append(f"- {a.get('title')} ({a.get('link')})")

        return "\n".join(articles) if articles else "No relevant news found."
    except Exception as e:
        return f"Error fetching live news: {e}"


# ==================
# Fetch SerpAPI (Google Search)
# ==================
def fetch_serpapi(query: str, limit: int = 3):
    if not SERPAPI_KEY:
        return "No SerpAPI key set."
    try:
        url = f"https://serpapi.com/search.json?q={urllib.parse.quote(query)}&hl=en&api_key={SERPAPI_KEY}"
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()

        results = []
        for item in data.get("organic_results", [])[:limit]:
            results.append(f"- {item.get('title')} ({item.get('link')})")

        return "\n".join(results) if results else "No SerpAPI results."
    except Exception as e:
        return f"Error fetching SerpAPI: {e}"


# ==================
# Gemini Analysis
# ==================
def analyze_with_gemini(text: str):
    """
    Analyze text with Gemini using:
    - Google FactCheck
    - Live NewsData.io
    - SerpAPI (as fallback / extra context)

    Always return structured JSON:
    {
        summary,
        credibility,
        reasoning,
        isFake,
        serpapiEvidence
    }
    """
    try:
        factcheck_context = fetch_google_factcheck(text)
        news_context = fetch_live_news(text)
        serp_context = fetch_serpapi(text)

        prompt = f"""
        You are a fact-checking assistant. 
        Claim: "{text}"
        
        Evidence from Google FactCheck: {factcheck_context}
        Evidence from Live News: {news_context}
        Evidence from SerpAPI (Google Search): {serp_context}

        Respond ONLY in valid JSON:
        {{
            "summary": "short summary of the claim",
            "credibility": "Verified ✅|Uncertain ⚠️|Untrustworthy ❌",
            "reasoning": "brief explanation",
            "isFake": true|false,
            "serpapiEvidence": "{serp_context}"
        }}
        """

        model = genai.GenerativeModel(MODEL)
        response = model.generate_content(prompt)
        raw_text = response.text.strip()

        # -------------------------
        # Clean JSON string
        # -------------------------
        cleaned = raw_text
        cleaned = re.sub(r"^```(?:json)?", "", cleaned)
        cleaned = re.sub(r"```$", "", cleaned)
        cleaned = cleaned.strip()
        if cleaned.lower().startswith("json"):
            cleaned = cleaned[4:].strip()

        # -------------------------
        # Parse safely
        # -------------------------
        try:
            parsed = json.loads(cleaned)
            return {
                "summary": parsed.get("summary"),
                "credibility": parsed.get("credibility"),
                "reasoning": parsed.get("reasoning"),
                "isFake": parsed.get("isFake"),
                "serpapiEvidence": parsed.get("serpapiEvidence", serp_context)
            }
        except json.JSONDecodeError:
            return {
                "summary": raw_text,
                "credibility": "unknown",
                "reasoning": "Gemini did not return valid JSON",
                "isFake": None,
                "serpapiEvidence": serp_context
            }

    except Exception as e:
        return {"error": str(e)}

