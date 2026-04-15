import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import VanshdeepProject from './pages/VanshdeepProject.jsx'
import CloudySharksProject from './pages/CloudySharksProject.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/vanshdeep" element={<VanshdeepProject />} />
        <Route path="/project/cloudy-sharks" element={<CloudySharksProject />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
