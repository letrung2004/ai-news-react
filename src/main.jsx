import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
