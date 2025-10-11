# ner_app/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, os, requests, urllib.parse
from rest_framework import viewsets, filters   # <-- added for DRF
from .models import QueryHistory       # <-- added for history
from .serializers import QueryHistorySerializer
from .ner_module import get_named_entities
from .semantic_module import analyze_semantics
from .similarity_module import calculate_similarity
from .fake_news_module import classify_fake_news
from .gemini_module import analyze_with_gemini   # <-- already extended with SerpAPI



GOOGLE_FACTCHECK_KEY = os.getenv("GOOGLE_FACTCHECK_KEY")


# Home
@csrf_exempt
def home(request):
    return JsonResponse({"message": "FactGuard API is running!"})


# Google FactCheck helper
def call_google_factcheck(query_text: str, key: str):
    if not key:
        return []
    try:
        q = urllib.parse.quote(query_text)
        url = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?query={q}&key={key}"
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        claims = data.get("claims", [])
        results = []

        for top in claims:
            claimReviews = []
            for r in top.get("claimReview", []):
                claimReviews.append({
                    "publisher": r.get("publisher", {}).get("name"),
                    "url": r.get("url"),
                    "title": r.get("title"),
                    "reviewDate": r.get("reviewDate"),
                    "textualRating": r.get("textualRating"),
                })
            results.append({
                "text": top.get("text"),
                "claimant": top.get("claimant"),
                "claimReviews": claimReviews
            })
        return results
    except Exception as e:
        return [{"error": str(e)}]


# Analyze
@csrf_exempt
def analyze_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)
    try:
        data = json.loads(request.body)
        text = data.get("text", "").strip()
        text2 = data.get("text2", "").strip()

        if not text:
            return JsonResponse({"error": "No text provided"}, status=400)

        # NER
        entities = get_named_entities(text)

        # Semantic
        semantics = analyze_semantics(text)

    

        # Similarity
        similarity = calculate_similarity(text, text2) if text2 else None

        # Fake News ML (kept but not used for verdict anymore)
        try:
            ml_result = classify_fake_news(text)
            fakeNews = {
                "isFake": bool(ml_result.get("isFake", False)),
                "score": float(ml_result.get("score", 0)),
                "label": ml_result.get("label", "Fake ❌" if ml_result.get("isFake") else "True ✅")
            }
        except Exception as e:
            fakeNews = {"error": str(e), "isFake": None, "score": None, "label": None}

        # Google FactCheck
        googleResults = call_google_factcheck(text, key=GOOGLE_FACTCHECK_KEY)

        # Gemini API (includes SerpAPI evidence)
        gemini_result = analyze_with_gemini(text)

        # ---- Decide verdict from APIs (not ML) ----
        verdict = "Unknown"
        if googleResults and isinstance(googleResults, list) and "error" not in googleResults[0]:
            verdict = "Verified by Google FactCheck"
        elif gemini_result.get("verdict"):
            verdict = gemini_result["verdict"]
        elif gemini_result.get("serpapiEvidence"):
            verdict = "Evidence found via SerpAPI"

        # ---- Save query into database ----
        try:
            QueryHistory.objects.create(
                headline=text[:200],  # limit headline to avoid too long text
                serpapi_result=json.dumps(gemini_result.get("serpapiEvidence", {}), ensure_ascii=False),
                gemini_result=json.dumps(gemini_result, ensure_ascii=False),
                factcheck_result=json.dumps(googleResults, ensure_ascii=False),
                verdict=verdict,   # <-- now using APIs
                credibility=gemini_result.get("credibility", "Unknown")
            )
        except Exception as e:
            print("DB save error:", e)

        # Response
        response = {
            "entities": entities,
            "sentiment": semantics,
            "similarity": similarity,
            "fakeNews": fakeNews,   # still returned but not stored
            "googleFactCheck": googleResults,
            "gemini": gemini_result
        }

        return JsonResponse(response, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ---- History API (for React frontend) ----
class QueryHistoryViewSet(viewsets.ModelViewSet):
    queryset = QueryHistory.objects.all().order_by('-created_at')
    serializer_class = QueryHistorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['headline', 'verdict', 'credibility']

