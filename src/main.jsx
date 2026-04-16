import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import VanshdeepProject from './pages/VanshdeepProject.jsx'
import CloudySharksProject from './pages/CloudySharksProject.jsx'
import OswalSoapProject from './pages/OswalSoapProject.jsx'
import RajasthanRoyalsProject from './pages/RajasthanRoyalsProject.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/vanshdeep" element={<VanshdeepProject />} />
        <Route path="/project/cloudy-sharks" element={<CloudySharksProject />} />
        <Route path="/project/oswal-soap" element={<OswalSoapProject />} />
        <Route path="/project/rajasthan-royals" element={<RajasthanRoyalsProject />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
