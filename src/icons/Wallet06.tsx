import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgWallet06 = (
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
      fillRule="evenodd"
      d="M17 5.813a3 3 0 0 0-3.985-2.834L3.704 6.215l-.037.013A4 4 0 0 0 1 10v8a4 4 0 0 0 4 4h13a4 4 0 0 0 4-4v-.767a2 2 0 0 0 1-1.733v-3.167a2 2 0 0 0-1-1.732V10a4 4 0 0 0-4-4h-1zM4.355 8.105l-.022.008h-.002A2 2 0 0 0 3 10v8a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-.5h-4.417a3.583 3.583 0 0 1 0-7.167H20V10a2 2 0 0 0-2-2H5a2 2 0 0 0-.645.106m9.317-3.238L10.414 6H15v-.187a1 1 0 0 0-1.328-.945M14 13.917c0-.875.709-1.584 1.583-1.584H21V15.5h-5.417A1.583 1.583 0 0 1 14 13.917M15.5 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgWallet06);
const Memo = memo(ForwardRef);
export default Memo;
