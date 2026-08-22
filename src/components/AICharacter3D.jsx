import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AICharacter3D({ className = 'w-full h-full' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer
    let scene
    let camera
    let animationFrameId
    let isDisposed = false

    try {
      scene = new THREE.Scene()

      const width = mount.clientWidth || 360
      const height = mount.clientHeight || 360

      camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
      camera.position.set(0, 0, 4.3)

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      renderer.domElement.style.maxWidth = '420px'
      renderer.domElement.style.maxHeight = '420px'
      renderer.domElement.style.display = 'block'
      renderer.domElement.style.cursor = 'grab'
      renderer.domElement.style.touchAction = 'none'

      mount.appendChild(renderer.domElement)
    } catch (err) {
      console.error('Three.js WebGL error:', err)
      return
    }

    // --- 3D ROBOT / AI MASCOT HIERARCHY ---
    const robotGroup = new THREE.Group()
    scene.add(robotGroup)

    // A. Head Group
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.55, 0)
    robotGroup.add(headGroup)

    // Dark Metallic Head Sphere
    const headGeo = new THREE.SphereGeometry(0.52, 32, 32)
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.2,
    })
    const headMesh = new THREE.Mesh(headGeo, headMat)
    headGroup.add(headMesh)

    // Glossy Dark Visor
    const visorGeo = new THREE.SphereGeometry(0.46, 32, 16)
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      roughness: 0.08,
      metalness: 0.95,
    })
    const visorMesh = new THREE.Mesh(visorGeo, visorMat)
    visorMesh.position.set(0, 0.02, 0.23)
    visorMesh.scale.set(0.92, 0.68, 0.62)
    headGroup.add(visorMesh)

    // Digital Glowing Cyan Eyes
    const eyeGroup = new THREE.Group()
    eyeGroup.position.set(0, 0.04, 0.48)
    headGroup.add(eyeGroup)

    const eyeGeo = new THREE.CapsuleGeometry(0.048, 0.09, 16, 16)
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 })

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat)
    leftEye.position.set(-0.16, 0, 0)
    eyeGroup.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat)
    rightEye.position.set(0.16, 0, 0)
    eyeGroup.add(rightEye)

    // Cyber Ear Headphone Nodes
    const earGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.09, 24)
    const earMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 })
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4, side: THREE.DoubleSide })
    const earRingGeo = new THREE.RingGeometry(0.08, 0.13, 24)

    const leftEar = new THREE.Mesh(earGeo, earMat)
    leftEar.position.set(-0.53, 0, 0)
    leftEar.rotation.z = Math.PI / 2
    headGroup.add(leftEar)

    const leftEarRing = new THREE.Mesh(earRingGeo, ringMat)
    leftEarRing.position.set(-0.58, 0, 0)
    leftEarRing.rotation.y = Math.PI / 2
    headGroup.add(leftEarRing)

    const rightEar = new THREE.Mesh(earGeo, earMat)
    rightEar.position.set(0.53, 0, 0)
    rightEar.rotation.z = Math.PI / 2
    headGroup.add(rightEar)

    const rightEarRing = new THREE.Mesh(earRingGeo, ringMat)
    rightEarRing.position.set(0.58, 0, 0)
    rightEarRing.rotation.y = Math.PI / 2
    headGroup.add(rightEarRing)

    // Top Antenna & Beacon Orb
    const antStemGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.16, 16)
    const antStemMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 })
    const antStem = new THREE.Mesh(antStemGeo, antStemMat)
    antStem.position.set(0, 0.58, 0)
    headGroup.add(antStem)

    const antOrbGeo = new THREE.SphereGeometry(0.07, 24, 24)
    const antOrbMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 2.5,
    })
    const antOrb = new THREE.Mesh(antOrbGeo, antOrbMat)
    antOrb.position.set(0, 0.69, 0)
    headGroup.add(antOrb)

    // B. Cyber Neck
    const neckGeo = new THREE.CylinderGeometry(0.16, 0.22, 0.16, 24)
    const neckMat = new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.9, roughness: 0.1 })
    const neck = new THREE.Mesh(neckGeo, neckMat)
    neck.position.set(0, 0.05, 0)
    robotGroup.add(neck)

    // C. Armored Torso & Core Reactor
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

    // Glowing Chest Reactor
    const coreGeo = new THREE.CircleGeometry(0.085, 32)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4, side: THREE.DoubleSide })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreMesh.position.set(0, 0.06, 0.28)
    torsoGroup.add(coreMesh)

    const coreRingGeo = new THREE.RingGeometry(0.095, 0.13, 32)
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

    // D. Floating Dual Orb Hands
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

    // E. Revolving Cybernetic Halo Ring
    const haloGeo = new THREE.TorusGeometry(1.05, 0.02, 16, 64)
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 2,
    })
    const haloMesh = new THREE.Mesh(haloGeo, haloMat)
    haloMesh.position.set(0, -0.15, 0)
    robotGroup.add(haloMesh)

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
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

    const coreLight = new THREE.PointLight(0x00f5d4, 2.5, 3)
    coreLight.position.set(0, -0.34, 0.45)
    scene.add(coreLight)

    // --- MOUSE & TOUCH EVENT LISTENERS ---
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const updatePointerCoords = (clientX, clientY) => {
      const rect = mount.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      pointer.targetX = (clientX - centerX) / (window.innerWidth / 2)
      pointer.targetY = (clientY - centerY) / (window.innerHeight / 2)
    }

    const onPointerMove = (e) => {
      updatePointerCoords(e.clientX, e.clientY)
    }

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        updatePointerCoords(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const onPointerLeave = () => {
      pointer.targetX = 0
      pointer.targetY = 0
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onPointerLeave, { passive: true })

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock()

    const animate = () => {
      if (isDisposed) return
      animationFrameId = requestAnimationFrame(animate)

      const t = clock.getElapsedTime()

      // Organic idle sway for mobile / idle desktop
      const idleSwayX = Math.sin(t * 0.9) * 0.18
      const idleSwayY = Math.cos(t * 0.7) * 0.09

      pointer.x = THREE.MathUtils.lerp(pointer.x, pointer.targetX || idleSwayX, 0.08)
      pointer.y = THREE.MathUtils.lerp(pointer.y, pointer.targetY || idleSwayY, 0.08)

      // Character body and head rotation follows mouse/touch
      robotGroup.rotation.y = pointer.x * 0.65
      robotGroup.rotation.x = -pointer.y * 0.35

      // Floating bobbing motion
      robotGroup.position.y = Math.sin(t * 2.2) * 0.12
      robotGroup.position.x = Math.cos(t * 1.5) * 0.04

      headGroup.rotation.y = pointer.x * 0.35
      headGroup.rotation.x = -pointer.y * 0.25

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
      if (!mount || !renderer) return
      const w = mount.clientWidth || 360
      const h = mount.clientHeight || 360
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', onResize)

    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onPointerLeave)
      window.removeEventListener('resize', onResize)
      if (renderer && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      if (renderer) renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`relative ${className} flex items-center justify-center select-none`}
    >
      {/* Soft theme color ambient glow behind canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-mint-400/25 rounded-full blur-[90px] pointer-events-none -z-10 animate-pulse"></div>
    </div>
  )
}
