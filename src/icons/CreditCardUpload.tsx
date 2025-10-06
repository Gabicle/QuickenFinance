import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgCreditCardUpload = (
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
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3m20 0v7a2 2 0 0 1-2 2h-3.292M22 9H2m5.292 9H4a2 2 0 0 1-2-2V9m10 11v-8m0 0 3 3m-3-3-3 3"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCreditCardUpload);
const Memo = memo(ForwardRef);
export default Memo;
