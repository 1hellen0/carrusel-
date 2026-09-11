import { useEffect, useState } from 'react'

const ESTRELLAS = Array.from({ length: 90 }, () => ({
  izquierda: Math.random() * 100,
  superior: Math.random() * 100,
  tamano: Math.random() * 2.2 + 1,
  profundidad: Math.random() * 0.5 + 0.15,
  delay: Math.random() * 3,
  duracion: Math.random() * 2.5 + 1.5,
}))

function StarBackground() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const alMover = (evento) => {
      setMouse({
        x: evento.clientX / window.innerWidth,
        y: evento.clientY / window.innerHeight,
      })
    }
    window.addEventListener('mousemove', alMover)
    return () => window.removeEventListener('mousemove', alMover)
  }, [])

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#050816]"
      aria-hidden="true"
    >
      {ESTRELLAS.map((estrella, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${estrella.izquierda}%`,
            top: `${estrella.superior}%`,
            width: estrella.tamano,
            height: estrella.tamano,
            opacity: 0.5,
            animation: `parpadeo ${estrella.duracion}s ease-in-out ${estrella.delay}s infinite`,
            transform: `translate3d(${estrella.profundidad * 24 * (0.5 - mouse.x)}px, ${
              estrella.profundidad * 24 * (0.5 - mouse.y)
            }px, 0)`,
          }}
        />
      ))}

      <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-[28rem] w-[28rem] translate-x-1/3 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
    </div>
  )
}

export default StarBackground