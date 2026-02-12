interface SearchProps {
  city: string
  setCity: (value: string) => void
  onSearch: () => void
}

export default function Search({ city, setCity, onSearch }: SearchProps) {
  return (
    <div className="relative w-full h-14 flex items-center">
      <i className="bx bxs-map absolute left-3 text-2xl"></i>

      <input
        type="text"
        placeholder="Enter your location"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch()
        }}
        className="w-full h-full bg-transparent border-2 border-white/20 rounded-lg text-xl uppercase font-medium pl-11 pr-12 outline-none placeholder-white"
      />

      <button
        onClick={onSearch}
        className="absolute right-0 h-full w-12 text-2xl flex items-center justify-center"
        aria-label="Search city"
      >
        <i className="bx bx-search"></i>
      </button>
    </div>
  )
}
