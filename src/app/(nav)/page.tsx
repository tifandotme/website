import Image from "next/image";
import { FaGithub, FaNewspaper, FaTwitter } from "react-icons/fa6";

import potrait from "@/public/profile-picture.png";
import { ExternalLink } from "@/components/external-link";
import { PostList } from "@/components/post-list";

export default function HomePage() {
  return (
    <>
      <header className="text-lg leading-8 text-gray-700">
        <Image
          className="float-right ml-4 mr-10 mt-2 hidden rounded-full bg-gradient-to-b from-gray-300 to-gray-400 p-[1px] grayscale hover:grayscale-0 sm:block"
          src={potrait}
          alt="Self Potrait"
          width={120}
          height={130}
          placeholder="blur"
        />
        {/* prettier-ignore */}
        <p>
          Hi, I&apos;m <em><strong>Tifan</strong></em>, a software engineer based in Indonesia. I&apos;m currently delving deeper into the React ecosystem and exploring various aspects of web development—while writing what I discover throughout my learning journey.
        </p>
        {/* prettier-ignore */}
        <p className="my-6">
          My ambition is to create an <em>efficient</em> and <em>elegant</em> software that can have a positive impact on people&apos;s lives.
        </p>
        {/* prettier-ignore */}
        <p>
          Outside of programming, I&apos;m also passionate about <em>science fiction</em> and <em>philosophy</em>.
        </p>

        <section className="mb-20 mt-9 flex w-full justify-around gap-3 sm:justify-center sm:gap-6">
          <ExternalLink
            icon={FaNewspaper}
            href="https://tifan.me/resume.pdf"
            text="Resume"
          />
          <ExternalLink
            icon={FaGithub}
            href="https://github.com/tifandotme"
            text="GitHub"
          />
          <ExternalLink
            icon={FaTwitter}
            href="https://twitter.com/tifandotme"
            text="Twitter"
          />
        </section>
      </header>
      <PostList />
    </>
  );
}

// TODO: track event click for umami
