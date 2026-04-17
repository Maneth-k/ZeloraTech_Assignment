import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // DragDropContext doesn't work well with React.StrictMode in older DND libraries, but @hello-pangea/dnd works fine.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
