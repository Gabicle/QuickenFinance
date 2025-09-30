import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgBank02 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="m11.188 2.174-7 3.144A2.02 2.02 0 0 0 3 7.165v.203c0 .837.672 1.515 1.5 1.515h15c.828 0 1.5-.678 1.5-1.515v-.203c0-.799-.465-1.522-1.188-1.847l-7-3.144a1.98 1.98 0 0 0-1.624 0M3 20.484v-1.01c0-.838.672-1.516 1.5-1.516h15c.828 0 1.5.678 1.5 1.516v1.01c0 .837-.672 1.516-1.5 1.516h-15c-.828 0-1.5-.679-1.5-1.516m2.5-9.6a.5.5 0 0 0-.5.5v4.074a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4.075a.5.5 0 0 0-.5-.5zm4 0a.5.5 0 0 0-.5.5v4.074a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4.075a.5.5 0 0 0-.5-.5zm4 0a.5.5 0 0 0-.5.5v4.074a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4.075a.5.5 0 0 0-.5-.5zm4 0a.5.5 0 0 0-.5.5v4.074a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4.075a.5.5 0 0 0-.5-.5z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgBank02);
const Memo = memo(ForwardRef);
export default Memo;
