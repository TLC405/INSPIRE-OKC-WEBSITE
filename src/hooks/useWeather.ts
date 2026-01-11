import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    description: string;
    icon: string;
  };
  daily: {
    high: number;
    low: number;
    sunrise: string;
    sunset: string;
  };
  location: string;
  timestamp: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase.functions.invoke("okc-weather");

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setWeather(data);
        setError(null);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError("Failed to load weather");
        // Set fallback data
        setWeather({
          current: {
            temp: 72,
            feels_like: 74,
            humidity: 45,
            wind_speed: 12,
            description: "Partly cloudy",
            icon: "⛅",
          },
          daily: {
            high: 78,
            low: 58,
            sunrise: "6:45 AM",
            sunset: "8:15 PM",
          },
          location: "Oklahoma City, OK",
          timestamp: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { weather, loading, error };
};
