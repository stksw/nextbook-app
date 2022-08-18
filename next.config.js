/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: (() => {
    let compilerConfig = {
      styledComponents: true,
    }

    if (process.env.NODE_ENV === 'production') {
      copilerConfig = {
        ...compilerConfig,
        reactRemoveProperties: { properties: ['^data-testid$'] },
      }
    }

    return compilerConfig
  })(),

  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match`,
        destination: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match`,
      },
    ]
  },
}

module.exports = nextConfig
