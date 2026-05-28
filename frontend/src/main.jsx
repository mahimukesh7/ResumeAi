import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import"./style.scss"
import { InterviewProvider } from "./features/interview/interview.context";


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InterviewProvider>
      <App />
    </InterviewProvider>
  </StrictMode>,
)
