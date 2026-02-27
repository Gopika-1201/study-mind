📌 The Problem
Students spend hours passively re-reading notes but retain very little.
There is no simple, free tool that instantly converts raw study notes into
active learning materials like summaries, quizzes, or flashcards.

💡 The Solution
StudyMind is an AI-powered web app where students paste their notes
and instantly get smart study materials — no login, no setup, no cost.

✨ Features
ModeWhat it does📋 SummarizeExtracts key points and takeaways from your notes🧩 Quiz MeGenerates 5 interactive multiple-choice questions🃏 FlashcardsCreates flippable term and definition cards💡 Explain SimplyRewrites complex content in plain, simple language💬 Ask AIFollow-up chat to ask questions about your notes

🛠️ Tech Stack
LayerTechnologyFrontendReact 18 + TypeScript + Tailwind CSSBackendSupabase Edge Functions (Deno)AI ModelGroq API — Llama 3.1 8B InstantBuild ToolViteHostingVercel (frontend) + Supabase (backend)Built WithMeDo (no-code AI app builder)

🚀 How It Works
Student pastes notes
        ↓
Clicks a study mode button (Summarize / Quiz / Flashcards / Explain)
        ↓
Frontend calls Supabase Edge Function
        ↓
Edge Function calls Groq AI (Llama 3.1) with the notes
        ↓
AI response displayed instantly to the student
No API key input needed from the student — everything works automatically.

📁 Project Structure
studymind/
├── src/
│   ├── pages/
│   │   └── StudyMindPage.tsx   ← Main app page
│   ├── components/             ← UI components
│   ├── services/               ← API service calls
│   ├── hooks/                  ← Custom React hooks
│   └── App.tsx                 ← App entry point
├── supabase/
│   └── functions/
│       └── groq-chat/
│           └── index.ts        ← Groq AI Edge Function
├── public/
├── index.html
├── package.json
└── vite.config.ts

🌐 Live Demo
🔗 studymind-yourname.vercel.app

🏆 Hackathon
This project was built for the CodeSprout Beginner's Hackathon 2026
hosted on Devpost.

Theme: Build for Everyday Life
Category: Student Support Tool
Tech: React, Supabase, Groq AI, Vite


📄 License
MIT License — free to use, modify, and distribute.

"Study smarter, not harder." 🧠