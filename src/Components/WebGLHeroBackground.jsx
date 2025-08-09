import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from './shader'

export default function WebGLHeroBackground({ className = '' }) {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const uniformsRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_impulse: { value: 0 },
    }
    uniformsRef.current = uniforms

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let start = performance.now()
    const render = () => {
      const t = (performance.now() - start) / 1000
      uniforms.u_time.value = t
      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(render)
    }
    render()

    const onResize = () => {
      if (!rendererRef.current) return
      const w = container.clientWidth
      const h = container.clientHeight
      rendererRef.current.setSize(w, h)
      uniforms.u_resolution.value.set(w, h)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(container)

    let lastX = 0.5, lastY = 0.5
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / Math.max(1, rect.width)
      const y = 1.0 - (e.clientY - rect.top) / Math.max(1, rect.height)
      uniforms.u_mouse.value.set(x, y)
      // impulse based on movement speed
      const dx = x - lastX
      const dy = y - lastY
      const speed = Math.min(1, Math.sqrt(dx*dx + dy*dy) * 20)
      uniforms.u_impulse.value = Math.max(uniforms.u_impulse.value, speed)
      lastX = x; lastY = y
    }
    window.addEventListener('mousemove', onMouseMove)

    // decay impulse over time
    const decay = () => {
      uniforms.u_impulse.value *= 0.92
      rafRef.current = requestAnimationFrame(decay)
    }
    decay()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`${className} absolute top-0 left-0 w-screen h-screen`} aria-hidden="true" />
  )
}


