const GRADIENTES = [
  'from-violet-500 to-fuchsia-500',
  'from-sky-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
]

const ESTADOS = {
  inactivo: {
    etiqueta: 'Inactivo',
    clase: 'border-slate-400 bg-slate-500/15 text-slate-300',
    punto: 'bg-slate-400',
  },
  ejecutando: {
    etiqueta: 'Ejecutando',
    clase: 'border-sky-400 bg-sky-500/15 text-sky-300',
    punto: 'bg-sky-400 animate-pulse',
  },
  exito: {
    etiqueta: 'Éxito',
    clase: 'border-emerald-400 bg-emerald-500/15 text-emerald-300',
    punto: 'bg-emerald-400',
  },
  error: {
    etiqueta: 'Error',
    clase: 'border-rose-400 bg-rose-500/15 text-rose-300',
    punto: 'bg-rose-500',
  },
}

function CarouselViewer({ items, index, status, onPausar, onReanudar }) {
  return (
    <div
      className="group relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl shadow-black/40"
      onMouseEnter={onPausar}
      onMouseLeave={onReanudar}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((item, i) => (
          <article
            key={item.id}
            className={`flex min-w-full items-center justify-center bg-gradient-to-br p-10 sm:p-16 ${GRADIENTES[i % GRADIENTES.length]}`}
          >
            <div className="w-full text-center text-white drop-shadow-lg">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                {item.etiqueta}
              </span>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{item.titulo}</h2>
              <p className="mx-auto mt-4 max-w-md text-base text-white/85 sm:text-lg">
                {item.descripcion}
              </p>
              <span className="mt-6 inline-block rounded-lg bg-black/25 px-4 py-1.5 font-mono text-sm">
                {i + 1} / {items.length}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${ESTADOS[status].clase}`}
        >
          <span className={`h-2 w-2 rounded-full ${ESTADOS[status].punto}`} />
          {ESTADOS[status].etiqueta}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {items.map((item, i) => (
          <span
            key={item.id}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/40'
            }`}
          />
        ))}
      </div>

      {status === 'inactivo' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px]">
          <span className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg">
            ⏸ Automatización en pausa
          </span>
        </div>
      )}
    </div>
  )
}

export default CarouselViewer