import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import heroAvatarImg from '../assets/hero-avatar.jpg'

export default function AICharacter3D({ className = 'w-full h-full' }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [webglAvailable, setWebglAvailable] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 1. WebGL Support Test
    let glContext = null
    try {
      glContext =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
    } catch (e) {
      console.warn('WebGL detection error:', e)
    }

    if (!glContext) {
      console.warn('WebGL is not available in this environment. Falling back to 3D Parallax Mascot.')
      setWebglAvailable(false)
      return
    }

    // 2. Setup Three.js Scene, Camera, and Renderer
    const scene = new THREE.Scene()

    const width = container.clientWidth || 360
    const height = container.clientHeight || 360

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 0, 4.3)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    } catch (err) {
      console.error('Renderer creation error:', err)
      setWebglAvailable(false)
      return
    }

    // 3. Build 3D Robot Mascot Model
    const robotGroup = new THREE.Group()
    scene.add(robotGroup)

    // --- A. HEAD GROUP ---
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.55, 0)
    robotGroup.add(headGroup)

    // Main Head
    const headGeo = new THREE.SphereGeometry(0.52, 32, 32)
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.8,
      roughness: 0.2,
    })
    const headMesh = new THREE.Mesh(headGeo, headMat)
    headGroup.add(headMesh)

    // Glossy Curved Visor
    const visorGeo = new THREE.SphereGeometry(0.45, 32, 16)
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x040608,
      roughness: 0.1,
      metalness: 0.9,
    })
    const visorMesh = new THREE.Mesh(visorGeo, visorMat)
    visorMesh.position.set(0, 0.02, 0.24)
    visorMesh.scale.set(0.9, 0.65, 0.6)
    headGroup.add(visorMesh)

    // Glowing Digital Eyes
    const eyeGroup = new THREE.Group()
    eyeGroup.position.set(0, 0.03, 0.48)
    headGroup.add(eyeGroup)

    const eyeGeo = new THREE.CapsuleGeometry(0.045, 0.08, 16, 16)
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 })

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat)
    leftEye.position.set(-0.15, 0, 0)
    eyeGroup.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat)
    rightEye.position.set(0.15, 0, 0)
    eyeGroup.add(rightEye)

    // Side Ear Nodes
    const earGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 24)
    const earMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 })
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4, side: THREE.DoubleSide })
    const earRingGeo = new THREE.RingGeometry(0.08, 0.12, 24)

    const leftEar = new THREE.Mesh(earGeo, earMat)
    leftEar.position.set(-0.52, 0, 0)
    leftEar.rotation.z = Math.PI / 2
    headGroup.add(leftEar)

    const leftEarRing = new THREE.Mesh(earRingGeo, ringMat)
    leftEarRing.position.set(-0.56, 0, 0)
    leftEarRing.rotation.y = Math.PI / 2
    headGroup.add(leftEarRing)

    const rightEar = new THREE.Mesh(earGeo, earMat)
    rightEar.position.set(0.52, 0, 0)
    rightEar.rotation.z = Math.PI / 2
    headGroup.add(rightEar)

    const rightEarRing = new THREE.Mesh(earRingGeo, ringMat)
    rightEarRing.position.set(0.56, 0, 0)
    rightEarRing.rotation.y = Math.PI / 2
    headGroup.add(rightEarRing)

    // Antenna
    const antStemGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.16, 16)
    const antStemMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 })
    const antStem = new THREE.Mesh(antStemGeo, antStemMat)
    antStem.position.set(0, 0.58, 0)
    headGroup.add(antStem)

    const antOrbGeo = new THREE.SphereGeometry(0.065, 24, 24)
    const antOrbMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 2,
    })
    const antOrb = new THREE.Mesh(antOrbGeo, antOrbMat)
    antOrb.position.set(0, 0.68, 0)
    headGroup.add(antOrb)

    // --- B. NECK ---
    const neckGeo = new THREE.CylinderGeometry(0.16, 0.22, 0.15, 24)
    const neckMat = new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.9, roughness: 0.1 })
    const neck = new THREE.Mesh(neckGeo, neckMat)
    neck.position.set(0, 0.05, 0)
    robotGroup.add(neck)

    // --- C. TORSO ---
    const torsoGroup = new THREE.Group()
    torsoGroup.position.set(0, -0.4, 0)
    robotGroup.add(torsoGroup)

    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.28, 0.65, 32)
    const torsoMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.8,
      roughness: 0.25,
    })
    const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat)
    torsoGroup.add(torsoMesh)

    const chestPlateGeo = new THREE.BoxGeometry(0.5, 0.45, 0.2)
    const chestPlateMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 })
    const chestPlate = new THREE.Mesh(chestPlateGeo, chestPlateMat)
    chestPlate.position.set(0, 0.05, 0.15)
    chestPlate.scale.set(1, 0.8, 0.5)
    torsoGroup.add(chestPlate)

    // Core Reactor
    const coreGeo = new THREE.CircleGeometry(0.08, 32)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4, side: THREE.DoubleSide })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreMesh.position.set(0, 0.06, 0.28)
    torsoGroup.add(coreMesh)

    const coreRingGeo = new THREE.RingGeometry(0.09, 0.12, 32)
    const coreRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide })
    const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat)
    coreRing.position.set(0, 0.06, 0.27)
    torsoGroup.add(coreRing)

    // Bottom Thruster Ring
    const thrusterGeo = new THREE.TorusGeometry(0.22, 0.04, 16, 32)
    const thrusterMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 2.5,
    })
    const thruster = new THREE.Mesh(thrusterGeo, thrusterMat)
    thruster.position.set(0, -0.36, 0)
    thruster.rotation.x = Math.PI / 2
    torsoGroup.add(thruster)

    // --- D. FLOATING HANDS ---
    const handGeo = new THREE.SphereGeometry(0.14, 24, 24)
    const handMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 })
    const handRingGeo = new THREE.RingGeometry(0.15, 0.18, 24)

    const leftHand = new THREE.Group()
    leftHand.position.set(-0.85, -0.2, 0)
    const leftHandMesh = new THREE.Mesh(handGeo, handMat)
    const leftHandRing = new THREE.Mesh(handRingGeo, ringMat)
    leftHandRing.rotation.y = Math.PI / 2
    leftHand.add(leftHandMesh, leftHandRing)
    robotGroup.add(leftHand)

    const rightHand = new THREE.Group()
    rightHand.position.set(0.85, -0.2, 0)
    const rightHandMesh = new THREE.Mesh(handGeo, handMat)
    const rightHandRing = new THREE.Mesh(handRingGeo, ringMat)
    rightHandRing.rotation.y = Math.PI / 2
    rightHand.add(rightHandMesh, rightHandRing)
    robotGroup.add(rightHand)

    // --- E. CYBERNETIC HALO RING ---
    const haloGeo = new THREE.TorusGeometry(1.05, 0.02, 16, 64)
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 1.8,
    })
    const haloMesh = new THREE.Mesh(haloGeo, haloMat)
    haloMesh.position.set(0, -0.15, 0)
    robotGroup.add(haloMesh)

    // --- 4. LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5)
    dirLight.position.set(4, 5, 4)
    scene.add(dirLight)

    const rimLight = new THREE.DirectionalLight(0x00f5d4, 3.5)
    rimLight.position.set(-4, 2, -2)
    scene.add(rimLight)

    const backPointLight = new THREE.PointLight(0x00f5d4, 4, 6)
    backPointLight.position.set(0, 0.5, -1.8)
    scene.add(backPointLight)

    const corePointLight = new THREE.PointLight(0x00f5d4, 2, 2)
    corePointLight.position.set(0, -0.34, 0.4)
    scene.add(corePointLight)

    // --- 5. MOUSE TRACKING & ANIMATION LOOP ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const clientX = e.clientX
      const clientY = e.clientY
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate normalized offset from center (-1 to +1)
      mouse.targetX = (clientX - centerX) / (window.innerWidth / 2)
      mouse.targetY = (clientY - centerY) / (window.innerHeight / 2)
    }

    window.addEventListener('mousemove', onMouseMove)

    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const t = clock.getElapsedTime()

      // Smooth mouse lerp
      mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.08)
      mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.08)

      // Body rotation follows mouse
      robotGroup.rotation.y = mouse.x * 0.65
      robotGroup.rotation.x = -mouse.y * 0.35

      // Floating bobbing motion
      robotGroup.position.y = Math.sin(t * 2.2) * 0.12
      robotGroup.position.x = Math.cos(t * 1.5) * 0.04

      // Head extra responsiveness
      headGroup.rotation.y = mouse.x * 0.35
      headGroup.rotation.x = -mouse.y * 0.25

      // Floating hands
      leftHand.position.y = -0.2 + Math.sin(t * 3 + 1) * 0.06
      leftHand.position.x = -0.85 + Math.cos(t * 2) * 0.03

      rightHand.position.y = -0.2 + Math.sin(t * 3) * 0.06
      rightHand.position.x = 0.85 - Math.cos(t * 2) * 0.03

      // Core pulse & halo spin
      const scale = 1 + Math.sin(t * 4) * 0.12
      coreMesh.scale.set(scale, scale, 1)

      haloMesh.rotation.z = t * 1.2
      haloMesh.rotation.x = 1.1 + Math.sin(t * 1.5) * 0.1

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth || 360
      const h = container.clientHeight || 360
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative ${className} flex items-center justify-center select-none`}
    >
      {/* Soft theme color ambient glow behind canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-mint-400/20 rounded-full blur-[90px] pointer-events-none -z-10"></div>

      {webglAvailable ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing block"
          style={{ width: '100%', height: '100%', maxWidth: '420px', maxHeight: '420px' }}
        />
      ) : (
        /* Fallback interactive 3D Mascot card with parallax */
        <div className="relative group w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-full p-2 bg-gradient-to-b from-mint-400/20 via-slate-800/40 to-purple-500/20 border border-mint-400/30 shadow-2xl backdrop-blur-sm overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-300">
          <img
            src={heroAvatarImg}
            alt="Shubham Sharma 3D AI Mascot"
            className="w-full h-full object-cover rounded-full select-none pointer-events-none transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 rounded-full border border-mint-400/20 pointer-events-none"></div>
        </div>
      )}
    </div>
  )
}
