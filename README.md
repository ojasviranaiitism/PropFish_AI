<div align="center">

<img src="https://img.shields.io/badge/🐟-PropFish_AI-0ea5e9?style=for-the-badge&labelColor=0f172a&color=0ea5e9" alt="PropFish AI" height="50"/>

# PropFish AI

**Autonomous AI-Powered Real Estate Advisor**

*Describe what you want. Get properties that match. No filters, no friction.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=flat-square&logo=vercel)](https://prop-fish-ai-client.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-PropFish__AI-181717?style=flat-square&logo=github)](https://github.com/ojasviranaiitism/PropFish_AI)
![CSS](https://img.shields.io/badge/CSS-68.6%25-1572B6?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JS-30.4%25-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**[🌐 Try it Live](https://prop-fish-ai-client.vercel.app/)** · **[🐛 Report Bug](https://github.com/ojasviranaiitism/PropFish_AI/issues)** · **[✨ Request Feature](https://github.com/ojasviranaiitism/PropFish_AI/issues)**

</div>

---

## What is PropFish?

PropFish is a conversational real estate assistant. Type what you're looking for — the AI handles the rest: parsing your intent, fetching listings, evaluating each property, and explaining *why* it's a good match.

> **"Find me a 2BHK under ₹60 lakhs near a metro station in Pune"**
> PropFish understands this. Instantly.

---

## ✨ Features

| | |
|---|---|
| 🗣️ **Natural Language Search** | No filter UI — just type what you want |
| 🤖 **AI Property Evaluation** | Each result comes with reasoning, not just data |
| 💬 **Conversational Follow-ups** | Refine results mid-session like talking to a broker |
| 📈 **Market Context** | Area-level demand signals and price trend commentary |
| 📋 **Side-by-Side Comparison** | Compare shortlisted properties with AI analysis |
| ⚡ **Zero-Framework Frontend** | Pure HTML/CSS/JS — fast load, no build step |

---

## 🎬 Try These Queries

```
"3BHK apartments in Bangalore under ₹80 lakhs with parking"
"Best areas to invest in Mumbai for rental income"
"Compare Whitefield vs Sarjapur Road"
"Average price per sqft in Koramangala?"
```

---

## 🛠️ Tech Stack

**Frontend** — HTML5, CSS3, Vanilla JS (no framework)

**Backend** — Node.js / Python · TinyFish Property API · LLM API

**Infrastructure** — Vercel (frontend CDN) · Environment-variable-based config

---

## 🚀 Getting Started

```bash
# 1. Clone
git clone https://github.com/ojasviranaiitism/PropFish_AI.git
cd PropFish_AI

# 2. Install backend deps
cd backend && npm install

# 3. Set up environment
cp .env.example .env   # fill in your API keys

# 4. Run backend
npm run dev            # http://localhost:8000

# 5. Serve frontend (new terminal)
npx serve frontend/    # http://localhost:3000
```

**Required `.env` keys:**
```env
OPENAI_API_KEY=...         # or GEMINI_API_KEY
PROPERTY_API_KEY=...
PROPERTY_API_BASE_URL=...
PORT=8000
```

---

## ⚙️ How It Works

```
User Query → Backend → LLM extracts intent → Property API fetch
         → LLM evaluates listings → Natural language response → UI
```

1. **Intent Parsing** — LLM extracts city, budget, BHK, amenities from free-form text
2. **Property Fetch** — Structured params sent to the property data API
3. **Evaluation Pass** — Second AI pass narrates each listing and scores the match
4. **Session Memory** — Conversation history lives client-side; sent with each request for follow-up context

---

## ☁️ Deployment

**Frontend → Vercel**
Fork the repo → Import at [vercel.com/new](https://vercel.com/new) → Set root to `frontend/` → Deploy.

**Backend → Railway / Render / Fly.io / Heroku**
Deploy from `backend/`, then update the API base URL in `frontend/app.js`.

---

## 🗺️ Roadmap

- [x] Natural language search & AI evaluation
- [x] Conversational follow-ups
- [x] Live on Vercel
- [ ] User accounts & saved searches
- [ ] EMI / affordability calculator
- [ ] Interactive map with property pins
- [ ] Price trend charts by locality
- [ ] WhatsApp / Telegram bot
- [ ] PWA + multilingual support

---

## 📄 License

Open source. See [LICENSE](LICENSE) for details.

---

<div align="center">

🌐 **[Try PropFish AI →](https://prop-fish-ai-client.vercel.app/)**

*Found it useful? Drop a ⭐ on [GitHub](https://github.com/ojasviranaiitism/PropFish_AI)!*

</div>
