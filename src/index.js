import './dotenv'

/* eslint-disable import/first */

import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import RateLimit from 'express-rate-limit'
import { Server } from 'http'
import './db'
import config from './config'
import producersRoutes from './routes/producers'
import categoryRoutes from './routes/categories'
// import robotsTxtRoute from '../routes/robots'

const { WEB_PORT, isProd, JWT_SECRET, CORS_WEB_APP_ORIGIN, DEBUG } = config

const app = express()
const http = Server(app)

// Express security with helmet module
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Debugging with morgan
if (!isProd && DEBUG) {
  app.use(morgan('combined'))
}

// Rate limiting
if (isProd) {
  app.enable('trust proxy')

  const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0, // disable delaying - full speed until the max limit is reached
  })

  //  apply to all requests
  app.use(limiter)
}

// Setup CORS so front-end app can access the API
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', CORS_WEB_APP_ORIGIN)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  next()
})

producersRoutes(app, config)
categoryRoutes(app, config)

http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${String(WEB_PORT)} ${isProd ? '(production)' :
    '(development)'}.`)
})
