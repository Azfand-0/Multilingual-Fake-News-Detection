from django.db import models

class QueryHistory(models.Model):
    headline = models.TextField()
    serpapi_result = models.TextField(null=True, blank=True)
    gemini_result = models.TextField(null=True, blank=True)
    factcheck_result = models.TextField(null=True, blank=True)
    verdict = models.CharField(max_length=255, null=True, blank=True)
    credibility = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.headline[:50]}... ({self.verdict})"

