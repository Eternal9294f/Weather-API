WeatherMood 🌤️

A small experiment in turning weather data into something you can actually feel.

"Live Demo" (YOUR_VERCEL_URL) · "GitHub Repository" (YOUR_GITHUB_URL)

---

Overview

WeatherMood is a responsive, API-powered weather application that transforms live weather data into a simple, human-readable experience.

The idea is straightforward: knowing the temperature doesn't always tell you how a day will feel.

A temperature of 28°C with high humidity and little wind can feel very different from 28°C with comfortable humidity and a pleasant breeze.

WeatherMood combines temperature, humidity, and wind speed to generate a descriptive weather mood, helping users interpret current conditions beyond individual numbers.

The interface takes inspiration from CRED's minimal, premium visual design.

Why I Built This

I've always liked the idea of working remotely, exploring different cities, and spending time in places without being tied to one location.

That makes weather more than just something to check occasionally. It can influence where you go, what you pack, and how you spend your day.

I wanted to explore a simple product question:

What if a weather application could tell you how the day might feel, instead of just telling you the temperature?

That question became the foundation of WeatherMood.

Features

- City Search: Enter a city name to retrieve its current weather.
- Quick City Selection: Choose from 10 predefined cities using clickable chips.
- Live Weather Data: View current temperature, humidity, wind speed, and weather conditions.
- Weather Mood: Generate descriptive moods such as Pleasant, Hot, Cold, Windy, or Uncomfortable using temperature, humidity, and wind speed.
- Raw JSON Response: Inspect the original response received from the weather API.
- Formatted JSON Viewer: Explore the API response in a structured, readable format.
- Responsive Interface: Access the application across desktop and mobile devices.

How It Works

The application follows a simple data flow:

User
  |
  v
City Search / City Selection
  |
  v
WeatherAPI Request
  |
  v
Live Weather JSON Response
  |
  v
Weather Data Extraction
  |
  v
Mood Interpretation
  |
  v
Weather Dashboard

Weather Mood Logic

WeatherMood interprets three key weather variables:

Variable| What it indicates
Temperature| Whether conditions are hot, cold, or moderate
Humidity| How much moisture is present in the air
Wind Speed| How strongly wind may affect outdoor comfort

These variables are evaluated together to generate a descriptive weather mood.

Possible outputs include:

- Pleasant
- Hot
- Cold
- Windy
- Uncomfortable

The mood is an application-generated interpretation, not a separate field returned by the weather API.

API Integration

Weather data is retrieved using "WeatherAPI" (https://www.weatherapi.com/).

Endpoint:

https://api.weatherapi.com/v1/current.json

Query Parameters:

Parameter| Description
"key"| WeatherAPI authentication key
"q"| Selected city name

Example Request:

/current.json?key=YOUR_API_KEY&q=London

The API returns weather information in JSON format, which the application uses to populate the dashboard and generate the weather mood.

Tech Stack

Technology| Purpose
HTML| Application structure
CSS| Styling and responsive layout
JavaScript| Application logic and API integration
WeatherAPI| Live weather data
JSON| API response handling
Vercel| Application deployment

Getting Started

Prerequisites

- A WeatherAPI account and API key.
- A code editor.
- A modern web browser.
- A Vercel account for deployment.

Installation

1. Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

2. Navigate to the project directory:

cd weathermood

3. Configure the WeatherAPI key using the project's environment configuration or server-side proxy.

4. Start the application using an appropriate local development server.

5. Open the application in your browser and search for a city.

Environment Variables

Configure the required credentials in your deployment environment.

WEATHER_API_KEY=your_weather_api_key

Security note: Environment variables used in frontend builds may be exposed to browser users. For private API credentials, route requests through a server-side endpoint. Never commit API keys or deployment tokens to GitHub.

Deployment

The application is deployed using "Vercel" (https://vercel.com/).

Deployment workflow:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables and API integration.
4. Deploy the application.
5. Verify city search, live weather retrieval, mood interpretation, and JSON display.

What I Learned

This project reinforced an important distinction:

Getting an API to work is not the same as building a useful product.

A weather API can return dozens of data points, but users don't necessarily need to interpret all of them.

The interesting challenge was deciding:

- Which variables actually matter to the user?
- How can multiple data points become one understandable interpretation?
- What information should be immediately visible?
- What should remain available for deeper inspection?
- How can an application make raw information more useful?

It also provided hands-on experience with REST API integration, JSON handling, conditional logic, and frontend development.

Future Improvements

Some ideas I'd explore in future iterations:

- Hourly and weekly weather forecasts.
- Saved cities and location comparisons.
- Weather-based activity recommendations.
- Travel-focused city comparisons.
- More nuanced weather mood classifications.
- Historical weather patterns.
- Improved loading, empty, and error states.

The longer-term idea is to move beyond:

"What's the weather like here?"

And get closer to:

"Which city would offer the kind of day I'm looking for?"

Project Status

Initial build focused on live weather retrieval, city selection, weather mood interpretation, and JSON response visualization.

License

No license has been specified yet.

---

WeatherMood

Every forecast has a feeling.
