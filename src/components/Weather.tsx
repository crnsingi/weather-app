interface WeatherProps {
  temp: number
  description: string
  image: string
}

export default function Weather({ temp, description, image }: WeatherProps) {
  return (
    <div className="text-center mt-10 transition-opacity duration-700">
      <img src={image} alt="Weather" className="w-3/5 mx-auto" />

      <p className="text-6xl font-bold mt-5">
        {Math.round(temp)}
        <span className="text-2xl">°C</span>
      </p>

      <p className="text-xl capitalize mt-2">{description}</p>
    </div>
  )
}
