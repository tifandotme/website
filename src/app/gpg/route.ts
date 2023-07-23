export async function GET() {
  try {
    const res = await fetch("https://github.com/tifandotme.gpg")

    const gpg = await res.text()

    return new Response(gpg, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "max-age=0, private, must-revalidate",
      },
    })
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, {
        status: 404,
      })
    }

    throw err
  }
}
