# auth0-s2s-spike

## Overview

This repository contains the following;

 - Step by step guide to setting up a simple authenticated node app
 - Source code for finished node app
 - Postman scripts for testing your endpoints

## Slides

Available here; https://slides.com/macklin/oauth20-services/

## Step-by-step

### Set up auth0

1. https://manage.auth0.com/
2. Create an application
3. Add a test scope (read:secret)
4. Create an API

### Install NPM packages

```
npm init
npm install --save express express-jwt express-jwt-authz jwks-rsa
npm install -D nodemon
```

### Add nodemon config

```
# Add to package.json
"nodemonConfig": {
  "verbose": true,
  "watch": [
    "./"
  ],
  "ignore": [
    "node_modules"
  ],
  "exec": "node ./index.js"
},
"scripts": {
  "dev": "nodemon"
}
```

### Add simple express server

```
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
```

### Set up AuthN

```
# After /hello endpoint
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
```

### Set up AuthZ

```
# Middleware for /authZ endpoint
jwtAuthz([ 'read:secret' ])
```