require('dotenv').config()
const express = require('express')
const app = express()

const port = process.env.PORT     // can hardcode port value too

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/home", (req, res) => {         // Routes
  res.send("Hello User")
})

app.get("/login", (req, res) => {
  res.send("<h1>Please login</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})