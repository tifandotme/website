import { type IconBaseProps } from "react-icons"

export function Logo({ size, ...props }: IconBaseProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      width={size || "1em"}
      height={size || "1em"}
      {...props}
    >
      <g transform="matrix(0.1, 0, 0, -0.1, 0, 253)">
        <rect
          x="1940"
          y="-2312"
          width="510"
          height="520"
          transform="matrix(1, 0, 0, -1, 0, 0)"
        />
        <rect
          y="-2312"
          x="110"
          width="510"
          height="520"
          transform="matrix(1, 0, 0, -1, 0, 0)"
        />
        <rect
          y="-2312"
          x="1025"
          width="510"
          height="2136"
          transform="matrix(1, 0, 0, -1, 0, 0)"
        />
      </g>
    </svg>
  )
}

export function XTwitter({ size, ...props }: IconBaseProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size || "1em"}
      height={size || "1em"}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// export function Spinner({ size, ...props }: IconBaseProps) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="currentColor"
//       stroke="currentColor"
//       width={size || "1.5rem"}
//       height={size || "1.5rem"}
//       {...props}
//     >
//       <style>{`.spinner_aj0A{transform-origin:center;animation:spinner_KYSC .75s infinite linear}@keyframes spinner_KYSC{100%{transform:rotate(360deg)}}`}</style>
//       <path
//         d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
//         // eslint-disable-next-line tailwindcss/no-custom-classname
//         className="spinner_aj0A"
//       />
//     </svg>
//   )
// }
