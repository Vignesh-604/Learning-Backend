import dotenv from 'dotenv'
import express from 'express'
const app = express()

dotenv.config({ path: "./.env" })
const port = process.env.PORT     // can hardcode port value too

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/home", (req, res) => {         // Routes
  res.send("Hello User")
})

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Joke 1",
      jokeItem: "Joke or something"
    },
    {
      id: 2,
      title: "Joke 2",
      jokeItem: "Joke or hotdog"
    },
    {
      id: 3,
      title: "Joke 3",
      jokeItem: "Joke or pineapple"
    },
  ]
  res.send(jokes)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})