import { useWeather } from "@/hooks/useWeather";
import { Wind, Droplets, Sun, Moon } from "lucide-react";

export const WeatherWidget = () => {
  const { weather, loading } = useWeather();

  if (loading) {
    return (
      <div className="weather-widget animate-pulse">
        <div className="h-32 flex items-center justify-center">
          <div className="text-4xl animate-spin">🌀</div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="weather-widget relative overflow-hidden">
      {/* Noise overlay */}
      <div className="noise absolute inset-0" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">
              Right Now in
            </p>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              {weather.location}
            </h3>
          </div>
          <span className="text-5xl">{weather.current.icon}</span>
        </div>

        {/* Main temp */}
        <div className="flex items-end gap-4 mb-6">
          <span className="text-7xl font-black text-white leading-none">
            {weather.current.temp}°
          </span>
          <div className="pb-2">
            <p className="text-white font-bold">{weather.current.description}</p>
            <p className="text-white/70 text-sm">
              Feels like {weather.current.feels_like}°
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-white/70" />
            <span className="text-white text-sm">
              {weather.current.wind_speed} mph
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-white/70" />
            <span className="text-white text-sm">
              {weather.current.humidity}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-xs">H:</span>
            <span className="text-white text-sm font-bold">
              {weather.daily.high}°
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-xs">L:</span>
            <span className="text-white text-sm font-bold">
              {weather.daily.low}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
