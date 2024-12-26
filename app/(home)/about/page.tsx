import type { Metadata } from "next"
import { CloudinaryImage } from "../../_components/cloudinary-image"
import { Icon } from "../../_components/icon"
import { ToggleableEmail } from "./toggleable-email"

export const metadata: Metadata = {
  title: "About",
}

export default async function AboutPage() {
  return (
    <>
      <article className="[&_p]:container-md mb-10 space-y-5 [&_p]:text-[105%]">
        <h1 className="container-md text-xl font-bold">Beyond the Resume</h1>
        <p>
          I specialize in building full-stack web applications using{" "}
          <strong>React</strong>, <strong>Next.js</strong>,{" "}
          <strong>Node.js</strong>, and more. My extensive experience in the
          JavaScript ecosystem also enables me to develop cross-platform mobile
          applications with <strong>React Native</strong>.
        </p>
        <p>
          As a software engineer at{" "}
          <a
            className="inline-flex items-center gap-px hover:underline hover:underline-offset-1"
            href="https://delosaqua.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Delos
            <Icon id="external" className="size-4 text-muted-darker/80" />
          </a>
          , I&apos;m currently working towards modernizing the aquaculture
          industry in Indonesia.
        </p>
        <p>
          I live in <strong>Jakarta (UTC+7)</strong>. When I&apos;m not coding,
          you can find me indulging in mystery/sci-fi books and movies.
        </p>
        <p>
          Ready to discuss your next project? Send me a message at:{" "}
          <ToggleableEmail />.
        </p>
        <section className="container-lg !mt-8 grid grid-cols-1 gap-4 md:grid-cols-[2fr,1fr]">
          <CloudinaryImage
            className="border"
            publicId="blog/potrait-shrimp-pond"
            width={770}
            alt="Potrait of Tifan Dwi Avianto"
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 32vw, 25vw"
          />
          <CloudinaryImage
            className="h-full border object-cover object-right"
            publicId="blog/potrait-presentation"
            width={770}
            alt="Potrait of Tifan Dwi Avianto"
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 32vw, 25vw"
          />
        </section>
      </article>
    </>
  )
}
