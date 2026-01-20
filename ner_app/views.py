# ner_app/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, os, requests
from rest_framework import viewsets, filters
from .models import QueryHistory
from .serializers import QueryHistorySerializer
from .ner_module import get_named_entities
from .semantic_module import analyze_semantics
from .similarity_module import calculate_similarity
from .fake_news_module import classify_fake_news

# Custom Model API Configuration
CUSTOM_MODEL_URL = os.getenv(
    "CUSTOM_MODEL_URL",
    "http://PRIVATE_MODEL_SERVER/query"
)
CUSTOM_MODEL_API_KEY = os.getenv("CUSTOM_MODEL_API_KEY")
# Home
@csrf_exempt
def home(request):
    return JsonResponse({"message": "FactGuard API is running!"})


# Custom Model Fact Check
def call_custom_model(query_text: str):
    """
    Call your custom fact-checking model API
    """
    try:
        payload = json.dumps({"query": query_text})
        headers = {
            "Content-Type": "application/json",
            "X-API-Key": CUSTOM_MODEL_API_KEY,
        }

        response = requests.post(
            CUSTOM_MODEL_URL,
            headers=headers,
            data=payload,
            timeout=300,  # Increased timeout for Ollama
        )
        response.raise_for_status()

        # Get raw response
        raw_data = response.json()
        print("Raw API Response:", json.dumps(raw_data, indent=2))  # Debug log

        # Helper function to safely get string value
        def safe_str(value, max_length=None):
            if value is None:
                return ""
            if not isinstance(value, str):
                value = str(value)
            if max_length and len(value) > max_length:
                return value[:max_length]
            return value

        # Helper function to safely get numeric value
        def safe_num(value, default=0):
            if value is None:
                return default
            try:
                return float(value)
            except (ValueError, TypeError):
                return default

        # Parse the response - adjust based on your actual API structure
        if isinstance(raw_data, dict):
            # Check if response is nested inside 'response' key (your actual format)
            if "response" in raw_data and isinstance(raw_data["response"], dict):
                nested = raw_data["response"]

                # Extract is_fake and convert to verdict
                # is_fake = nested.get("is_fake", False)
                verdict = nested.get("verdict", "Undetermined")
                is_fake = True if verdict.upper() != "VERIFIED" else False

                # Map credibility number to text
                credibility_num = safe_num(nested.get("credibility"), 0)
                credibility_map = {
                    5: "Very High",
                    4: "High",
                    3: "Medium",
                    2: "Low",
                    1: "Very Low",
                    0: "Unknown",
                }
                credibility_text = credibility_map.get(int(credibility_num), "Unknown")

                result = {
                    "success": True,
                    "verdict": verdict,
                    "credibility": f"{credibility_text} ({credibility_num}/5)",
                    "summary": safe_str(nested.get("summary", "")),
                    "reasoning": safe_str(nested.get("reasoning", "")),
                    "sources": nested.get("url_references", []),
                    "confidence": credibility_num
                    * 20,  # Convert 0-5 to 0-100 percentage
                    "is_fake": is_fake,
                    "raw_response": raw_data,
                }
                return result

            # Direct response (fallback)
            result = {
                "success": True,
                "verdict": safe_str(
                    raw_data.get("verdict")
                    or raw_data.get("label")
                    or raw_data.get("prediction")
                    or "Unknown"
                ),
                "credibility": safe_str(
                    raw_data.get("credibility")
                    or raw_data.get("confidence_level")
                    or "Unknown"
                ),
                "summary": safe_str(
                    raw_data.get("summary")
                    or raw_data.get("analysis")
                    or raw_data.get("explanation")
                    or ""
                ),
                "reasoning": safe_str(
                    raw_data.get("reasoning")
                    or raw_data.get("rationale")
                    or raw_data.get("details")
                    or ""
                ),
                "sources": raw_data.get("sources")
                or raw_data.get("references")
                or raw_data.get("links")
                or [],
                "confidence": safe_num(
                    raw_data.get("confidence")
                    or raw_data.get("score")
                    or raw_data.get("confidence_score"),
                    0,
                ),
                "raw_response": raw_data,
            }

            # If there's a direct text response (common with Ollama)
            if "response" in raw_data or "text" in raw_data:
                text_response = raw_data.get("response") or raw_data.get("text")
                text_response = safe_str(text_response)
                if text_response and not result["summary"]:
                    result["summary"] = text_response[
                        :500
                    ]  # Use first 500 chars as summary
                    result["reasoning"] = text_response

            return result

        else:
            # If response is a string or list
            response_str = safe_str(raw_data)
            return {
                "success": True,
                "verdict": "Analysis Complete",
                "credibility": "See details",
                "summary": (
                    response_str[:500] if response_str else "No summary available"
                ),
                "reasoning": response_str,
                "sources": [],
                "confidence": 0,
                "raw_response": raw_data,
            }

    except requests.exceptions.Timeout:
        return {
            "success": False,
            "error": "Request timeout - Model took too long to respond (60s)",
            "verdict": "Error",
            "credibility": "Unknown",
            "summary": "",
            "reasoning": "",
            "sources": [],
            "confidence": 0,
        }
    except requests.exceptions.RequestException as e:
        return {
            "success": False,
            "error": f"Failed to connect to custom model: {str(e)}",
            "verdict": "Error",
            "credibility": "Unknown",
            "summary": "",
            "reasoning": "",
            "sources": [],
            "confidence": 0,
        }
    except Exception as e:
        import traceback

        error_details = traceback.format_exc()
        print("Exception in call_custom_model:", error_details)
        return {
            "success": False,
            "error": f"Error calling custom model: {str(e)}",
            "verdict": "Error",
            "credibility": "Unknown",
            "summary": "",
            "reasoning": "",
            "sources": [],
            "confidence": 0,
        }


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

        # NER (Named Entity Recognition) - KEPT INTACT
        entities = get_named_entities(text)

        # Sentiment Analysis - KEPT INTACT
        semantics = analyze_semantics(text)

        # Similarity (if text2 provided) - KEPT INTACT
        similarity = calculate_similarity(text, text2) if text2 else None

        # ===== CUSTOM MODEL FACT CHECK =====
        custom_model_result = call_custom_model(text)

        print(
            "Parsed Custom Model Result:", json.dumps(custom_model_result, indent=2)
        )  # Debug log

        # Determine verdict from custom model
        if custom_model_result.get("success"):
            verdict = custom_model_result.get("verdict", "Unknown")
            credibility = custom_model_result.get("credibility", "Unknown")
        else:
            verdict = "Error analyzing claim"
            credibility = "Unknown"

        # Save query to database
        try:
            QueryHistory.objects.create(
                headline=text[:200],
                serpapi_result=json.dumps(
                    custom_model_result.get("sources", []), ensure_ascii=False
                ),
                gemini_result=json.dumps(custom_model_result, ensure_ascii=False),
                factcheck_result=json.dumps(
                    custom_model_result.get("raw_response", {}), ensure_ascii=False
                ),
                verdict=verdict,
                credibility=credibility,
            )
        except Exception as e:
            print("DB save error:", e)

        # Build response
        response = {
            "entities": entities,  # NER results
            "sentiment": semantics,  # Sentiment analysis
            "similarity": similarity,  # Similarity score
            "customModel": custom_model_result,  # Your custom model results
        }

        return JsonResponse(response, safe=False)

    except Exception as e:
        import traceback

        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)


# History API (for React frontend)
class QueryHistoryViewSet(viewsets.ModelViewSet):
    queryset = QueryHistory.objects.all().order_by("-created_at")
    serializer_class = QueryHistorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["headline", "verdict", "credibility"]
