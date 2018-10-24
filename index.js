const express = require('express')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')

const app = express()

app.get('/hello', (req, res) => {
  res.json('Hello world!')
})

app.use(jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://vgw-payments-spike.auth0.com/.well-known/jwks.json"
  }),
  audience: 'test.local',
  issuer: "https://vgw-payments-spike.auth0.com/",
  algorithms: ['RS256']
}))

app.get('/authN', (req, res) => {
  res.json('This is top secret!')
})

app.get('/authZ', jwtAuthz([ 'read:secret' ]), (req, res) => {
  res.json('This is super top secret!')
})

app.listen(8080, () => {
  console.log('Listening on port 8080')
})