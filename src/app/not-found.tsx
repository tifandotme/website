import { FaArrowLeft } from "react-icons/fa6"

export default function NotFound() {
  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-10">
        <h1 className="text-xl font-semibold text-gray-800">
          404 - Page Not Found
        </h1>
        <a
          className="group mb-10 inline-flex flex-row items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium transition active:scale-95"
          href="/"
        >
          <FaArrowLeft
            size={15}
            className="transition group-hover:-translate-x-0.5"
          />
          Go back home
        </a>
      </main>
    </>
  )
}
