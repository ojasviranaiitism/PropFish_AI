<div align="center">

<img src="https://img.shields.io/badge/🐟-PropFish_AI-0ea5e9?style=for-the-badge&labelColor=0f172a&color=0ea5e9" alt="PropFish AI" height="50"/>

# PropFish AI

**An Autonomous AI-Powered Real Estate Advisor**

*Discover and evaluate properties through natural language — no filters, no friction.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=flat-square&logo=vercel)](https://prop-fish-ai-client.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-ojasviranaiitism%2FPropFish__AI-181717?style=flat-square&logo=github)](https://github.com/ojasviranaiitism/PropFish_AI)
[![CSS](https://img.shields.io/badge/CSS-68.6%25-1572B6?style=flat-square&logo=css3)](https://github.com/ojasviranaiitism/PropFish_AI)
[![JavaScript](https://img.shields.io/badge/JavaScript-30.4%25-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://github.com/ojasviranaiitism/PropFish_AI)
[![HTML](https://img.shields.io/badge/HTML-1.0%25-E34F26?style=flat-square&logo=html5&logoColor=white)](https://github.com/ojasviranaiitism/PropFish_AI)

[🌐 Live App](https://prop-fish-ai-client.vercel.app/) · [🐛 Report Bug](https://github.com/ojasviranaiitism/PropFish_AI/issues) · [✨ Request Feature](https://github.com/ojasviranaiitism/PropFish_AI/issues)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running Locally](#running-locally)
- [How It Works](#-how-it-works)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

**PropFish AI** is an autonomous, AI-powered web application that acts as your personal smart real estate advisor. Instead of clicking through filters and comparison tables, users simply describe what they want in plain English — and PropFish does the rest.

PropFish intelligently parses your intent, fetches relevant property listings, evaluates them, and responds with curated results — all through a conversational, chat-style interface.

> **"Find me a 2BHK under ₹60 lakhs near a metro station in Pune"**
> PropFish understands this. Instantly.

Whether you're a first-time buyer, an investor hunting for high-yield rentals, or someone exploring a new city — PropFish AI cuts through the noise and surfaces properties that actually match your needs, with AI-generated reasoning for each recommendation.

---

## ✨ Features

- 🗣️ **Natural Language Queries** — Search for properties using plain English; no complex filter UI required
- 🤖 **Autonomous AI Advisor** — The AI agent evaluates each result and explains *why* it's a good match
- 📊 **Smart Property Evaluation** — Properties are scored on location, price-to-value, amenities, and more
- 💬 **Conversational Interface** — Ask follow-up questions and refine results mid-session, like talking to a broker
- 🗺️ **Location-Aware Search** — Results are geographically contextualized with area-level insights
- 📈 **Market Context** — AI commentary includes demand signals and price trend data for each area
- 📋 **Property Comparison** — Compare shortlisted properties side-by-side with AI-generated analysis
- ⚡ **Fast, Lightweight Frontend** — Pure HTML/CSS/JS with no framework overhead for instant load times
- ☁️ **Deployed on Vercel** — Production-ready, globally distributed via Vercel CDN

---

## 🎬 Live Demo

🔗 **[https://prop-fish-ai-client.vercel.app/](https://prop-fish-ai-client.vercel.app/)**

Try these example queries in the app:

```
"3BHK apartments in Bangalore under ₹80 lakhs with parking"
"Best areas to invest in Mumbai for rental income"
"Compare property options in Whitefield vs Sarjapur Road"
"What's the average price per sqft in Koramangala?"
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Role |
|---|---|
| **HTML5** | Semantic page structure and entry point |
| **CSS3** | Custom styling, animations, and responsive layout |
| **Vanilla JavaScript** | DOM manipulation, API calls, and chat UI logic |

> The frontend is intentionally framework-free — fast initial load, zero build step, and easy to extend.

### Backend
| Technology | Role |
|---|---|
| **Node.js / Python** | Backend runtime (see `backend/` folder) |
| **TinyFish API** | Real-time property listings, search, and filters via the TinyFish property data API |
| **LLM / AI API** | Natural language understanding and property evaluation |
| **REST API** | JSON endpoints consumed by the frontend |

### Infrastructure
| Technology | Role |
|---|---|
| **Vercel** | Frontend deployment and global CDN |
| **Environment Variables** | Secure API key and configuration management |

---

## 📁 Project Structure

```
PropFish_AI/
│
├── frontend/                   # Client-side application
│   ├── index.html              # Main HTML shell
│   ├── style.css               # All styles — layout, components, animations
│   └── app.js                  # App logic: chat UI, API calls, state management
│
├── backend/                    # Server-side application
│   ├── index.js / main.py      # Entry point — starts the server
│   ├── routes/                 # API route definitions
│   │   ├── search.js           # POST /api/search — property search handler
│   │   └── chat.js             # POST /api/chat  — conversational AI handler
│   ├── services/               # Core business logic
│   │   ├── aiService.js        # LLM integration, prompt engineering
│   │   └── propertyService.js  # Property data fetching and transformation
│   └── .env.example            # Template for required environment variables
│
├── dist/                       # Production build artifacts
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16 or above (or Python 3.10+ if backend is Python-based)
- [Git](https://git-scm.com/)
- `npm` or `yarn`

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/ojasviranaiitism/PropFish_AI.git
cd PropFish_AI
```

**2. Install backend dependencies**

```bash
cd backend
npm install
# OR if Python-based:
# pip install -r requirements.txt
```

**3. The frontend requires no installation** — it's plain HTML/CSS/JS.

### Environment Setup

**1. Copy the example environment file**

```bash
cd backend
cp .env.example .env
```

**2. Fill in your values in `.env`**

```env
# ── AI / LLM Provider ─────────────────────────────────
OPENAI_API_KEY=your_openai_api_key_here
# OR
GEMINI_API_KEY=your_gemini_api_key_here

# ── Property Data Source ───────────────────────────────
PROPERTY_API_KEY=your_property_api_key
PROPERTY_API_BASE_URL=https://api.yourpropertydata.com/v1

# ── App Config ─────────────────────────────────────────
PORT=8000
NODE_ENV=development
```

> ⚠️ **Never commit your `.env` file.** It is already excluded by `.gitignore`.

### Running Locally

**Terminal 1 — Start the backend:**

```bash
cd backend
npm run dev
# OR for Python:
# uvicorn main:app --reload
```

Backend will be available at `http://localhost:8000`.

**Terminal 2 — Serve the frontend:**

```bash
# Using npx serve (easiest)
npx serve frontend/

# OR Python's built-in server
cd frontend && python -m http.server 3000

# OR just open frontend/index.html directly in your browser
```

Open [http://localhost:3000](http://localhost:3000) and start chatting with PropFish AI.

---

## ⚙️ How It Works

PropFish AI follows an **agentic loop** where the AI actively reasons about how to respond to each property query:

```
┌──────────────────────────────────────────────────────────────┐
│                       User (Browser)                         │
│           Types a natural language property query            │
└─────────────────────────┬────────────────────────────────────┘
                          │  HTTP POST /api/chat
┌─────────────────────────▼────────────────────────────────────┐
│                        Backend API                           │
│                                                              │
│  1. Receives the raw query from the frontend                 │
│  2. Sends it to the LLM with a real estate system prompt     │
│  3. LLM extracts intent: location, budget, BHK, amenities    │
│  4. Backend queries Property API with structured params      │
│  5. LLM evaluates returned listings against user's needs     │
│  6. Generates a natural language response with reasoning     │
└─────────────────────────┬────────────────────────────────────┘
                          │  JSON response
┌─────────────────────────▼────────────────────────────────────┐
│                      Frontend UI                             │
│    Renders property cards, AI summary, deal context          │
└──────────────────────────────────────────────────────────────┘
```

**Key design decisions:**

- **Prompt Engineering** — The backend uses carefully crafted system prompts that ground the LLM in real estate domain knowledge, producing structured and contextually relevant responses.
- **Intent Parsing** — Rather than rigid keyword matching, PropFish uses the LLM to extract structured search parameters (city, budget, property type, preferred amenities) from free-form user text.
- **Evaluation Layer** — After fetching listings, a second AI pass narrates each property and explains *why* it matches (or doesn't match) the user's stated requirements.
- **Client-Side Session Memory** — The frontend maintains conversation history locally and sends it with each API request, enabling natural follow-up questions without server-side session storage.

---

## ☁️ Deployment

### Frontend — Vercel (Current Setup)

The frontend is deployed at [prop-fish-ai-client.vercel.app](https://prop-fish-ai-client.vercel.app/).

To deploy your own fork:

1. Fork this repository on GitHub
2. Import the fork at [vercel.com/new](https://vercel.com/new)
3. Set the **Root Directory** to `frontend/`
4. Click **Deploy**

### Backend — Any Node.js / Python Host

| Platform | Command |
|---|---|
| **Railway** | `railway up` from `backend/` |
| **Render** | Connect repo → set start command → deploy |
| **Fly.io** | `fly launch` from `backend/` |
| **Heroku** | Add a `Procfile` and `git push heroku main` |

After deploying the backend, update the API base URL referenced in `frontend/app.js` to point to your live backend.

---

## 🗺️ Roadmap

- [x] Natural language property search
- [x] AI-powered property evaluation and reasoning
- [x] Conversational follow-up queries
- [x] Responsive CSS-first frontend
- [x] Deployed and live on Vercel
- [ ] User accounts and saved searches
- [ ] Property bookmarking and shortlisting
- [ ] EMI and affordability calculator
- [ ] Interactive map view with property pins
- [ ] Price trend charts by locality
- [ ] WhatsApp / Telegram bot interface
- [ ] Mobile-first PWA support
- [ ] Multilingual support

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature`
5. **Open a Pull Request** against `main`

Please keep PRs focused and include a clear description of the change. Bug reports and feature requests are also welcome via [GitHub Issues](https://github.com/ojasviranaiitism/PropFish_AI/issues).

---

## 📄 License

This project is open source. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built by [Ojasvi Rana](https://github.com/ojasviranaiitism) · IIT ISM Dhanbad

🌐 **[Try PropFish AI →](https://prop-fish-ai-client.vercel.app/)**

*Found it useful? Give it a ⭐ on [GitHub](https://github.com/ojasviranaiitism/PropFish_AI)!*

</div>
