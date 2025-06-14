import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('combined'))
app.disable('x-powered-by')

const services = [
  {
    route: '/login',
    target: `${process.env.AUTHENTICATION_SERVICE_URL}/login`,
  },
  {
    route: '/register',
    target: `${process.env.AUTHENTICATION_SERVICE_URL}/register`,
  },
  {
    route: '/register-donation',
    target: `${process.env.DONATION_SERVICE_URL}/register-donation`,
  },
  {
    route: '/register-donor',
    target: `${process.env.DONATION_SERVICE_URL}/register-donor`,
  },
  {
    route: '/contact-us',
    target: `${process.env.CONTACT_US_SERVICE_URL}/contact-us`,
  },
]

const rateLimit = 20
const interval = 60 * 1000

const requestCounts = {}

setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0
  })
}, interval)

function rateLimitAndTimeout(req, res, next) {
  const ip = req.ip

  requestCounts[ip] = (requestCounts[ip] || 0) + 1

  if (requestCounts[ip] > rateLimit) {
    return res.status(429).json({
      code: 429,
      status: 'Error',
      message: 'Rate limit exceeded.',
      data: null,
    })
  }

  req.setTimeout(15000, () => {
    res.status(504).json({
      code: 504,
      status: 'Error',
      message: 'Gateway timeout.',
      data: null,
    })
    req.abort()
  })

  next()
}

app.use(rateLimitAndTimeout)

services.forEach(({ route, target }) => {
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: '',
    },
  }

  app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions))
})

app.use((_req, res) => {
  res.status(404).json({
    code: 404,
    status: 'Error',
    message: 'Route not found.',
    data: null,
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Gateway está rodando na porta ${PORT} 🚀️`)
})
