import { FaGithub, FaNewspaper } from "react-icons/fa6"

import { site } from "@/config"
import { generateRSS } from "@/lib/feed"
import { CldImage } from "@/components/cloudinary-image"
import { XTwitter } from "@/components/icons"
import { PostList } from "@/components/post-list"
import { ScrollUpWhenMounted } from "@/components/scroll-fix"
import { SocialButton } from "@/components/social-button"

export default function HomePage() {
  if (process.env.VERCEL_URL === "tifan.me") {
    generateRSS()
  }

  return (
    <main className="container-md">
      <header className="text-left text-lg leading-8 sm:text-justify">
        <CldImage
          className="float-right m-1 ml-5 hidden w-[95px] rounded-2xl grayscale hover:grayscale-0 dark:brightness-90 sm:block"
          src="potrait.png"
          alt={site.author}
          width={300}
          sizes="(max-width: 768px) 16vw, (max-width: 1024px) 12vw, 10vw"
        />
        <p className="mb-6">
          Hi, I&apos;m <span className="text-xl font-semibold">Tifan</span>, a
          software engineer based in Indonesia. My ambition is to create{" "}
          <em>efficient</em> and <em>elegant</em> software solutions that can
          make a meaningful and positive impact on people&apos;s lives.
        </p>
        <p>
          Outside of programming, I&apos;m also passionate about{" "}
          <em>science fiction</em> and <em>philosophy</em>.
        </p>

        <section className="mb-24 mt-10 flex w-full justify-around gap-3 sm:justify-center sm:gap-6">
          <SocialButton
            icon={FaNewspaper}
            href={site.baseUrl + "/resume.pdf"}
            label="Resume"
            download
          />
          <SocialButton
            icon={FaGithub}
            href="https://github.com/tifandotme"
            label="GitHub"
          />
          <SocialButton
            icon={XTwitter}
            href="https://x.com/tifandotme"
            label="X/Twitter"
            aria-label="X formerly known as Twitter"
          />
        </section>
      </header>

      <PostList />

      <ScrollUpWhenMounted />
    </main>
  )
}
