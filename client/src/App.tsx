import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from "react-router-dom"
import axios from 'axios'

import ReviewNotes from './pages/ReviewNotes'

const App = () => {

  const sendGetRequest = async () => {
    try {
      const response = await axios.get('http://localhost:8080')
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users')
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getReviewnotes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reviewnotes')
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    sendGetRequest()
    getUsers()
    getReviewnotes()
  }, [])


  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/engagements/2021_001/reviewnotes" replace />} />
        <Route path="/engagements/2021_001/reviewnotes" element={<ReviewNotes />} />
      </Routes>
    </>
  )
}

export default App
