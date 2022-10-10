import React, { useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const sendGetRequest = async () => {
    try {
      const response = await axios.get('http://localhost:8080')
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    sendGetRequest()
  }, [])


  return (
    <>
      <h1
        className="text-3xl font-bold underline">
        Hello World!
      </h1>
    </>
  )
}

export default App
