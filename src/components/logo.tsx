// turn .svg to react component: https://react-svgr.com/

export function LogoSvg({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <g>
        <path
          d="M1940-2312h510v520h-510zM110-2312h510v520H110zM1025-2312h510v2136h-510z"
          transform="matrix(.1 0 0 .1 0 253)"
        />
      </g>
    </svg>
  )
}
