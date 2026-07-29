# Unidad 4 · Vectores en el plano y en el espacio

Proyecto web estático para **Álgebra y Geometría I – Ingeniería en Petróleo**. Reorganiza la teoría completa de vectores de 2026, el Trabajo Práctico 4 del recursado, su resolución y los materiales 2025 como una unidad interactiva preparada para GitHub Pages.

## Contenidos

- Magnitudes escalares y vectoriales.
- Vector fijo, vector libre, dirección, sentido y módulo.
- Vectores equivalentes y componentes en \(\mathbb R^2\) y \(\mathbb R^3\).
- Operaciones por componentes e interpretación geométrica.
- Regla de la poligonal y regla del paralelogramo.
- Vector determinado por dos puntos.
- Paralelismo y combinación lineal.
- Norma, distancia, versores y versores canónicos.
- Descomposición en componentes cartesianas.
- Aplicaciones a fuerzas, fluidos y velocidad de un buque.
- Producto escalar, ángulo, ortogonalidad, proyección y trabajo.
- Producto vectorial, regla de la mano derecha y áreas.
- Producto mixto, coplanaridad, volumen y vector altura.
- Applet de vectores libres con puntos móviles, copias equivalentes y vector representante.
- Práctica guiada, detector de errores y autoevaluación aleatoria.

Las expresiones matemáticas se muestran con **MathJax**. Las visualizaciones tridimensionales se construyen con **Three.js** y permiten rotación, zoom, desplazamiento y reinicio de cámara. El progreso se guarda en el navegador mediante `localStorage`.

## Actividades interactivas

- Laboratorio del ejercicio 1 del TP: traslado, escalado y reflexión de vectores.
- Calculadora explicativa del vector \(\overrightarrow{PQ}\).
- Operaciones del TP con comparación analítica y gráfica.
- Explorador del producto de un vector por un escalar.
- Visualizador 3D de componentes y proyecciones sobre los planos coordenados.
- Comprobador de combinaciones lineales.
- Calculadora de norma y versor.
- Explorador de parámetros con norma prescrita.
- Descomposición dinámica mediante módulo y ángulo.
- Aplicaciones interactivas a fuerzas y velocidades.
- Laboratorio de producto escalar, ángulo y proyección.
- Simulador del trabajo mecánico según el ángulo.
- Laboratorio 3D de producto vectorial y área.
- Familia de vectores perpendiculares a dos vectores.
- Paralelepípedo 3D con área de base, volumen y vector altura.
- Laboratorio de coplanaridad con parámetro.
- Resoluciones progresivas con botones para mostrar cada paso.
- Applet interactivo de vector libre: arrastre de extremos, componentes dinámicas, equivalentes y representante.
- Autoevaluación aleatoria de diez preguntas.

## Estructura

```text
unidad-4-vectores-github/
├── index.html
├── styles.css
├── app.js
├── three-viewers.js
├── README.md
├── manifest.webmanifest
├── .nojekyll
├── assets/
│   └── favicon.svg
└── materiales/
    ├── teoria-vectores-2026.pdf
    ├── tp4-recursado-2026.tex
    ├── resolucion-tp4-recursado-2026.tex
    ├── tp4-2025.pdf
    ├── tp4-2025.tex
    ├── resolucion-tp4-2025.pdf
    └── resolucion-tp4-2025.tex
```

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub.
2. Subir **el contenido interior de esta carpeta** a la raíz del repositorio.
3. Abrir `Settings` → `Pages`.
4. En `Build and deployment`, elegir `Deploy from a branch`.
5. Seleccionar la rama `main` y la carpeta `/ (root)`.
6. Guardar y esperar a que GitHub muestre la dirección publicada.

No se necesita `package.json`, Node.js ni servidor.

## Probar localmente

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000`.

> Conviene usar un servidor local y no abrir `index.html` directamente, especialmente para probar los módulos ES de Three.js.

## Revisión de los materiales

La página toma como referencia principal la teoría y el TP del recursado 2026. La resolución 2025 se utiliza como material complementario y se señalan diferencias cuando corresponde:

- En una sección de la resolución 2025, el enunciado presenta los puntos `A=(1,3,1)`, `B=(1,2,1)` y `C=(0,0,2)`, pero el desarrollo sustituye otros puntos. La página no mezcla esos datos.
- Algunas expresiones de versores y trabajo aparecen deformadas en el texto extraído del PDF. La página conserva la definición matemática y recalcula los resultados desde los datos del ejercicio.
- En el ejemplo tridimensional de ángulo y proyección aparecen componentes intercambiadas en algunas líneas del desarrollo. Las actividades verifican cada resultado por producto escalar y norma.
- En el ejercicio 1 del recursado, “igual dirección y doble longitud” admite los dos sentidos si no se agrega la condición “mismo sentido”. La página lo explica explícitamente.

## Videos

Los videos se cargan sólo cuando el estudiante presiona el botón correspondiente. Para modificar un video, cambiar el atributo `data-video-id` en `index.html`.

## Edición rápida

- Colores y diseño: variables al comienzo de `styles.css`.
- Ejemplos guiados y preguntas: objetos al comienzo de `app.js`.
- Visualizaciones 3D: `three-viewers.js`.
- Textos y estructura: `index.html`.


## Actualización: vectores libres

En el módulo de conceptos se agregó un applet basado en la teoría y en la presentación de Vectores Parte 1. Permite mover los puntos inicial y final, observar las componentes de `PQ`, trasladar copias equivalentes y distinguir el vector ligado del vector libre representante con origen en `(0,0)`.
