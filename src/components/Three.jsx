import React, { useEffect, useRef } from "react";
import { agnleToRadian } from "../utils/angle";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import gsap from 'gsap';
import Car from "./car";
import MyText from "./MyText";

const Three = () => {
  const orbitControlsRef = useRef(null);

  const myStyle = {
    fontWeight: '700',
    fontSize: '18px',
    };

  useFrame((state) => {
    if(!!orbitControlsRef.current){
      const {x,y} = state.mouse
      console.log(y * agnleToRadian(90-30))
      orbitControlsRef.current.setAzimuthalAngle(-x * agnleToRadian(45))
      orbitControlsRef.current.setPolarAngle((y + 1.2) * agnleToRadian(90 - 30))
      orbitControlsRef.current.update()
    }
  })

// Animation
const ballRef = useRef(null)
  useEffect(() => {
    if(!!ballRef.current){
      const timeline = gsap.timeline({ paused:true })
      // x-axis motion
      timeline.to(ballRef.current.position, {
        x: 1,
        duration: 2,
        ease: "power2.out"
      })
      // y-axis motion
      timeline.to(ballRef.current.position, {
        y: 0.5,
        duration: 1,
        ease: "bounce"
      }, "<")
      timeline.play()
    }
  }, [ballRef.current])

  return (
    <>
    {/* Camera */}
    <perspectiveCamera makeDefault position={[3,3,5]} />
    <OrbitControls ref={orbitControlsRef} minPolarAngle={agnleToRadian(40)} maxPolarAngle={agnleToRadian(80)}/>
    <MyText color="white" fontSize={1} position={[0, 2, 0]}>
        Hello, World!
    </MyText>
    {/* Ball */}
    <mesh position={[-2,2.5,0]} castShadow ref={ballRef}>
      <sphereGeometry args={[0.5,32,32]} />
      <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2}/>
    </mesh>
    {/* Car */}
    <Car />
    {/* Floor */}
    <mesh rotation={[-(agnleToRadian(90)), 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#0096c7" />
    </mesh>
    {/* Lights */}
    <ambientLight args={["#ffffff", 0.25]} />
    <spotLight args={["#ffffff", 10, 10, agnleToRadian(45), 0.6]} position={[-3, 1, 0]} castShadow />
    {/* Envoirment */}
    <Environment background>
      <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="#0096c7" side={THREE.BackSide} />
      </mesh>
    </Environment>
    </>
  );
};

export default Three;
