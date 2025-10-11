import csv
import os
from django.core.management.base import BaseCommand
from ner_app.models import QueryHistory

class Command(BaseCommand):
    help = 'Exports QueryHistory table to history.csv'

    def handle(self, *args, **kwargs):
        output_file = os.path.join(os.getcwd(), "history.csv")
        self.stdout.write(f"Writing CSV to: {output_file}")

        try:
            with open(output_file, "w", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                # CSV headers
                writer.writerow(["id", "headline", "serpapi_result", "gemini_result", "factcheck_result", "verdict", "credibility", "created_at"])
                
                # Write rows
                for q in QueryHistory.objects.all():
                    writer.writerow([
                        q.id,
                        q.headline,
                        q.serpapi_result,
                        q.gemini_result,
                        q.factcheck_result,
                        q.verdict,
                        q.credibility,
                        q.created_at
                    ])
            
            self.stdout.write(self.style.SUCCESS(f"Successfully exported {QueryHistory.objects.count()} records to history.csv"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error exporting CSV: {e}"))

