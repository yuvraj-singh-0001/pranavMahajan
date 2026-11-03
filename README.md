# Pranav Mahajan — Official Web Application

Official website for **Pranav Mahajan** (Motivational Keynote Speaker & Urban Mindfulness Mentor).

Inspired by the serene dawn aesthetic of Gaur Gopal Das and the dynamic sliding architectural transitions of Lishbos Technologies.

## 🌟 Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide React, Google Fonts (Caveat, Playfair Display, Geist)
- **Backend**: Node.js, Express.js, CORS, Dotenv
- **Animations**: CSS hardware-accelerated continuous sliding track (`transform: translateX`), cubic-bezier easing

## 🚀 Experience Structure
- **Slide 01**: The Inner Sanctuary (Welcome & Philosophical Monologue)
- **Slide 02**: Books by Pranav Mahajan (*The Unstoppable Mind*, *The Sacred Pause*, *Conscious Leadership*)
- **Slide 03**: Keynote Presentations (*The Unstoppable Mind in Chaos* + Impact Metrics)
- **Slide 04**: Upcoming Events & World Tour (Dubai Opera, Rishikesh Sacred Retreat, Singapore Expo)
- **Slide 05**: Soul-to-Soul Connection & Speaking Inquiries (Booking Contact Form)

## 🛠️ Local Development

### 1. Client
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 2. Server
```bash
cd server
npm install
npm run dev
```
Create `server/.env` from `server/.env.example` and set `MONGODB_URI` to your local MongoDB or Atlas connection string. The API waits for MongoDB before it starts on [http://localhost:5000](http://localhost:5000).

Role inquiry endpoints are `POST /api/inquiries/student`, `/individual`, `/school`, `/corporate`, `/government`, `/ngo`, and `/parent`. Submitted inquiries are saved in the MongoDB `inquiries` collection with their selected role. `GET /api/portfolio` serves the portfolio data, and `GET /health` checks API availability.

For the client, set `NEXT_PUBLIC_API_URL=http://localhost:5000/api` in `client/.env.local` (or use the same value from `client/.env.example`).
