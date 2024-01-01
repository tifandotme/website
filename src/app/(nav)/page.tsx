import { siteConfig } from "@/config"
import { generateRSS } from "@/lib/feed"
import { isProd } from "@/lib/utils"
import { CldImage } from "@/components/cloudinary-image"
import { PostList } from "@/components/post-list"
import { SocialButton } from "@/components/social-button"

export default function HomePage() {
  if (isProd()) {
    generateRSS()
  }

  return (
    <main className="container-md">
      <header className="text-left text-lg leading-8 sm:text-justify">
        <CldImage
          className="float-right m-1 ml-5 hidden w-[95px] rounded-2xl grayscale hover:grayscale-0 sm:block dark:brightness-90"
          src="potrait.png"
          alt={siteConfig.author}
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
            iconId="newspaper"
            href="/resume.pdf"
            label="Resume"
            download
          />
          <SocialButton
            iconId="github"
            href="https://github.com/tifandotme"
            label="GitHub"
            rel="noopener noreferrer"
            target="_blank"
          />
          <SocialButton
            iconId="twitter"
            href="https://twitter.com/tifandotme"
            label="Twitter"
            rel="noopener noreferrer"
            target="_blank"
          />
        </section>
      </header>

      <PostList />
    </main>
  )
}
