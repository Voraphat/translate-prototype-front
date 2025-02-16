import { useState } from 'react'
import './App.css'
import SpeechToTranslate from './SpeechToTranslate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SpeechToTranslate/>
    </>
  )
}

export default App
