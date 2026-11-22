# WeatherMood ⚡ &bull; By AN

> **"Built for digital nomads, travelers, and remote explorers landing in new cities."**  
> *Skip the mental math. Know instantly how any destination feels before stepping out to work, explore, or pack.*

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-00E599?style=for-the-badge&logo=github&logoColor=black)](https://eternal9294f.github.io/WeatherMood/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![WeatherAPI](https://img.shields.io/badge/API-WeatherAPI-00B4D8?style=for-the-badge&logo=icloud&logoColor=white)](https://www.weatherapi.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-white?style=for-the-badge)](LICENSE)

🌐 **Live Application**: [https://eternal9294f.github.io/WeatherMood/](https://eternal9294f.github.io/WeatherMood/)  
👤 **Product Lead & Architecture**: **Aditya Naagar** (`By AN`)

---

## 1. Executive Summary

When traveling or working remotely across different cities, checking the weather should answer one practical question: **what will the day actually feel like outside?**

Standard weather applications bombard users with raw numerical metrics—hectopascals, dew points, knot vectors—that demand unnecessary mental translation:

* A temperature reading of **28°C** with a 15 km/h breeze feels radiant and ideal for an outdoor café workspace.
* That exact same **28°C** with 85% relative humidity feels suffocating and exhausting.

**WeatherMood** bridges this gap. It synthesizes temperature, humidity, wind velocity, and condition codes into instant atmospheric felt moods—wrapped in a sleek, CRED-inspired dark interface with subtle cultural atmosphere (*Attack on Titan* & *Berserk* line-art motifs).

---

## 2. Core Capabilities

| Feature | Description | Value Proposition |
| :--- | :--- | :--- |
| **Global City Telemetry** | Full-text query engine supporting any global city, airport code, or coordinates. | Universal exploration with instant sub-second response times. |
| **10 Curated Metropolises** | Clickable shortcut chips (*Tokyo, London, NYC, Paris, Dubai, Mumbai, Singapore, Sydney, SF, Berlin*). | Zero-typing exploration of distinct climate spectrums. |
| **Sensory Mood Engine** | Real-time algorithmic synthesis across temperature, humidity, and wind. | Immediate understanding of felt conditions over raw numbers. |
| **Dual JSON Inspector** | Developer-focused viewport with Syntax-Highlighted JSON and Raw Payload with 1-click copy. | Total product transparency and auditability for technical stakeholders. |
| **Dynamic Unit Engine** | Instant zero-latency switching between Celsius (°C) and Fahrenheit (°F). | Client-side recalculation without redundant network requests. |
| **In-App PM Spec Drawer** | Integrated product specification drawer covering threshold logic and architecture. | Built-in discussion artifact for product management evaluations. |

---

## 3. Atmospheric Mood Matrix

Rather than forcing users to cross-reference multiple gauges, WeatherMood maps telemetry vectors directly to human perception:

| Mood Archetype | Felt Condition | Telemetry Threshold Triggers |
| :--- | :--- | :--- |
| **Band of the Hawk** | Golden Equilibrium | `20°C ≤ Temp ≤ 26°C` AND `Humidity ≤ 60%` AND `Wind ≤ 20 km/h` |
| **The Eclipse** | Sultry Oppression | `Temp ≥ 28°C` AND `Humidity ≥ 70%` |
| **Beyond the Wall** | Arctic Chill | `Temp ≤ 2°C` OR Condition Code: *Snow / Blizzard / Ice* |
| **The Rumbling** | Titan Tempest | Condition Code: *Thunder / Heavy Convective Storms* |
| **Wings of Freedom** | Gale Velocity | `Wind Velocity ≥ 35 km/h` |
| **Rain Over Eldia** | Steady Downpour | Condition Code: *Drizzle / Moderate-to-Heavy Rain* |
| **Scorched Desert** | Arid Radiance | `Temp ≥ 32°C` AND `Humidity < 35%` |
| **Wall Rose** | Temperate Solitude | Default balanced baseline when no extreme vector dominates |

---

## 4. Product & Technical Takeaways

Building WeatherMood provided foundational lessons in product craft and systems architecture:

* **Cognitive Load Reduction**: Moving from isolated numbers to emotional/sensory states eliminates cognitive friction for everyday decision-making.
* **Information vs. Utility**: WeatherAPI provides 60+ parameters. A Product Manager's job is not to display every variable, but to curate the specific signals that drive human value.
* **Zero Client Secret Leaks**: Telemetry requests route through serverless proxies (`/api/weather`) or client key fallbacks, ensuring private API credentials remain protected.
* **Resilient Graceful Degradation**: Architecture automatically adapts between static edge environments (GitHub Pages) and serverless cloud nodes (Vercel/Node.js) without code reconfiguration.

---

## 5. Local Setup & Testing

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/Eternal9294f/WeatherMood.git
cd WeatherMood

# Configure environment variables
cp .env.example .env
# Open .env and add your WEATHER_API_KEY

# Start the local development server
node server.js
```

### Running Automated Test Suite
WeatherMood includes an automated verification test suite validating all 7 mood archetypes and security rules:
```bash
npm test
```

---

## 6. Author & Attribution

* **Architect & Product Lead**: [Aditya Naagar](https://github.com/Eternal9294f) (`By AN`)
* **Project Repository**: [https://github.com/Eternal9294f/WeatherMood](https://github.com/Eternal9294f/WeatherMood)
* **License**: MIT
