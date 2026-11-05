# Encargo para Claude Code: terminar la web de Juan Luis López Aranguren

Este repositorio contiene una web personal **a medio construir**. Una sesión anterior ya dejó hecho el contenido, los datos, las imágenes, los mapas, el diseño (CSS) y el HTML. Tu trabajo es **terminarla, revisarla y dejarla publicable en GitHub Pages**.

Lee también `CONTENIDO_WEB.md`, que recoge las instrucciones originales del encargo (privacidad, presentación institucional, estética, enlaces). Esas reglas siguen vigentes.

## Qué hay ya hecho

| Archivo | Contenido |
|---|---|
| `site/template.html` | HTML completo de la página. Contiene dos marcadores, `{{GLOBE}}` y `{{WORLD}}`, que se sustituyen por los SVG de los mapas. Los bloques `<!--HEAD-->` y `<!--BODY-->` sirven para generar una versión sin `<html>/<head>/<body>`, si se necesita. |
| `site/css/style.css` | Diseño completo con tema claro y oscuro: estética de carta náutica, azul cobalto del globo de la portada, rojo laca de acento y tipografías Bodoni Moda + IBM Plex. |
| `site/data/medios.js` | 84 apariciones en medios (`window.MEDIOS`), generadas desde el Excel por `gen_data.py`. Campos: fecha, medio, tipo (`tv`, `radio`, `prensa`, `podcast`, `evento`, `resena`), titulo, detalle, url, yt (id de YouTube), t, duracion, tema, destacado. |
| `site/data/articulos.js` | 25 artículos de opinión (`window.ARTICULOS`): 19 en ABC, 1 en Global Affairs y 5 antiguos sin enlace (`soloAnio: true`). |
| `site/data/publicaciones.js` | `window.PUBLICACIONES` (con `destacada: true` para las 6 de arriba), `window.TRAYECTORIA` (línea de tiempo) y `window.RECONOCIMIENTOS`. |
| `site/img/` | Fotos optimizadas en WebP (versión normal y `-sm`), versiones `-hd.jpg` para la descarga de prensa, `portada.webp`, `contraportada.webp` y `og.jpg` (1200×630). |
| `places.json` | 28 ciudades con conferencias, estancias y docencia (tipos `conf`, `est` y `doc`). |
| `svg-globe.svg`, `svg-world.svg` | Mapas ya generados. Si hace falta regenerarlos: `npm i d3-geo world-atlas topojson-client && node maps.mjs`. |
| `gen_data.py` | Regenera `medios.js` y `articulos.js` desde `datos/Contribuciones_medios.xlsx`: `python3 gen_data.py datos/Contribuciones_medios.xlsx site/data`. |
| `raw/` | Fotos originales, por si quieres recortarlas de otra forma. |

## Qué falta (en este orden)

1. **`site/data/lugares.js`**: `window.LUGARES = <contenido de places.json>;`. El orden debe coincidir con el `data-i` de los pines del SVG.
2. **`site/data/config.js`**: `window.CONFIG = { email: "", linkedin: "" };`. Si `email` está vacío, la web muestra `[EMAIL DE CONTACTO]`; no inventes un email.
3. **`site/js/app.js`**, en JavaScript sin dependencias, con todo esto:
   - **Cifras** (`#figures`): 6 bloques con su etiqueta. Apariciones en medios (contadas desde MEDIOS, por ejemplo «80+»), columnas en ABC (contadas desde ARTICULOS con medio = ABC), «2.ª edición», «N.º 1 en Ciencias Militares (Amazon.es)», «9 convenciones de la ISA», ciudades (contadas desde LUGARES). Pinta los valores finales directamente, sin contadores que empiecen en 0.
   - **Reseñas** (`#reviews`): las entradas de MEDIOS con `tipo === "resena"`, como lista de enlaces (medio y fecha a la derecha). Las que no tienen URL van sin enlace (`span.r`).
   - **Vídeos destacados** (`#videos`): 6 tarjetas `.vcard`, tomando las de MEDIOS con `yt` y `destacado` y completando con las más recientes con `yt` si faltan. Cada una lleva una miniatura `https://i.ytimg.com/vi/ID/hqdefault.jpg` dentro de `.vthumb`, con un `.ph` de respaldo (nombre del medio) por si la imagen no carga (`onerror`: ocultar la imagen), el botón `.play`, la duración y un enlace a YouTube (`watch?v=ID&t=T`) en pestaña nueva. **No uses iframes.**
   - **Registro de medios** (`#log` y `#filters`): botones de filtro con recuento (Todo, Televisión, Radio, Prensa, Vídeo y pódcast, Actos), insertados antes del `<input id="q">` y con `aria-pressed`. La búsqueda filtra por medio, título y tema. Muestra 15 entradas y el botón `#moreBtn` despliega el resto («Ver todas (N)»). Cada `li` lleva fecha (dd mmm aaaa, o «2026» si no hay fecha), `.tag.<tipo>`, `.what` con medio en negrita, título y detalle en `small`, y `.go`: «Ver ↗», «Escuchar ↗» o «Leer ↗» según el tipo, o «Sin enlace» con `.none`. Actualiza `#mediosIntro` con el total. Si no hay resultados, muestra `#logEmpty`.
   - **Artículos** (`#articles`): las tarjetas `.art` de los que tienen URL (medio · fecha, género, título h3, resumen, edición impresa en `.ed`). En `#older` van, en lista, los que tienen `soloAnio` o no tienen URL, con el aviso «(enlace pendiente)».
   - **Publicaciones**: `#featuredPubs` con las destacadas (`.pub`: tipo en `.kind.eyebrow`, título, fuente, enlace DOI `https://doi.org/...` o URL). `#publist` con todas, agrupadas por tipo (Libro, Artículos en revistas, Capítulos de libro, Obras de referencia, Informes) y ordenadas por año. Actualiza `#allPubsSummary` con «Todas las publicaciones (N)».
   - **Mapa**: al pulsar un `.pin`, o con Enter o espacio, rellena `#placeKind` (país), `#placeName` y `#placeWhat`, y marca el pin con `.active`. Rellena `#placeList` con todas las ciudades, ordenadas por tipo.
   - **Trayectoria**: `#timeline` desde TRAYECTORIA (`li.<clase>` con `.yr` y `.tx` → `b` título + `span` lugar) y `#honors` desde RECONOCIMIENTOS.
   - **Galería** (`#gallery`): 9 botones `.g1`…`.g9` con imagen y pie: casa-asia-1/2/3, rne-1/2/3, negocios-tv, france-24 y retrato. Al pulsar se abre `#lightbox` con la versión `-hd.jpg`; se cierra con Esc, con `#lbClose` o pulsando el fondo.
   - **Biografías** (pestañas `[data-bio]`): tres textos (breve ≈50, media ≈120 y completa ≈250 palabras), en español y en inglés. Escríbelos en tono sobrio, sin superlativos, a partir de los datos (ver `CONTENIDO_WEB.md`, sección Bios). `#bioCount` muestra el número de palabras. `#copyBio` copia con `navigator.clipboard.writeText`; si falla, selecciona el texto. Muestra el aviso `#toast` «Biografía copiada».
   - **Email**: `#emailV` con `CONFIG.email` o el marcador. `#copyEmail` lo copia.
   - **Idioma ES/EN** (`#langBtn`): diccionario para `data-i18n` (texto) y `data-i18n-html` (HTML), con la traducción al inglés de navegación, hero, libro (sinopsis incluida), prensa, biografías, contacto y pie. Cambia `document.documentElement.lang` y el texto del botón (EN/ES), y guarda la preferencia en `localStorage` dentro de try/catch. Las secciones sin traducir (medios, artículos, publicaciones) se quedan en español.
   - **Tema** (`#themeBtn`): alterna `data-theme` entre `light` y `dark` en `<html>`, partiendo de `prefers-color-scheme`, y lo guarda en `localStorage` con try/catch.
   - **Menú móvil** (`#menuBtn`): abre y cierra `#nav` (clase `open`), actualiza `aria-expanded` y lo cierra al pulsar un enlace.
4. **`build.py`**: genera `docs/index.html` sustituyendo `{{GLOBE}}` y `{{WORLD}}` por el contenido de los SVG, y copia `css/`, `js/`, `data/` e `img/` a `docs/`. GitHub Pages servirá la carpeta `/docs` de la rama `main`. Añade `docs/robots.txt`, `docs/sitemap.xml` (con el marcador `[URL DEL SITIO]`) y `docs/.nojekyll`.
5. **Revisión visual**: abre `docs/index.html` con Playwright (Chromium ya instalado) a 1280 px y a 390 px de ancho, en tema claro y oscuro. Revisa que nada desborde horizontalmente, que no haya errores de consola, que los filtros, el mapa, la galería, las pestañas de biografía y el cambio de idioma funcionen, y que se lea bien en los dos temas. Corrige lo que veas.
6. **Comprobación de enlaces**: intenta localizar con búsqueda web los cinco artículos antiguos (El Mundo 2022, The Conversation 2022, La Vanguardia 2014 ×2 y Policy Forum de la ANU 2016). Añade solo los enlaces que encuentres y compruebes; nunca construyas una URL.
7. **`README.md`** en español, para alguien que no programa: cómo publicar (Settings → Pages → rama `main`, carpeta `/docs`), cómo añadir una entrevista o un artículo editando `docs/data/*.js`, cómo poner el email y el LinkedIn en `config.js`, cómo cambiar fotos, cómo conectar un dominio propio (archivo `docs/CNAME` y DNS) y cómo sustituir `[URL DEL SITIO]`. Al final, lista todo lo pendiente: email, LinkedIn, URL del sitio, los enlaces antiguos que no aparezcan y las apariciones excluidas por no estar confirmadas (Telemadrid 22/04, el vídeo de YouTube del 18/05 sin identificar y las colaboraciones futuras de Onda Cero y Antena 3).
8. **Entrega**: haz commit en una rama y abre un *pull request* hacia `main` con un resumen claro.

## Reglas que no se pueden romper

- No publiques fecha de nacimiento, dirección ni teléfono.
- En la portada y en las biografías, preséntalo como «Profesor de Relaciones Internacionales y Derecho internacional público», sin nombrar universidades. Las universidades solo aparecen en Trayectoria.
- No uses logotipos de medios; los nombres van en tipografía.
- No descargues fotos de internet: usa solo las de `site/img/` o `raw/`.
- No inventes datos, cifras ni enlaces.
