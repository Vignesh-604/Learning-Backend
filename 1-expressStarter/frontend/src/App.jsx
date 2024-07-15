import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get("/api/jokes")   // axios is used to make HTTP requests
      .then((response) => {
        // console.log(response);
        setJokes(response.data)
      })
      .catch(error => console.log(error))
  })

  return (
    <>
      <h1>Hello</h1>
      <p>Jokes: {jokes.length}</p>
      <hr />
      <h2>
        {
          jokes.map(joke => (
            <div key={joke.id}>
              <h3>Joke Title: {joke.title}</h3>
              <h3>Joke: {joke.jokeItem}</h3>
            </div>
          ))
        }
      </h2>
    </>
  )
}

export default App
