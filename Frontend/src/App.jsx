import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter , Routes , Route} from 'react-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Navbar />
    </>
  )
}

export default App
