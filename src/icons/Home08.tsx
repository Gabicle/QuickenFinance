import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgHome08 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="m20.716 10.149-6.827-6.41a2.784 2.784 0 0 0-3.778 0l-6.827 6.41a.9.9 0 0 0 .141 1.42c.235.147.475.36.475.636v5.36C3.9 19.515 5.566 21 7.5 21a.5.5 0 0 0 .5-.5V16a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v4.5a.5.5 0 0 0 .5.5c1.934 0 3.6-1.485 3.6-3.435v-5.36c0-.276.24-.49.475-.635a.9.9 0 0 0 .141-1.421"
    />
    <path
      fill="currentColor"
      d="M13.5 21a.5.5 0 0 0 .5-.5V16a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4.5a.5.5 0 0 0 .5.5z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgHome08);
const Memo = memo(ForwardRef);
export default Memo;
