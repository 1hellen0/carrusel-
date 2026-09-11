import { useCallback, useEffect, useRef, useState } from 'react'
import CarouselViewer from './components/CarouselViewer.jsx'
import AutomationControls from './components/AutomationControls.jsx'
import StarBackground from './components/StarBackground.jsx'

const API_URL = 'http://localhost:3001/carrusel'
const INTERVALO_MS = 100
const PASO_PROGRESO = 2 // 100ms × 50 pasos = 5 segundos
const PASOS_POR_CICLO = 100 / PASO_PROGRESO

function App() {
  const [items, setItems] = useState([])
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState('inactivo')
  const [progress, setProgress] = useState(0)
  const [errorSimulado, setErrorSimulado] = useState(false)
  const ticksRef = useRef(0)

  const cargar = useCallback(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Contenido no disponible')
        return res.json()
      })
      .then((data) => {
        setItems(data)
        setIndex(0)
        setProgress(0)
        setStatus('ejecutando')
      })
      .catch(() => {
        setItems([])
        setStatus('error')
      })
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  const reiniciarProgreso = useCallback(() => {
    ticksRef.current = 0
    setProgress(0)
    setStatus('exito')
  }, [])

  const avanzar = useCallback(() => {
    setIndex((i) => (items.length ? (i + 1) % items.length : 0))
    reiniciarProgreso()
  }, [items.length, reiniciarProgreso])

  const irA = useCallback(
    (direccion) => {
      if (!items.length) return
      setIndex((i) => (i + direccion + items.length) % items.length)
      reiniciarProgreso()
    },
    [items.length, reiniciarProgreso],
  )

  // Temporizador: avanza cada 5 s (solo en 'ejecutando').
  // La transición al 100 % ocurre aquí dentro del callback del intervalo.
  useEffect(() => {
    if (status !== 'ejecutando' || !items.length) return undefined

    const interval = setInterval(() => {
      ticksRef.current += 1
      setProgress((prev) => Math.min(prev + PASO_PROGRESO, 100))
      if (ticksRef.current >= PASOS_POR_CICLO) {
        ticksRef.current = 0
        avanzar()
      }
    }, INTERVALO_MS)

    // Limpieza explícita: evita intervalos huérfanos y fugas de memoria.
    return () => clearInterval(interval)
  }, [status, items.length, avanzar])

  // El estado 'exito' es transitorio: vuelve a 'ejecutando' automáticamente.
  useEffect(() => {
    if (status !== 'exito') return undefined
    const timeout = setTimeout(() => setStatus('ejecutando'), 900)
    return () => clearTimeout(timeout)
  }, [status])

  const pausar = useCallback(() => setStatus('inactivo'), [])
  const reanudar = useCallback(() => {
    // El error simulado bloquea la reanudación por hover.
    if (!errorSimulado && items.length) setStatus('ejecutando')
  }, [errorSimulado, items.length])

  const toggleError = useCallback(() => {
    const nuevo = !errorSimulado
    setErrorSimulado(nuevo)
    setStatus(nuevo ? 'error' : 'ejecutando')
  }, [errorSimulado])

  const hayItems = items.length > 0

  return (
    <div className="relative min-h-svh overflow-hidden">
      <StarBackground />
      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-8 px-4 py-12">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Datos curiosos del espacio
        </h1>
        <p className="mt-2 max-w-xl text-slate-400">
          Un dato nuevo cada 5 segundos. Avanza solo, se pausa al pasar el
          mouse y reacciona a tu interacción.
        </p>
      </header>

      <CarouselViewer
        items={items}
        index={index}
        status={status}
        onPausar={pausar}
        onReanudar={reanudar}
      />

      <AutomationControls
        status={status}
        progress={progress}
        onAnterior={() => irA(-1)}
        onSiguiente={() => irA(1)}
        onPausar={pausar}
        onReanudar={reanudar}
        errorSimulado={errorSimulado}
        onToggleError={toggleError}
        onReintentar={cargar}
        hayItems={hayItems}
        hayError={status === 'error'}
      />
    </main>
    </div>
  )
}

export default App