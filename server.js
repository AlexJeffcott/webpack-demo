const express = require('express')
const webpack = require('webpack')
const path = require('path')

// if webpack.config is a function that returns an object you need to invoke the 'config' function!!!
const config = require('./webpack.config.js')()

const isDevelopment = config.mode === 'development'

const PORT = process.env.PORT || 3000
const app = express()

if (isDevelopment) {
  const compiler = webpack(config)
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
    })
  )
  app.use(
    require(`webpack-hot-middleware`)(compiler, {
      log: false,
      path: `/__webpack_hmr`,
      heartbeat: 10 * 1000,
    })
  )
} else {
  const DIST_DIR = `${__dirname}/dist`
  const HTML_FILE = path.join(DIST_DIR, '/index.html')
  app.use(express.static(DIST_DIR))

  app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
  })
}

app.listen(PORT, () => {
  console.log(`App listening to ${PORT} with env: ${config.mode}....`)
})
