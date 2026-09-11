const COLORES_BARRA = {
  inactivo: 'bg-slate-400',
  ejecutando: 'bg-sky-400',
  exito: 'bg-emerald-400',
  error: 'bg-rose-500',
}

function AutomationControls({
  status,
  progress,
  onAnterior,
  onSiguiente,
  onPausar,
  onReanudar,
  errorSimulado,
  onToggleError,
  onReintentar,
  hayItems,
  hayError,
}) {
  return (
    <div className="w-full max-w-3xl space-y-5 rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-2xl shadow-black/40">

      <div className="flex items-center justify-between gap-4">
        <button
          disabled={!hayItems}
          onClick={onAnterior}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Anterior
        </button>

        <button
          disabled={!hayItems}
          onClick={status === 'ejecutando' ? onPausar : onReanudar}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            status === 'ejecutando'
              ? 'bg-sky-600 text-white hover:bg-sky-500'
              : 'bg-emerald-600 text-white hover:bg-emerald-500'
          } disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {status === 'ejecutando' ? '⏸ Pausar' : '▶ Reanudar'}
        </button>

        <button
          disabled={!hayItems}
          onClick={onSiguiente}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente →
        </button>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-100 ${COLORES_BARRA[status]}`}
          style={{ width: `${status === 'error' ? 100 : progress}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onToggleError}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            errorSimulado
              ? 'bg-rose-600 text-white hover:bg-rose-500'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {errorSimulado ? '✕ Restaurar red' : '⚡ Simular error de red'}
        </button>

        {hayError && (
          <button
            onClick={onReintentar}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-500"
          >
            🔄 Reintentar conexión
          </button>
        )}
      </div>
    </div>
  )
}

export default AutomationControls