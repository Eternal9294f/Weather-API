/**
 * WeatherMood Vercel Serverless Function
 * Route: /api/weather
 * Query Parameters:
 *   - q: City name or postal code or lat,long (e.g., "Tokyo", "London", "Paris")
 *   - days: Forecast days (default: 3)
 *   - key: (Optional) client override for testing; defaults to process.env.WEATHER_API_KEY
 */

module.exports = async function handler(req, res) {
  // CORS & Content headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: {
        code: 405,
        message: 'Method Not Allowed. WeatherMood accepts only GET requests.'
      }
    });
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const city = url.searchParams.get('q') || url.searchParams.get('city');
    const days = url.searchParams.get('days') || '3';
    const clientKey = url.searchParams.get('key');
    const apiKey = clientKey || process.env.WEATHER_API_KEY;

    if (!city || !city.trim()) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Missing required query parameter "q" (city name).'
        }
      });
    }

    if (!apiKey || !apiKey.trim()) {
      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server configuration error: WEATHER_API_KEY is not defined in environment variables.'
        }
      });
    }

    // Call WeatherAPI.com forecast endpoint with 3 days + alerts
    const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(apiKey.trim())}&q=${encodeURIComponent(city.trim())}&days=${encodeURIComponent(days)}&aqi=no&alerts=yes`;
    
    const response = await fetch(weatherApiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'WeatherMood/1.0'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Edge cache for 60s, client cache for 30s
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    return res.status(200).json(data);

  } catch (err) {
    console.error('WeatherMood Gateway Error:', err);
    return res.status(500).json({
      error: {
        code: 500,
        message: 'Internal gateway error communicating with weather provider.',
        details: err.message
      }
    });
  }
};
