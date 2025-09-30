import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgLogOut05 = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
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
      d="M15.375 3.654a9.002 9.002 0 0 0-9.739 14.71 9 9 0 0 0 9.739 1.982 1 1 0 0 0-.75-1.855A7.002 7.002 0 0 1 7.05 7.051a7 7 0 0 1 7.576-1.542 1 1 0 0 0 .749-1.855"
    />
    <path
      fill="currentColor"
      d="M17.207 7.793a1 1 0 1 0-1.414 1.414L17.586 11H10a1 1 0 1 0 0 2h7.586l-1.793 1.793a1 1 0 0 0 1.414 1.414l3.5-3.5a1 1 0 0 0 0-1.414z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgLogOut05);
const Memo = memo(ForwardRef);
export default Memo;
