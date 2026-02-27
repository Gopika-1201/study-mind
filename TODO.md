# Task: Rebuild StudyMind with Groq API via Edge Functions

## Plan
- [x] Delete direct API service file
- [x] Create Supabase Edge Function for Groq API
- [x] Update StudyMindPage to call Edge Function
- [x] Verify all text is in English
- [x] Test and run lint

## Notes
- Using Groq API (llama-3.1-8b-instant) via Supabase Edge Function
- API key hardcoded in Edge Function: gsk_REPLACE_WITH_YOUR_KEY_HERE
- No API key input field shown to user
- All API calls through Edge Functions (proper architecture)
- Design: #0b0f1a background, #38bdf8 accent
- Loading spinner during AI processing
- Chat for follow-up questions with conversation context
- All UI text in English
- Lint passed successfully
