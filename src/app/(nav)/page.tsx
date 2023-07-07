import Image from "next/image";
import { FaGithub, FaNewspaper, FaTwitter } from "react-icons/fa6";

import potrait from "@/public//profile-picture.png";
import { ExternalLink } from "@/components/external-link";
import { MainContainer } from "@/components/main-container";
import { PostList } from "@/components/post-list";

export default function HomePage() {
  return (
    <>
      <MainContainer>
        <header className="mt-4 text-left text-lg leading-8 text-gray-700  sm:text-justify">
          <Image
            className="float-right m-1 ml-5 hidden rounded-3xl grayscale hover:grayscale-0 sm:block"
            src={potrait}
            alt="Self potrait of the author"
            width={120}
            height={120}
            placeholder="blur"
          />
          <p>
            Hi, I&apos;m{" "}
            <em>
              <strong>Tifan</strong>
            </em>
            , a software engineer based in Indonesia. I&apos;m currently focused
            on building with the React ecosystem and exploring various aspects
            of web development. I also share interesting insights that I
            discovered throughout my learning journey.
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
      </MainContainer>
    </>
  );
}
