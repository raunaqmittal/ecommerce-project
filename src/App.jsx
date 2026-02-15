//import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { Routes, Route } from 'react-router'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<h1>Checkout</h1>} />
      
    </Routes>
  )
}

export default App
