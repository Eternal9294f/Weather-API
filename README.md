#WeatherMood

A simple weather application exploring a small question:

What if a weather app could tell you how the day might feel, instead of just showing you the numbers?

Live: YOUR_VERCEL_URL

---

#Why I built this

I've always liked the idea of working remotely and moving between different cities.

But when you're deciding where to spend your day, or even planning something outdoors, knowing the temperature alone doesn't tell you much.

A day can be 28°C and still feel uncomfortable because of humidity or wind.

That got me thinking:

Can weather data be translated into something people can understand at a glance?

So I built WeatherMood.

The idea was to take familiar weather measurements and turn them into a simple interpretation of the day's conditions.

Not another weather dashboard full of numbers.

Something a little more human.

---

#What I built

WeatherMood lets users search for a city and see its current weather conditions.

The application also provides shortcuts to the top 10 cities, making it easier to explore different locations.

Along with the usual weather information, it displays a mood based on three variables:

* Temperature
* Humidity
* Wind speed

The mood is classified into five categories:

* Pleasant
* Hot
* Cold
* Windy
* Uncomfortable

The idea is simple:

Instead of making someone interpret three different measurements, give them a quick sense of what those conditions might mean.

---

#The idea behind it

Weather data is useful, but raw numbers don't always communicate the full experience.

For example:

28°C tells you the temperature.

But it doesn't tell you whether the combination of temperature, humidity, and wind might make the day feel uncomfortable.

That's where the mood classification comes in.

I used predefined conditions to interpret these three weather variables and assign a mood to the current weather.

It's not meant to be a scientific measure of how someone will feel.

It's a small experiment in making information easier to interpret.

I also included the raw and formatted JSON API response so users can see the actual data behind the interface.

The goal was to make the data understandable without hiding where it came from.

---

#What I learned?

This project made me think about the difference between displaying information and making information useful.

An API can return hundreds of data points.

But users don't necessarily need to see all of them.

Sometimes the interesting part is figuring out:

* Which information actually matters?
* How should it be presented?
* Can multiple data points be combined into something simpler?
* How do you make an interpretation useful without making it misleading?

It also gave me practical experience working with external APIs, handling JSON responses, and connecting data to frontend application logic.

Most importantly, it reinforced an idea I'm interested in as someone moving towards Product Management:

A useful product doesn't always need more data. Sometimes it needs a better way to explain the data it already has.

---

#What I would improve?

If I continued building WeatherMood, I'd explore:

* Weather forecasts for upcoming days
* More nuanced mood classification
* Location-based weather detection
* Weather-based activity suggestions
* Comparing weather across multiple cities
* Personalised recommendations based on weather conditions

Eventually, I'd want to move beyond:

"What's the weather like?"

to:

"What can I actually do with my day?"

---

#Why this project matters to me?

I didn't build WeatherMood to compete with established weather applications.

I built it because I find interesting product opportunities in everyday problems.

Weather is something people check regularly.

But the experience of checking weather can be more useful than simply reading a temperature.

A small change in how information is interpreted can change how someone uses a product.

That's the kind of thinking I want to keep exploring:

Taking something familiar, identifying what could be more useful, and building a simple experience around that idea.

---

Tech

"HTML5" · "CSS3" · "JavaScript" · "WeatherAPI" · "JSON" · "Vercel"

Built as a small experiment in API integration, data interpretation, and user experience.
