import type { SVGProps, Ref } from "react";
import { forwardRef, memo } from "react";
const SvgCreditCardArrowRight = (
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
      d="M21 8.5a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM5 19a2 2 0 0 1-2-2v-5.5a.5.5 0 0 1 .5-.5h17a.5.5 0 0 1 .5.5v1c0 .205-.238.326-.415.22a5 5 0 0 0-7.309 5.925c.06.17-.062.355-.242.355z"
    />
    <path
      fill="currentColor"
      d="m21.707 16.293-2-2a1 1 0 0 0-1.414 1.414l.293.293H16a1 1 0 1 0 0 2h2.586l-.293.293a1 1 0 0 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCreditCardArrowRight);
const Memo = memo(ForwardRef);
export default Memo;
