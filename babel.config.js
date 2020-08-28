module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)
  // const isTest = api.env('test')
  // const isDevelopment = api.env('development')
  // const isProduction = api.env('production')

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: '>1%, ie 11, not op_mini all, not dead',
            node: 12,
          },
        },
      ],
      '@babel/preset-react',
      '@babel/typescript',
    ],
    plugins: [api.env('development') && 'react-refresh/babel'].filter(Boolean),
  }
}
