import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";

const SvgProfileAvatar = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    focusable="false"
    aria-hidden="true"
    ref={ref}
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill="currentColor" />
    <circle cx="16" cy="13" r="4" fill="#fff" />
    <path
      d="M8.5 23.5c1.9-3.1 4.7-4.5 7.5-4.5s5.6 1.4 7.5 4.5"
      fill="#fff"
    />
  </svg>
);

export default memo(forwardRef(SvgProfileAvatar));
