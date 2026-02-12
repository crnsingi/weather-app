import { useState } from "react"
import Search from "./components/Search"
import NotFound from "./components/NotFound"
import Weather from "./components/Weather"
import WeatherDetails from "./components/WeatherDetails"

interface WeatherResponse {
  weather: { main: string; description: string }[]
  main: { temp: number; humidity: number }
  wind: { speed: number }
}

const API_KEY = '24e1fbb280bbd63e3bd0bb11a9576d54';

export default function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [error, setError] = useState(false)

  const fetchWeather = async () => {
    if (!city.trim()) return

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      )

      if (!response.ok) {
        setError(true)
        setWeather(null)
        return
      }

      const data: WeatherResponse = await response.json()
      setWeather(data)
      setError(false)
    } catch {
      setError(true)
      setWeather(null)
    }
  }

  const getWeatherImage = () => {
    if (!weather) return "/images/cloud.png"

    const main = weather.weather[0].main
    switch (main) {
      case "Clear":
        return "/images/clear.png"
      case "Rain":
        return "/images/rain.png"
      case "Snow":
        return "/images/snow.png"
      case "Clouds":
        return "/images/cloud.png"
      case "Mist":
      case "Haze":
        return "/images/mist.png"
      default:
        return "/images/cloud.png"
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-cover bg-center bg-[url('/images/background.jpg')]">
      <div
        className={`relative w-full max-w-md ${
          weather || error ? "h-[550px]" : "h-[120px]"
        } bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 text-white transition-all duration-700`}
      >
        <Search city={city} setCity={setCity} onSearch={fetchWeather} />

        {error && <NotFound />}

        {weather && !error && (
          <>
            <Weather
              temp={weather.main.temp}
              description={weather.weather[0].description}
              image={getWeatherImage()}
            />

            <WeatherDetails
              humidity={weather.main.humidity}
              wind={weather.wind.speed}
            />
          </>
        )}
      </div>
    </div>
  )
}
