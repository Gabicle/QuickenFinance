import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgBell05 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    focusable="false"
    aria-hidden="true"
    ref={ref}
    {...props}
  >
    <path
      fill="currentColor"
      d="M10 1a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zm9.884 16.553-1.322-2.442a9.4 9.4 0 0 1-1.144-4.472V10c0-1.697-.916-3.196-2.316-4.1A5.73 5.73 0 0 0 12 5a5.73 5.73 0 0 0-3.102.9c-1.4.904-2.316 2.403-2.316 4.1v.64a9.4 9.4 0 0 1-1.144 4.471l-1.322 2.442c-.36.665.163 1.447.969 1.447h13.83c.806 0 1.33-.782.97-1.447m-9.218 2.937a1 1 0 1 0-1.334 1.491A4 4 0 0 0 12 23c1.024 0 1.96-.386 2.667-1.019a1 1 0 1 0-1.334-1.49c-.354.317-.82.509-1.333.509s-.979-.192-1.333-.51"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgBell05);
const Memo = memo(ForwardRef);
export default Memo;
