export default function NotFound() {
  return (
    <div className="absolute top-24 left-0 w-full text-center">
      <img
        src="/images/404.png"
        alt="Not found"
        className="w-2/3 mx-auto"
      />
      <p className="text-xl mt-3">Oops! Location not found</p>
    </div>
  )
}