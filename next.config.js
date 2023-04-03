/** @type {import('next').NextConfig} */

const withLess = require('next-with-less');

const nextConfig = withLess({
  reactStrictMode: true,
  lessLoaderOptions: {
    /* ... */
    lessOptions: {
      /* Reference: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less */
      javascriptEnabled: true,
    },
  },
  compiler: {
    styledComponents: true,
  },
})

module.exports = nextConfig
