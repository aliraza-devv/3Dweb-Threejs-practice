import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber";
import Three from "./components/Three";
import './App.css'

function App() {
  

  return (
    <>
      <Canvas className="canvas" shadows>
        <Suspense fallback={null}>
          <Three/>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
