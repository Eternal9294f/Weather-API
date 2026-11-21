# WeatherMood ⚡

> **"Weather isn't just a number. It's how the world feels."**  
> *Translating sterile meteorological telemetry into intuitive human perception.*

---

### Tech Stack & Tooling

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript ES6+](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WeatherAPI](https://img.shields.io/badge/WeatherAPI-00B4D8?style=for-the-badge&logo=icloud&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-00E599?style=for-the-badge)

---

## The Core Question

What if a weather application told you **how the day actually feels**, instead of making you do mental math over raw numbers?

* **Live Deployment**: `YOUR_VERCEL_URL`
* **Architecture**: Serverless Edge Proxy &bull; Zero Client Secret Leaks &bull; CRED-inspired Dark Aesthetics

---

## Why I Built This

I have always been drawn to the freedom of working remotely and exploring different cities.

However, whenever you are deciding where to spend your day, packing your bag, or planning an outdoor route, knowing the raw temperature alone tells you remarkably little.

* A day can read **28°C** and feel radiant and energizing if the air is crisp with a gentle breeze.
* That exact same **28°C** can feel suffocating and exhausting if the relative humidity is 80%.

That got me thinking from a Product Management perspective:

> **Can complex environmental data be synthesized into something humans understand at a glance?**

So I created **WeatherMood**.

The goal was not to build another generic weather dashboard packed with sterile gauges and decimal points. The goal was to build something grounded in human experience—a quiet, minimalist product that translates data into mood.

---

## What I Built

**WeatherMood** is an atmospheric sensory web application designed with a sleek, CRED-inspired dark aesthetic and subtle cultural undertones (*Attack on Titan* & *Berserk* atmosphere):

1. **Global City Telemetry**: Users can search for any city, coordinate, or region worldwide with instant real-time feedback.
2. **Top 10 Curated Metropolises**: Clickable shortcut chips (Tokyo, London, New York, Paris, Dubai, Mumbai, Singapore, Sydney, San Francisco, Berlin) for rapid exploration.
3. **The Multi-Variable Mood Engine**: Combines **Temperature**, **Humidity**, and **Wind Velocity** to generate an intuitive condition verdict:
   * **Pleasant // Band of the Hawk** — Optimal golden equilibrium, comfortable moisture, and gentle breezes.
   * **Cold // Beyond the Wall** — Sharp, sub-zero winter chills demanding heavy cloaks and warmth.
   * **Windy // Wings of Freedom** — Fast-moving pressure currents and unchained momentum.
   * **Stormy // The Rumbling** — Electrified skies, distant thunder, and high-voltage atmospheric drama.
   * **Uncomfortable // The Eclipse** — Heavy tropical moisture trapping oppressive summer heat.
4. **Developer Telemetry Inspector**: Dual tabs for **Formatted JSON** (syntax-highlighted in terminal styling) and **Raw JSON** payload with a one-click copy button.
5. **Interactive Unit Toggle**: Instantaneous switching between Celsius (°C) and Fahrenheit (°F) with zero re-fetching latency.
6. **In-App PM Case Study Drawer**: An interactive modal embedded directly into the header detailing product requirements, threshold matrices, and security decisions for interview discussions.

---

## The Philosophy Behind the Product

Data is only as valuable as the decisions it empowers.

Raw numbers inform, but **context guides action**:
* **28°C** is merely an isolated data point.
* **28°C + 82% Humidity + 6 km/h Wind** is an uncomfortable thermal blanket.

Rather than forcing the user to mentally cross-reference three separate charts, WeatherMood’s classification engine evaluates these variables simultaneously to deliver immediate clarity.

At the same time, I believe in **product transparency**. By providing the developer JSON inspector, users can inspect the exact telemetry payload returned by WeatherAPI. We make the data intuitive without hiding the engineering reality behind the curtain.

---

## What I Learned (Product & Technical Takeaways)

Building WeatherMood reinforced foundational lessons in digital product craft:

* **Information vs. Utility**: An API can return 60+ parameters (dew point, hectopascals, UV indices, wind gusts). A product manager's job is not to display everything, but to discern what actually drives user value.
* **Cognitive Load Reduction**: Good design minimizes mental translation steps. Moving from raw numbers to sensory states reduces cognitive friction.
* **Edge Security by Design**: Rather than exposing API credentials in frontend bundles, I architected a serverless Edge proxy route (`/api/weather`) that reads environment variables securely and applies 60-second caching headers.
* **Sensory Branding**: Giving an application an evocative identity—combining the clean minimalism of fintech design with memorable cultural touches—makes a utility product memorable.

---

## Future Roadmap & What I Would Improve

If I continue expanding WeatherMood, the next iterations would focus on:

* [ ] **Multi-Day Mood Trajectories**: Showing whether tomorrow's mood will improve or worsen.
* [ ] **Activity Recommendations**: Moving from *"What's the weather like?"* to *"What can I do today?"* (e.g., optimal running hours, café work windows).
* [ ] **City Comparison Split-View**: Side-by-side mood comparisons between two cities for digital nomads.
* [ ] **Automated Geolocation**: Optional one-tap local radar detection.

---

## Why This Project Matters to Me

I didn't build WeatherMood to compete with multi-million-dollar weather corporations.

I built it because I find fascinating product opportunities in everyday routines. Weather is something humanity checks daily, yet the interface has remained largely unchanged for a decade.

A thoughtful change in how information is synthesized can fundamentally improve how someone starts their day. That is the kind of product thinking I bring to every challenge: **taking the familiar, questioning the default, and designing a more human experience.**

---

### Local Development Quickstart

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Eternal9294f/Weather-API.git
   cd Weather-API
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Add your WEATHER_API_KEY inside .env
   ```

3. **Run the local server**:
   ```bash
   node server.js
   ```
   Open `http://localhost:3000` in your browser.

4. **Run automated tests**:
   ```bash
   npm test
   ```

---

*Crafted with attention to product detail, telemetry integrity, and clean UX.*
