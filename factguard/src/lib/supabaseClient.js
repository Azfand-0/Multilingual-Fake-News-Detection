import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dwbbqlywamilvstlryey.supabase.co"; // 🔁 Replace with your URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3YmJxbHl3YW1pbHZzdGxyeWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExOTcyNDcsImV4cCI6MjA2Njc3MzI0N30.7JVg6iswOqYZvou0u6DprDUYNSdYLqPYzN1Xbo2tFbA"; // 🔁 Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
