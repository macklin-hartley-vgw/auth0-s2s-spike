const express = require('express')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')

const app = express()

app.get('/hello', (req, res) => {
  res.json('Hello world!')
})

app.get('/authN', (req, res) => {
  res.json('This is top secret!')
})

app.get('/authZ', (req, res) => {
  res.json('This is super top secret!')
})

app.listen(8080, () => {
  console.log('Listening on port 8080')
})