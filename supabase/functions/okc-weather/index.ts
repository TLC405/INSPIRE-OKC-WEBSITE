import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Oklahoma City coordinates
const OKC_LAT = 35.4676;
const OKC_LON = -97.5164;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Use Open-Meteo API (free, no API key required)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${OKC_LAT}&longitude=${OKC_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FChicago`;

    const response = await fetch(weatherUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    // Map weather codes to descriptions and icons
    const weatherDescriptions: Record<number, { description: string; icon: string }> = {
      0: { description: "Clear sky", icon: "☀️" },
      1: { description: "Mainly clear", icon: "🌤️" },
      2: { description: "Partly cloudy", icon: "⛅" },
      3: { description: "Overcast", icon: "☁️" },
      45: { description: "Foggy", icon: "🌫️" },
      48: { description: "Depositing rime fog", icon: "🌫️" },
      51: { description: "Light drizzle", icon: "🌧️" },
      53: { description: "Moderate drizzle", icon: "🌧️" },
      55: { description: "Dense drizzle", icon: "🌧️" },
      61: { description: "Slight rain", icon: "🌧️" },
      63: { description: "Moderate rain", icon: "🌧️" },
      65: { description: "Heavy rain", icon: "🌧️" },
      66: { description: "Freezing rain", icon: "🌨️" },
      67: { description: "Heavy freezing rain", icon: "🌨️" },
      71: { description: "Slight snow", icon: "❄️" },
      73: { description: "Moderate snow", icon: "❄️" },
      75: { description: "Heavy snow", icon: "❄️" },
      77: { description: "Snow grains", icon: "❄️" },
      80: { description: "Slight rain showers", icon: "🌦️" },
      81: { description: "Moderate rain showers", icon: "🌦️" },
      82: { description: "Violent rain showers", icon: "⛈️" },
      85: { description: "Slight snow showers", icon: "🌨️" },
      86: { description: "Heavy snow showers", icon: "🌨️" },
      95: { description: "Thunderstorm", icon: "⛈️" },
      96: { description: "Thunderstorm with hail", icon: "⛈️" },
      99: { description: "Thunderstorm with heavy hail", icon: "⛈️" },
    };

    const currentCode = data.current.weather_code;
    const weatherInfo = weatherDescriptions[currentCode] || { description: "Unknown", icon: "🌡️" };

    const weatherData = {
      current: {
        temp: Math.round(data.current.temperature_2m),
        feels_like: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        wind_speed: Math.round(data.current.wind_speed_10m),
        description: weatherInfo.description,
        icon: weatherInfo.icon,
      },
      daily: {
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0]),
        sunrise: data.daily.sunrise[0],
        sunset: data.daily.sunset[0],
      },
      location: "Oklahoma City, OK",
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(weatherData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Weather fetch error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch weather data" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
