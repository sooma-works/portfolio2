# Portfolio 2 — Estudio Lindero, arquitectura e interiores

Portfolio **de ejemplo** que Sooma (soomaworks.com) va a mostrar en su web como
muestra de lo que puede hacer. El estudio, sus socias y sus obras son
ficticios. El objetivo no es "un portfolio prolijo": es una pieza que haga
decir "wow" a quien la abra y que no se parezca a nada hecho con IA o con
plantilla. Tiene que contrastar con el portfolio 1 (fotógrafa, oscuro y
emocional): este es claro, preciso y estructural.

Antes de diseñar o escribir UI, cargá la skill `frontend-design`.

---

## 1. El estudio

- **Nombre:** Estudio Lindero ("lindero": el límite entre dos terrenos).
- **Socias:** arq. Carla Mansilla y arq. Julieta Roldán.
- **Base:** Rosario, Argentina. Fundado en 2016.
- **Qué hacen:** viviendas, reformas de departamentos e interiorismo
  comercial (cafés, locales, oficinas chicas).
- **Postura:** materiales nobles y honestos (ladrillo, hormigón visto,
  madera, terrazo), luz natural, reciclar antes que demoler.
- Textos en castellano rioplatense (voseo), con vocabulario de obra real
  (cota, corte, planta, carpintería, losa), concretos y breves.

## 2. Concepto de diseño: "El plano es la interfaz"

Todo el sitio funciona como una **lámina de arquitectura**: papel, grilla,
cotas, rótulo, líneas de dibujo técnico. El usuario no "navega una web",
recorre planos que se convierten en espacios. Es la idea rectora: si algo no
encaja con el dibujo técnico, no va.

### Paleta

| Token         | Valor     | Uso                                                   |
| ------------- | --------- | ----------------------------------------------------- |
| `--paper`     | `#f2efe8` | Fondo: papel de calco/lámina, nunca blanco puro       |
| `--graphite`  | `#1c1d1f` | Texto y líneas principales                            |
| `--line`      | `#b9b4a8` | Grilla, líneas finas, cotas secundarias               |
| `--marker`    | `#e2531f` | Acento: marcador naranja de corrección en obra        |
| `--concrete`  | `#8f8d87` | Texto secundario                                      |

El naranja se usa como en un plano corregido: marcas, círculos, flechas,
estado activo. Nunca como fondo de bloques grandes.

### Tipografía

- **Display y texto:** `Archivo` (Google Fonts, con ejes de ancho y peso).
  Usar el eje de ancho como recurso expresivo: títulos ultraexpandidos
  (`font-stretch` alto) que se comprimen al hacer scroll, o al revés.
- **Técnica:** `JetBrains Mono` para cotas, coordenadas, fichas, números de
  lámina, rótulos.
- Prohibido: Inter, Roboto, Poppins, Playfair Display, Space Grotesk, Montserrat.

### Grilla

Una grilla de dibujo visible de fondo (líneas cada 8 px muy tenues y cada
64 px un poco más marcadas), con ejes numerados en los bordes de la
pantalla (A, B, C… arriba; 1, 2, 3… al costado) como en un plano de
estructura. El layout se apoya de verdad en esa grilla.

## 3. Ideas "locas" (todas obligatorias)

1. **Hero: el plano que se dibuja y se vuelve espacio.** Al cargar, la
   planta de la obra destacada se dibuja sola en SVG (`stroke-dasharray`:
   primero muros, después aberturas, después cotas y textos). Al terminar,
   un ambiente del plano se "abre": la foto de ese ambiente aparece
   recortada exactamente con la forma del ambiente (`clip-path` con el mismo
   polígono) y se expande hasta llenar la pantalla.
2. **Cursor CAD.** En desktop, el cursor es una cruz fina que atraviesa toda
   la pantalla (dos líneas, horizontal y vertical) con las coordenadas en vivo
   al lado, en mono y en milímetros (`X 12.480 · Y 3.215`). Sobre elementos
   clicables, la cruz se "engancha" (snap) a sus bordes, como un osnap.
   En mobile no existe.
3. **Plano interactivo en cada obra.** La planta de cada proyecto es
   navegable: al pasar el mouse (o tocar, en mobile) por un ambiente, se
   resalta con rayado naranja (hatch SVG), muestra su nombre y m², y aparece
   la foto de ese ambiente. Las cotas animan sus números contando hasta el
   valor real.
4. **Índice como rótulo de lámina.** La lista de obras es una tabla con
   estética de rótulo de plano (bordes finos, celdas, mono): N° de lámina,
   obra, tipo, ubicación, m², año, estado ("En obra" / "Terminada"). Al pasar
   por una fila, la miniatura de la obra sigue al cursor.
5. **Transición "corte".** Al pasar de una página a otra, una línea de corte
   (la línea punto-raya con las flechas de los planos, `A — A'`) barre la
   pantalla de lado a lado y "corta" la página vieja, que se separa en dos.
6. **Muestrario de materiales.** Sección con muestras físicas: hormigón,
   roble, terrazo, lino, ladrillo, latón. Cada una es una ficha que se puede
   arrastrar y apilar sobre una mesa (con `framer-motion` drag), como cuando
   se arma un panel de materiales con el cliente. Textura en foto, nombre y
   proveedor ficticio en mono.
7. **Títulos que se extruyen.** El nombre de cada obra aparece primero como
   contorno (solo trazo) y al entrar en pantalla se rellena y gana sombra
   proyectada en isométrica, como si el texto se levantara del plano.

Si se te ocurre algo mejor que encaje en el concepto, proponelo, pero no
reemplaces estas ideas por versiones más tímidas.

## 4. Estructura

Usá `react-router-dom` (instalarlo):

- `/`: hero del plano → manifiesto corto del estudio (3 principios) → índice
  de obras en rótulo → muestrario de materiales → el estudio (socias,
  proceso) → contacto → footer.
- `/obras/:slug`: página de obra con ficha técnica, plano interactivo,
  fotos grandes, texto del proyecto y link a la obra siguiente.
- Netlify: agregar a `netlify.toml` el redirect SPA
  (`/*` → `/index.html` 200), igual que en `~/dev/optica-amen`.

### Obras (5)

| N° | Slug                      | Obra                    | Tipo                   | m²  | Año  | Estado    |
| -- | ------------------------- | ----------------------- | ---------------------- | --- | ---- | --------- |
| 01 | `casa-funes`              | Casa Funes              | Vivienda nueva         | 186 | 2024 | Terminada |
| 02 | `departamento-pichincha`  | Departamento Pichincha  | Reforma integral       | 74  | 2023 | Terminada |
| 03 | `almacen-orono`           | Almacén Oroño           | Café / local comercial | 62  | 2025 | Terminada |
| 04 | `casa-patio-alberdi`      | Casa Patio Alberdi      | Reciclaje de casa chorizo | 140 | 2022 | Terminada |
| 05 | `oficinas-ribera`         | Oficinas Ribera         | Interiorismo oficina   | 210 | 2026 | En obra   |

Cada obra tiene: texto de 2–3 párrafos (el problema, la idea, la solución),
ficha (ubicación, superficie, año, equipo, materiales principales), 5 a 8
fotos y su planta.

### Plantas (SVG propios, no buscarlos)

- Dibujarlas a mano en SVG, una por obra, guardadas como datos
  (`src/data/plans/<slug>.js`: muros, aberturas y ambientes como polígonos
  con nombre y m²). Así el plano interactivo y el `clip-path` del hero usan
  la misma fuente.
- Tienen que ser verosímiles: proporciones reales, muros de 15/30 cm,
  puertas con su arco de apertura, ventanas en doble línea, escala gráfica y
  norte. Los m² de los ambientes tienen que sumar aproximadamente el total.
- Estilo de dibujo: líneas de grafito de dos grosores, rayado de muros
  cortados, cotas con flechas o ticks.

## 5. Imágenes (Unsplash)

- Solo de **unsplash.com** (licencia Unsplash: uso libre, sin atribución
  obligatoria). Nada de Unsplash+ (las pagas).
- **Descargarlas** a `public/img/obras/<slug>/NN.jpg`; nunca linkear al CDN
  de Unsplash. Bajarlas a 2000 px de lado mayor (para el hero, 2400) y una
  versión de 800 px para miniaturas. JPG o WebP, calidad ~80. Usar `srcset`,
  `loading="lazy"` y `width`/`height` en todas.
- Coherencia: las fotos de una misma obra tienen que parecer del mismo
  espacio (mismos materiales, misma luz, misma paleta). Las fotos de cada
  ambiente tienen que coincidir con lo que dice su plano (si el plano tiene
  cocina integrada, la foto muestra eso).
- **Nada de edificios ni interiores reconocibles** (obras famosas, hoteles
  conocidos, piezas de diseño muy icónicas en primer plano): no le
  adjudicamos a un estudio inventado una obra real de otra persona. Espacios
  genéricos, que puedan pasar por Argentina.
- Para el muestrario de materiales, fotos de texturas en primer plano.
- Registrar cada foto en `src/data/credits.js` (autor, URL de Unsplash) y
  mostrar los créditos en una línea discreta del footer o en `/creditos`.
- Retratos de las socias: dos mujeres en contexto de trabajo (obra, mesa con
  planos), con el mismo tratamiento de color entre sí.

## 6. Footer: firma de Sooma (obligatoria)

El footer lleva la firma animada de Sooma, el logo que se transforma en
"Hecho por sooma." en loop. El original está en `~/dev/sooma-signature`.

1. Copiar `Signature.jsx`, `Signature.css` y
   `assets/sooma-tile-sobre-oscuro-ocre-tinta.svg` a
   `src/components/sooma-signature/`.
2. Reemplazar el `<Link to="/">` por
   `<a href="https://soomaworks.com" target="_blank" rel="noreferrer">`, igual
   que en `~/dev/optica-amen/src/components/SoomaSignature.jsx`.
3. Cargar la fuente `Bricolage Grotesque` (600) en `index.html`.
4. Sobre el fondo papel va la variante `black`. Si el footer tiene fondo
   grafito, usar `color` (la original). No cambiar la animación ni los
   tiempos.

El footer puede ser un rótulo de lámina: la firma de Sooma va en la celda
de "Dibujó". Al lado, en chico y en mono: `Proyecto demo · contenido ficticio`.

## 7. Calidad (definición de terminado)

- **Mobile primero de verdad:** cada idea tiene su versión táctil, no solo
  "se achica" (el plano interactivo funciona con toques, el muestrario se
  arrastra con el dedo). Probar en 375 px.
- **`prefers-reduced-motion`:** el plano aparece ya dibujado, sin barrido de
  corte ni extrusión; todo funciona con transiciones mínimas.
- **Accesibilidad:** `alt` descriptivos, los ambientes del plano accesibles
  por teclado (con `role` y `aria-label` con nombre y m²), foco visible,
  contraste AA en textos (ojo con `--line` sobre `--paper`: solo para
  líneas, no para texto).
- **Performance:** Lighthouse ≥ 90 en Performance en mobile. La foto del
  hero precargada. GSAP solo donde haga falta.
- **SEO/compartir:** `title`, `description`, `og:image`, `lang="es"`, favicon
  propio (una "L" en planta o el símbolo de norte).
- `npm run lint` y `npm run build` sin errores.
- Verificar en el navegador (preview) desktop y mobile antes de dar algo por
  terminado.

## 8. Stack y convenciones

- Vite 8 + React 19 + Tailwind 4 (`@theme` en `src/index.css` con los tokens
  de arriba) + oxlint. Ya están `framer-motion` y `lucide-react`.
- Sumar `gsap` (con ScrollTrigger) y `react-router-dom`. Opcional: `lenis`
  para scroll suave. No sumar librerías de componentes (shadcn, MUI, etc.).
- Dev server en el puerto **5182** (`server.port` en `vite.config.js`), así
  no choca con el portfolio 1.
- Estructura: `src/components/`, `src/pages/`, `src/data/` (obras, plantas,
  textos y créditos como datos, no hardcodeados en el JSX).
- Commits chicos, mensaje en castellano en infinitivo, como en el resto de
  los repos de Sooma ("Sumar el plano interactivo", "Ajustar el corte en
  mobile").
