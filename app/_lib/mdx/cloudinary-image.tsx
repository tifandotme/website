// import Image, { type ImageProps } from "next/image"
// import { cn } from "app/_lib/utils"

// import { generateSignedImage, getImage } from "@/_lib/image"

// interface CldImageProps extends ImageProps {
//   aspectRatio?: string
// }

// /**
//  * Fetches remote image from Cloudinary. If the image fails to load, a placeholder is shown instead.
//  *
//  * @param src - Cloudinary public ID (e.g. "projects/puri.png")
//  * @param alt - Image alt text
//  * @param width - Image width in pixels
//  * @param aspectRatio - Image aspect ratio (e.g. "16:9") (optional)
//  * @param sizes - Image sizes attribute (e.g. "100vw") (optional)
//  *
//  * @return Next.js Image component
//  */
// export async function CldImage({ aspectRatio, ...props }: CldImageProps) {
//   try {
//     const { src, alt, width, height, sizes } = props
//     const publicId = src as string

//     if (!src || !alt || !width) {
//       throw new Error(
//         "Img component is missing one or more of the required props (src, alt, width)",
//       )
//     } else if (height) {
//       throw new Error(
//         "Img component should not have a height prop as it is calculated automatically",
//       )
//     }

//     const transforms = [
//       `c_fill,ar_${aspectRatio},w_${width},g_auto/q_auto/f_webp`, // crop if aspect ratio is provided
//       `c_limit,w_${width}/q_auto/f_webp`,
//       `c_scale,w_100/e_blur:1000/q_1/f_webp`,
//     ] as const

//     // prettier-ignore
//     const signedImage = await generateSignedImage(transforms[aspectRatio ? 0 : 1], publicId)
//     const { height: calculatedHeight } = await getImage(signedImage)

//     const signedPlaceholder = await generateSignedImage(transforms[2], publicId)
//     const { base64 } = await getImage(signedPlaceholder)

//     return (
//       <Image
//         {...props}
//         src={signedImage}
//         alt={alt}
//         width={width}
//         height={calculatedHeight}
//         placeholder="blur"
//         blurDataURL={base64}
//         quality={90} // value above 90 will only increase the file size beyond what was fetched from Cloudinary
//         sizes={sizes ?? "100vw"} // its recommended to pass the "sizes" prop to make the image responsive.
//       />
//     )
//   } catch (err) {
//     console.error(err)

//     return (
//       <div
//         {...props}
//         className={cn(
//           props.className,
//           "!flex items-center justify-center !bg-[hsl(var(--foreground)/10%)] dark:!bg-[hsl(var(--foreground)/4%)]",
//         )}
//         style={{
//           aspectRatio: aspectRatio ? aspectRatio.replace(":", "/") : "1/1",
//         }}
//         aria-hidden
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 282.7 228"
//           fill="currentColor"
//           className="fill-[hsl(var(--muted-large-text))]"
//           width="50%"
//           height="50%"
//         >
//           <circle cx={115.305} cy={35.745} r={35.75} />
//           <path d="M188.705 227.995h-81.34c-10.27 0-16.24-11.86-10.28-20.41l38.69-55.48 42.65-61.2a12.465 12.465 0 0 1 20.56 0l42.64 61.17 38.7 55.51c5.96 8.55-.02 20.4-10.28 20.4h-81.34v.01Z" />
//           <path d="m2.485 206.785 55.44-78.81c4.27-6.07 12.64-7.54 18.72-3.29l112.83 78.81c10.8 7.54 5.46 24.51-7.71 24.51H13.495c-10.91-.01-17.29-12.3-11.01-21.22Z" />
//         </svg>
//       </div>
//     )
//   }
// }
