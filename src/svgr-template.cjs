// svgr-template.cjs
/** @typedef {import('@svgr/core').TemplateFn} TemplateFn */

/** @type {TemplateFn} */
module.exports = function template(
  { template },
  opts,
  { componentName, props, jsx }
) {
  const tpl = template.smart({ plugins: ['typescript', 'jsx'] });

  // We want:
  // import { forwardRef, memo } from 'react';
  // import type { SVGProps, Ref } from 'react';
  // const SvgX = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => ( ... );
  // const ForwardRef = forwardRef(SvgX);
  // const Memo = memo(ForwardRef);
  // export default Memo;

  return tpl.ast`
    import { forwardRef, memo } from 'react';
    import type { SVGProps, Ref } from 'react';

    const ${componentName} = (
      ${props
        .replace('props', 'props: SVGProps<SVGSVGElement>')
        .replace('ref', 'ref: Ref<SVGSVGElement>')}
    ) => ${jsx};

    const ForwardRef = forwardRef(${componentName});
    const Memo = memo(ForwardRef);
    export default Memo;
  `;
};
