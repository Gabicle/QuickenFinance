// .svgrrc.cjs


module.exports = {
  typescript: true,
  icon: true,
  ref: true,
  memo: true,
  jsxRuntime: 'automatic',
  expandProps: 'end',
  svgProps: { width: '1em', height: '1em', focusable: 'false', 'aria-hidden': 'true' },

  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor',
    '#0D0D12': 'currentColor',  
    '#0d0d12': 'currentColor', 
  },

  svgo: true,
  svgoConfig: {
    multipass: true,
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
      'removeDimensions',
      { name: 'removeXMLNS' },
      { name: 'cleanupIds' },
    ],


  },
  template: require.resolve(path.resolve(__dirname, "./svgr-template.cjs")),


};
