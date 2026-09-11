# Descripción del Trabajo: Carrusel Automatizado en Tiempo Real

## Resumen

Se desarrolló una aplicación web académica en **React + Vite** que implementa un
carrusel automatizado con reacciones a la interacción del usuario. La página
presenta un conjunto de diapositivas que avanzan de forma automática cada **5
segundos**, se pausan al pasar el mouse por encima y se reanudan al salir.

El tema de contenido elegido fue **"Datos curiosos del espacio"**, con datos
entretenidos sobre planetas, física, Neptuno, agujeros negros y las misiones
Apolo.

## Objetivo

Construir un laboratorio de automatización en tiempo real que demuestre el uso
correcto de los hooks `useState` y `useEffect` de React, incluyendo la limpieza
explícita de temporizadores para evitar fugas de memoria, y el consumo de datos
desde una API simulada.

## Lo que se hizo en la página

- **Carrusel de diapositivas**: cada tarjeta se muestra a pantalla completa y
  avanza automáticamente cada 5 segundos con una transición suave.
- **Máquina de estados** con cuatro estados:
  - `inactivo`: automatización pausada por interacción del usuario.
  - `ejecutando`: temporizador activo y avance automático.
  - `exito`: transición realizada correctamente.
  - `error`: fallo simulado de red o contenido no disponible.
- **Interacción por hover**: `onMouseEnter` pausa el carrusel y `onMouseLeave`
  lo reanuda.
- **Barra de progreso**: visualiza el avance del ciclo de 5 segundos y cambia de
  color según el estado de la automatización.
- **Indicadores y contador**: puntos indicadores de posición y contador "n / N".
- **Controles manuales**: botones Anterior / Siguiente, Pausar / Reanudar,
  Simular error de red y Reintentar conexión.
- **Simulación de error**: un botón fuerza el estado `error` y otro restaura la
  red y reintenta la carga de datos.
- **Datos desde API simulada**: el contenido se obtiene mediante `fetch` desde
  `db.json` servido por **JSON Server** en el puerto 3001.
- **Estilos con Tailwind CSS**: transiciones suaves, animaciones y diseño con
  gradientes en cada diapositiva.

## Estructura del proyecto

```text
carrusel-trabajo/
├── src/
│   ├── components/
│   │   ├── CarouselViewer.jsx       # Carrusel, diapositivas, hover y contador
│   │   └── AutomationControls.jsx   # Controles manuales, progreso y estado
│   ├── App.jsx                      # Estado global y temporizador principal
│   ├── main.jsx                     # Punto de entrada de React
│   └── index.css                    # Import de Tailwind y estilos base
├── db.json                          # Datos simulados servidos por JSON Server
├── vite.config.js
├── package.json
└── index.html
```

## Temporizador y limpieza de efectos

En `App.jsx`, un intervalo de 100 ms incrementa el progreso en pasos de 2 %. Al
alcanzar 50 pasos (equivalente a 5 segundos) se avanza a la siguiente
diapositiva.

La limpieza se implementa en el `useEffect` del temporizador con
`return () => clearInterval(interval)`. Esto evita que queden intervalos
huérfanos al cambiar de estado (pausa, error o desmontaje), previniendo fugas de
memoria y ejecuciones duplicadas.

## Cómo ejecutar

1. Arrancar JSON Server (API simulada):

   ```bash
   npm run server
   ```

2. Arrancar Vite:

   ```bash
   npm run dev
   ```

3. Abrir la URL que muestra Vite (por defecto `http://localhost:5173`).

## Verificaciones realizadas

- `npm run lint`: sin errores ni advertencias de ESLint.
- `npm run build`: compilación exitosa en producción.