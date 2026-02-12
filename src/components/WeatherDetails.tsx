interface DetailsProps {
  humidity: number
  wind: number
}

export default function WeatherDetails({ humidity, wind }: DetailsProps) {
  return (
    <div className="absolute bottom-10 left-0 w-full px-5 flex justify-between">
      <div className="flex items-center w-1/2">
        <i className="bx bx-water text-4xl mr-2"></i>
        <div>
          <span className="text-xl font-medium">{humidity}%</span>
          <p className="text-sm">Humidity</p>
        </div>
      </div>

      <div className="flex items-center w-1/2">
        <i className="bx bx-wind text-4xl mr-2"></i>
        <div>
          <span className="text-xl font-medium">{wind} km/h</span>
          <p className="text-sm">Wind Speed</p>
        </div>
      </div>
    </div>
  )
}
