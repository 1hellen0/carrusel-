**Rol:** Actúa como Desarrollador Senior en React y Vite.

**Objetivo:**
Desarrolla un laboratorio académico en JavaScript (.jsx) para Vite + React sobre automatización en tiempo real.

**Tema:**
"UI: Carrusel o presentación que avanza automáticamente y reacciona a la interacción del usuario".

### Requisitos obligatorios

1. Usar JavaScript (.jsx) con Vite + React.
2. Utilizar `useState` y `useEffect`.
3. Implementar los estados:

   * `'inactivo'`: automatización pausada por interacción.
   * `'ejecutando'`: temporizador activo.
   * `'exito'`: transición realizada correctamente.
   * `'error'`: fallo simulado de red o contenido no disponible.
4. El `useEffect` debe incluir limpieza explícita mediante `return () => clearInterval(...)` para evitar fugas de memoria.
5. El carrusel debe avanzar automáticamente cada **5 segundos**.
6. `onMouseEnter` pausa el carrusel y `onMouseLeave` lo reanuda.
7. Usar mínimo 2 componentes reutilizables:

   * `CarouselViewer.jsx`: carrusel, diapositivas, hover y contador.
   * `AutomationControls.jsx`: controles manuales, progreso y estado.
8. Usar **Tailwind CSS**, con transiciones suaves, barra de progreso e indicadores visuales según el estado.
9. Crear un `db.json` para simular los datos del carrusel y utilizar **JSON Server** como API simulada. La aplicación debe consumir los datos mediante `fetch`.
10. Simular de forma controlada un error de red o contenido no disponible y reflejarlo mediante el estado `'error'`.
11. El proyecto debe ser funcional, limpio, autocontenido y sin dependencias innecesarias.

### Estructura esperada

```text
src/
├── components/
│   ├── CarouselViewer.jsx
│   └── AutomationControls.jsx
├── App.jsx
└── ...
db.json
package.json
```

### Respuesta esperada

1. Entregar el código completo y funcional de:

   * `App.jsx`
   * `CarouselViewer.jsx`
   * `AutomationControls.jsx`
   * `db.json`
2. Indicar brevemente cómo ejecutar Vite y JSON Server.
3. Explicar brevemente dónde se implementa la limpieza del `useEffect` y qué problema evita.
4. Incluir un diagrama de workflow en **Mermaid.js** que muestre:
   **Inicio → Trigger de 5 segundos → Proceso → decisión "¿Mouse dentro / Error?" → éxito/error → bucle continuo.**
5. Mantener la respuesta concisa, sin explicaciones innecesarias.
