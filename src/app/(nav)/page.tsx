import Image from "next/image"
import { FaGithub, FaNewspaper, FaTwitter } from "react-icons/fa6"

import potrait from "@/public/profile-picture.png"
import { baseUrlDynamic } from "@/config"
import { PostList } from "@/components/post-list"
import { ScrollUpWhenMounted } from "@/components/scroll-fix"
import { SocialButton } from "@/components/social-button"

export default function HomePage() {
  return (
    <main className="container-main">
      <header className="text-left text-lg leading-8 sm:text-justify">
        <Image
          className="float-right m-1 ml-5 hidden rounded-3xl grayscale hover:grayscale-0 dark:brightness-90 sm:block"
          src={potrait}
          alt="Self potrait of the author"
          width={120}
          height={120}
          placeholder="blur"
        />
        <p>
          Hi, I&apos;m{" "}
          <span className="font-serif text-xl font-semibold">Tifan</span>, a
          software engineer based in Indonesia. I&apos;m currently focused on
          building with the React ecosystem and exploring various aspects of web
          development. I also share interesting insights that I discovered
          throughout my learning journey.
        </p>
        <p className="my-6">
          My ambition is to create an <em>efficient</em> and <em>elegant</em>{" "}
          software that can have a positive impact on people&apos;s lives.
        </p>
        <p>
          Outside of programming, I&apos;m also passionate about{" "}
          <em>science fiction</em> and <em>philosophy</em>.
        </p>

        <section className="mb-20 mt-9 flex w-full justify-around gap-3 sm:justify-center sm:gap-6">
          <SocialButton
            icon={FaNewspaper}
            href={baseUrlDynamic + "/resume.pdf"}
            text="Resume"
            download
          />
          <SocialButton
            icon={FaGithub}
            href="https://github.com/tifandotme"
            text="GitHub"
          />
          <SocialButton
            icon={FaTwitter}
            href="https://twitter.com/tifandotme"
            text="Twitter"
          />
        </section>
      </header>

      <PostList />

      <ScrollUpWhenMounted />
    </main>
  )
}
