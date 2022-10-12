import { Route, Routes, Navigate } from "react-router-dom"

import ReviewNotes from './pages/ReviewNotes'

const App = () => {

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
