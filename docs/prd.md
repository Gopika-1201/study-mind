# StudyMind — AI Study Assistant Requirements Document

## 1. Application Overview

### 1.1 Application Name
StudyMind

### 1.2 Application Description
StudyMind is an AI-powered study assistant web application designed to help students study smarter. The app transforms student notes and topics into multiple learning formats through four intelligent study modes: summaries, quizzes, flashcards, and simplified explanations.

## 2. Core Features

### 2.1 Notes Input Area
- Provide a text area where students can paste their study notes or enter topics they want to learn
- Input content serves as source material for all AI-generated learning content

### 2.2 Study Mode Selection
Four study mode buttons:
- Summarize
- Quiz Me
- Flashcards
- Explain Simply

### 2.3 AI Response Display Area
- Chat area displaying AI-generated responses based on selected study mode
- Shows output results for each study mode interaction
- Displays loading spinner animation while waiting for AI response

### 2.4 Follow-up Question Input
- Input field at the bottom allowing students to ask follow-up questions
- Supports interactive learning and clarification
- Uses the same Groq API key silently in the background

### 2.5 Summarize Mode
- AI analyzes input notes and generates a summary
- Output format: bullet point list highlighting key concepts and takeaways
- System prompt: You are StudyMind. Summarize these student notes into clear bullet points with key takeaways.

### 2.6 Quiz Me Mode
- AI generates 5 multiple choice questions based on input material
- Each question includes clickable answer options
- Students can select answers by clicking options
- Format: Q1: [question] A) B) C) D) Answer: [letter]
- System prompt: You are StudyMind. Create 5 multiple choice questions from these notes. Format: Q1: [question] A) B) C) D) Answer: [letter]

### 2.7 Flashcards Mode
- AI creates 6 flashcards from input content
- Card front: term or concept
- Card back: definition or explanation
- Cards can be flipped to reveal answers
- Format: 1. [Term] A: [Definition]
- System prompt: You are StudyMind. Create 6 flashcards from these notes. Format: 1. [Term] A: [Definition]

### 2.8 Explain Simply Mode
- AI explains topics in a friendly, easy-to-understand manner
- Teaching style: approachable and clear, like a helpful teacher
- System prompt: You are StudyMind. Explain these notes simply like a friendly teacher talking to a 15-year-old student.

## 3. Technical Requirements

### 3.1 Application Architecture
- Pure frontend application
- No login or user authentication required
- No database required
- AI functionality implemented through API calls

### 3.2 API Integration
- API Endpoint: https://api.groq.com/openai/v1/chat/completions
- Model: llama-3.1-8b-instant
- Request Method: POST
- Content-Type: application/json
- Authentication: Authorization: Bearer ${GROQ_API_KEY}
- API key is hardcoded in the application: const GROQ_API_KEY = \"gsk_REPLACE_WITH_YOUR_KEY_HERE\"
- Application calls Groq AI silently in the background; no API key input field should be displayed to users

## 4. Design Requirements

### 4.1 Color Scheme
- Background color: Dark navy blue (#0b0f1a)
- Accent color: Teal/cyan (#38bdf8)
- Overall style: Clean and modern

### 4.2 Interaction Design
- Display loading spinner animation while waiting for AI response
- Clean interface with no API key input field visible to users