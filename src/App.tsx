import { useState } from "react";

interface WeatherResponse {
  weather: { main: string; description: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

const API_KEY = '24e1fbb280bbd63e3bd0bb11a9576d54'; 

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (response.status === 404) {
        setError(true);
        setWeather(null);
        return;
      }

      const data: WeatherResponse = await response.json();
      setWeather(data);
      setError(false);
    } catch {
      setError(true);
      setWeather(null);
    }
  };

  const getWeatherImage = () => {
    if (!weather) return "/images/cloud.png";

    const main = weather.weather[0].main;
    switch (main) {
      case "Clear":
        return "/images/clear.png";
      case "Rain":
        return "/images/rain.png";
      case "Snow":
        return "/images/snow.png";
      case "Clouds":
        return "/images/cloud.png";
      case "Mist":
      case "Haze":
        return "/images/mist.png";
      default:
        return "/images/cloud.png";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-cover bg-center bg-[url('/images/background.jpg')]">
      <div
        className={`relative w-full max-w-md ${
          weather || error ? "h-[550px]" : "h-[120px]"
        } bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 text-white transition-all duration-700`}
      >
        {/* SEARCH */}
        <div className="relative w-full h-14 flex items-center">
          <i className="bx bxs-map absolute left-3 text-2xl"></i>

          <input
            type="text"
            placeholder="Enter your location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchWeather();
            }}
            className="w-full h-full bg-transparent border-2 border-white/20 rounded-lg text-xl uppercase font-medium pl-11 pr-12 outline-none placeholder-white"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              fetchWeather();
            }}
            className="absolute right-0 h-full w-12 text-2xl flex items-center justify-center"
            aria-label="Search city"
          >
            <i className="bx bx-search"></i>
          </button>
        </div>

        {/* NOT FOUND */}
        {error && (
          <div className="absolute top-24 left-0 w-full text-center">
            <img
              src="/images/404.png"
              alt="Not found"
              className="w-2/3 mx-auto"
            />
            <p className="text-xl mt-3">Oops! Location not found</p>
          </div>
        )}

        {/* WEATHER */}
        {weather && !error && (
          <>
            <div className="text-center mt-10 transition-opacity duration-700">
              <img
                src={getWeatherImage()}
                alt="Weather"
                className="w-3/5 mx-auto"
              />

              <p className="text-6xl font-bold mt-5">
                {Math.round(weather.main.temp)}
                <span className="text-2xl">°C</span>
              </p>

              <p className="text-xl capitalize mt-2">
                {weather.weather[0].description}
              </p>
            </div>

            {/* DETAILS */}
            <div className="absolute bottom-10 left-0 w-full px-5 flex justify-between">
              <div className="flex items-center w-1/2">
                <i className="bx bx-water text-4xl mr-2"></i>
                <div>
                  <span className="text-xl font-medium">
                    {weather.main.humidity}%
                  </span>
                  <p className="text-sm">Humidity</p>
                </div>
              </div>

              <div className="flex items-center w-1/2">
                <i className="bx bx-wind text-4xl mr-2"></i>
                <div>
                  <span className="text-xl font-medium">
                    {weather.wind.speed} km/h
                  </span>
                  <p className="text-sm">Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
