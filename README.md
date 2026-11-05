# Web de Juan Luis López Aranguren

Web personal estática (HTML, CSS y JavaScript, sin servidor ni base de datos), pensada para publicarse gratis con **GitHub Pages**. No usa cookies ni rastreadores.

- **`docs/`** es la web publicada. Es la carpeta que GitHub Pages sirve y la que se edita para el día a día.
- **`site/`** es el «molde» del que sale `docs/`. Solo hace falta si se quiere regenerar la web completa (ver el final).

---

## 1. Publicar la web (solo la primera vez)

1. En GitHub, abra el repositorio y pulse **Settings** (Configuración).
2. En el menú de la izquierda, entre en **Pages**.
3. En **Build and deployment → Source**, elija **Deploy from a branch**.
4. En **Branch**, elija la rama **`main`** y la carpeta **`/docs`**. Pulse **Save**.
5. Al cabo de uno o dos minutos, GitHub muestra arriba la dirección de la web (del tipo `https://usuario.github.io/jlopezar-web/`).

Cada vez que guarde un cambio en `docs/` dentro de la rama `main`, la web se actualiza sola en uno o dos minutos.

## 2. Cómo editar sin programar

Todos los archivos se pueden editar desde la propia web de GitHub: abra el archivo, pulse el icono del lápiz (**Edit this file**), haga el cambio y pulse **Commit changes**.

Al editar los archivos de datos (`docs/data/*.js`), conviene **copiar un bloque ya existente** `{ ... }` y cambiar solo los textos entre comillas. Respete las comas entre bloques y las comillas `"`. Si algo deja de verse, lo más probable es que falte una coma o una comilla.

### Añadir una entrevista o aparición en medios

Archivo: **`docs/data/medios.js`**. Copie un bloque y péguelo al principio de la lista, justo después de `window.MEDIOS = [`:

```js
 {
  "fecha": "2026-11-20",
  "fechaTexto": "",
  "medio": "RNE – Cinco Continentes",
  "tipo": "radio",
  "titulo": "Entrevista sobre la cumbre de la APEC",
  "detalle": "",
  "url": "https://...",
  "yt": "",
  "t": 0,
  "duracion": "",
  "tema": "Asia-Pacífico",
  "destacado": false
 },
```

- **`fecha`**: año-mes-día (`2026-11-20`). Si no la sabe, déjela vacía (`""`) y ponga el año en `fechaTexto`.
- **`tipo`**: `"tv"`, `"radio"`, `"prensa"`, `"podcast"` (vídeo o pódcast), `"evento"` (actos y presentaciones) o `"resena"` (reseñas del libro escritas por otros; aparecen en la sección del libro, no en el registro).
- **`url`**: el enlace. Si no lo hay, déjelo vacío y la web mostrará «Sin enlace».
- **`yt`**: si es un vídeo de YouTube, el código de 11 caracteres que va tras `watch?v=` (en `https://www.youtube.com/watch?v=cKNOeqXKink` es `cKNOeqXKink`). **`t`**: segundo en que debe empezar (0 si es desde el principio). **`duracion`**: por ejemplo `"38:23"`.
- **`destacado`**: `true` para que el vídeo salga entre las seis tarjetas grandes de «En los medios» (se muestran los destacados más recientes y, si faltan, los últimos vídeos).

La cifra «apariciones en medios» de la portada y los contadores de los filtros se recalculan solos.

### Añadir un artículo de opinión

Archivo: **`docs/data/articulos.js`**. Copie un bloque y póngalo al principio:

```js
 {
  "fecha": "2026-11-20",
  "medio": "ABC",
  "genero": "La Tercera",
  "titulo": "Título del artículo",
  "tema": "",
  "resumen": "Una o dos frases sobre el artículo.",
  "url": "https://www.abc.es/...",
  "soporte": "Web y papel",
  "impresa": "La Tercera, p. 3"
 },
```

`impresa` es la página de la edición en papel (déjelo vacío si solo salió en web). Los artículos sin `url` aparecen en la lista «Artículos anteriores» con el aviso «(enlace pendiente)», o «(solo en papel)» si `soporte` dice «Solo papel» (es el caso de «El tren bala japonés y el desastre ferroviario socialista», ABC). La cifra de columnas en ABC se recalcula sola.

### Añadir una publicación académica

Archivo: **`docs/data/publicaciones.js`** (las instrucciones están en las primeras líneas). Si tiene DOI, escríbalo sin `https://doi.org/` (por ejemplo `doi: "10.5209/mira.80781"`). Con `destacada: true` aparece arriba, en las tarjetas.

En el mismo archivo están la **trayectoria** (`window.TRAYECTORIA`) y los **reconocimientos** (`window.RECONOCIMIENTOS`).

### Cambiar el email, el LinkedIn, X u ORCID

Archivo: **`docs/data/config.js`**. Ya contiene los datos actuales:

```js
window.CONFIG = {
  email: "...",            // email principal: sale primero en Contacto y lo usa el botón «Contactar para entrevista»
  emailAcademico: "...",   // email académico: segunda línea de Contacto
  linkedin: "https://www.linkedin.com/in/juanluislopezaranguren",
  x: "jlopezar",           // usuario de X, sin @
  orcid: "0000-0002-4720-863X"
};
```

Cada email aparece en Contacto con su etiqueta y un botón «Copiar». Si deja un email vacío (`""`), esa línea desaparece. No ponga aquí teléfono, fecha de nacimiento ni dirección postal. Si cambia el LinkedIn, cámbielo también en `sameAs`, dentro del bloque `application/ld+json` de `docs/index.html`, que es lo que leen los buscadores.

Opcional: en `docs/index.html` hay un formulario de contacto preparado (Formspree), dentro de un comentario. Las instrucciones están junto a él.

### Cambiar fotos

Las fotos están en **`docs/img/`**. Para cambiar una, súbala con **el mismo nombre** y sustituya la anterior (en GitHub: entre en la carpeta, **Add file → Upload files**). Cada foto existe en tres versiones:

| Archivo | Uso | Tamaño recomendado |
|---|---|---|
| `nombre.webp` | versión normal | 1200–1400 px de ancho |
| `nombre-sm.webp` | versión ligera para móvil y miniaturas | 600–700 px de ancho |
| `nombre-hd.jpg` | descarga para prensa y foto ampliada | 1600 px en el lado largo |

Dónde se usa cada una: `autor-libro` (foto de la portada, junto al nombre), `casa-asia-1` (kit de prensa y galería), `casa-asia-2` y `casa-asia-3`, `rne-1/2/3`, `negocios-tv`, `france-24` y `retrato` (galería; `retrato` y `rne-2` también en el kit de prensa), `autor-libro` también en el kit de prensa, `portada.webp` (cubierta del libro) y `og.jpg` (1200×630, la imagen que sale al compartir el enlace en X o LinkedIn; ahora es la foto con el libro). Para convertir a WebP sirve cualquier conversor gratuito, como squoosh.app.

Los pies de foto de la galería están en `docs/js/app.js`, en la lista `GALERIA`.

### Sustituir `[URL DEL SITIO]`

Cuando tenga la dirección definitiva (la de GitHub Pages o su dominio propio), sustituya el texto `[URL DEL SITIO]` por ella, **sin barra final** (por ejemplo `https://www.lopezaranguren.es`), en estos tres archivos:

- `docs/index.html` (aparece varias veces en la cabecera: enlace canónico e imagen al compartir en redes)
- `docs/robots.txt`
- `docs/sitemap.xml`

## 3. Conectar un dominio propio

1. Compre el dominio en un registrador (Dinahosting, OVH, Namecheap, etc.).
2. En GitHub, cree el archivo **`docs/CNAME`** con una sola línea: el dominio, por ejemplo `www.lopezaranguren.es`.
3. En el panel DNS del registrador, cree:
   - un registro **CNAME** de `www` que apunte a `USUARIO.github.io` (su usuario de GitHub);
   - y, si quiere que funcione también sin `www`, cuatro registros **A** para el dominio raíz con estas IP de GitHub: `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`.
4. En **Settings → Pages**, escriba el dominio en **Custom domain**, guarde y, cuando lo permita (puede tardar hasta 24 horas), marque **Enforce HTTPS**.
5. Sustituya `[URL DEL SITIO]` como se explica arriba.

## 4. Para quien programe: regenerar la web

```bash
python3 build.py
```

Crea `docs/` a partir de `site/template.html` (sustituye `{{GLOBE}}` y `{{WORLD}}` por `svg-globe.svg` y `svg-world.svg`), copia `site/css`, `site/js`, `site/data` y `site/img`, y escribe `robots.txt`, `sitemap.xml` y `.nojekyll`. Conserva `docs/CNAME` si existe. **Atención:** `docs/` se reescribe entera; si ha editado a mano `docs/data/*.js`, copie antes esos cambios a `site/data/`.

Otros scripts:

- `python3 gen_data.py datos/Contribuciones_medios.xlsx site/data` regenera `medios.js` y `articulos.js` desde el Excel (requiere `openpyxl`). Sobrescribe esos dos archivos.
- `npm i d3-geo world-atlas topojson-client && node maps.mjs` regenera los dos mapas SVG desde `places.json`. Si añade una ciudad, añádala en `places.json` **y** en `site/data/lugares.js`, en el mismo orden, porque cada punto del mapa se enlaza con su ciudad por posición.

Para verla en local: `cd docs && python3 -m http.server` y abra `http://localhost:8000`.

---

## 5. Decisiones tomadas en esta versión

- **Cifra de apariciones en medios.** Cuenta televisión, radio, prensa y vídeo o pódcast (77 entradas) y se redondea a la decena inferior: «70+». No cuenta las reseñas del libro (las escriben otros) ni los actos. El registro de medios muestra 81 entradas, porque incluye los 4 actos.
- **Cifras de la portada (actualizadas con el CV de noviembre de 2026).** Son seis:
  - apariciones en medios;
  - **20 piezas en ABC desde 2025, dos de ellas Terceras**. La web cuenta las de `articulos.js` (hoy 19) y nunca muestra menos de 20;
  - 2.ª edición;
  - n.º 1 en Ciencias Militares y n.º 4 en Relaciones Internacionales y Globalización (Amazon.es);
  - **36 publicaciones: 14 artículos en revistas y 22 capítulos**, según el CV y fijadas en `docs/js/app.js` (`ART_REVISTAS` y `CAPITULOS`);
  - 9 convenciones de la ISA.

  Para dejar sitio a la cifra de publicaciones, la de **28 ciudades** pasa a la introducción del mapa, donde se calcula desde los datos.
- **Medios sin fecha.** Intereconomía, EITB, Navarra Televisión, Cadena SER y Aragón Radio están en la franja de medios y en el registro como «Sin fecha» y «Sin enlace». Se añaden en `gen_data.py`, junto con los títulos reales de siete entrevistas, para que no se pierdan al regenerar desde el Excel. La entrada de TVE del 15/05/2026 pasa a llamarse «TVE – Telediario de la noche».
- **Trayectoria.** Se añadió la docencia invitada en la LUISS. En la Universidad Francisco de Vitoria consta la asignatura «Mundo Actual: China, India y Japón», en inglés. En el puesto de Profesor Ayudante Doctor se indica que enseña en la Universidad de Zaragoza desde 2017. El cargo en la ISA usa ahora su nombre oficial, *Governing Board* de la International Communication Section. En Reconocimientos figuran los dos sexenios (CNEAI y ACPUA) y la acreditación ANECA a Profesor Contratado Doctor.
- **Tipografía.** A petición del autor, los titulares y el texto usan Times New Roman, en lugar de Bodoni Moda e IBM Plex Sans, con un tamaño base mayor. Las etiquetas pequeñas, fechas y botones de filtro usan IBM Plex Sans y miden al menos 0,82rem. El cambio está en `site/css/style.css` (variables `--f-display`, `--f-body` y `--f-mono`).
- **Segunda edición:** junio de 2026, a los dos meses de la publicación.
- **Artículos publicados solo en papel** (por ejemplo, «El tren bala japonés y el desastre ferroviario socialista», ABC, 1 de febrero de 2026): aparecen como tarjeta, sin enlace, con la página de la edición impresa.
- **Sin cantidades de dinero.** La web no muestra el importe de ninguna beca, ayuda ni proyecto. Se han quitado también de `CONTENIDO_WEB.md`. Siguen en el historial de Git (el primer commit de `main`).
- **Biografías.** Se han escrito a partir de los datos verificados y del CV de noviembre de 2026, sin nombrar universidades, en tres longitudes (en español: 57, 120 y 247 palabras; en inglés: 56, 127 y 255) y están en `docs/js/app.js` (`BIOS`). La web cuenta las palabras en directo.
- **Inglés.** Se traducen el menú, la portada, el libro (con su sinopsis), la sala de prensa, las biografías, el contacto y el pie. Medios, artículos, publicaciones, mapa y trayectoria siguen en español, como pedía el encargo. El título del libro se mantiene en español, con el subtítulo traducido como referencia.
- **Duración corregida.** En el Excel, la duración «14:46» de la tertulia de Negocios TV del 14/10/2026 (parte 2) se había convertido en una hora («14:46:00»). `gen_data.py` ahora lo corrige al leer el Excel.
- **Galería.** El título «En plató, en antena y en el aula» se cambió por «En plató, en antena y en presentaciones», porque no hay fotos de clase. Los pies de foto describen solo lo que se ve en cada imagen.
- **Mapa en móvil.** El mapa conserva un ancho mínimo para que los puntos se puedan pulsar, se desliza en horizontal y se centra solo en la ciudad elegida. La lista de ciudades bajo el mapa también es pulsable, lo que ayuda con los puntos de Japón, muy juntos entre sí.
- **Vídeos.** Las tarjetas no incrustan YouTube (no hay iframes ni cookies de terceros): enlazan al vídeo en una pestaña nueva. Si la miniatura no carga, la tarjeta muestra el nombre del medio.
- **Tema y accesibilidad.** El tema claro u oscuro sigue la preferencia del dispositivo y recuerda la elección. Se han añadido el enlace «Saltar al contenido», la navegación por teclado en las pestañas de biografía (flechas), el mapa (Enter o espacio) y la foto ampliada (Esc), y el texto oscuro sobre el botón rojo en tema oscuro (para un contraste suficiente).
- **Cabecera.** Se quitó una etiqueta `meta` ajena a la web (`claude:viewport-fit-sides`) y se añadieron `og:url`, `twitter:title` y `twitter:description`.
- **Carpeta `raw/`.** El encargo la menciona (fotos originales), pero no está en el repositorio. Se han usado solo las fotos de `site/img/`.

### Comprobación de enlaces antiguos

No se ha podido abrir ninguna de estas páginas desde el entorno de trabajo (red restringida), así que el criterio ha sido el resultado del buscador:

- **The Conversation (2022)** «Rushdie y Averroes frente a los fanatismos»: añadido. El buscador devuelve la página del artículo con ese título y su perfil de autor en The Conversation: <https://theconversation.com/rushdie-y-averroes-frente-a-los-fanatismos-189711>
- **Policy Forum, ANU (2016)** «Seoul and Tokyo's new security axis»: añadido. El buscador devuelve la página del artículo y su ficha de autor en Policy Forum: <https://www.policyforum.net/seoul-tokyos-new-security-axis/>
- **El Mundo (2022)** «Las islas Senkaku y la integridad territorial de Japón»: **no añadido**. Solo aparece citado en la bibliografía de un TFG de la Universidad de Zaragoza (UE Studio, 12 de julio de 2022), con esta dirección: `https://www.elmundo.es/uestudio/2022/07/12/62cc20b0e4d4d8d1248b457e.html`. Compruebe que abre su artículo y, si es así, póngala en `url`.
- **La Vanguardia (2014)** «El elefante blanco de Hong Kong» (13 de octubre de 2014, p. 25) y «La nueva familia de los libres» (10 de abril de 2014, p. 17): **no añadidos**. No aparecen en lavanguardia.com; solo hay copias escaneadas subidas a ResearchGate y Academia.edu. Si quiere, puede enlazar esas copias o la hemeroteca de La Vanguardia.

---

## 6. Pendiente de completar

- [ ] **Una pieza de ABC** que falta en `docs/data/articulos.js`: el CV cuenta 20 y el archivo tiene 19.
- [ ] **Un artículo de revista y dos capítulos de libro** que faltan en `docs/data/publicaciones.js`: el CV cuenta 14 y 22, y el archivo tiene 13 y 20.
- [ ] **Fecha y enlace** de las intervenciones en Intereconomía, EITB, Navarra Televisión, Cadena SER y Aragón Radio, si los tiene.
- [ ] **URL del sitio**: sustituir `[URL DEL SITIO]` en `docs/index.html`, `docs/robots.txt` y `docs/sitemap.xml`.
- [ ] **Enlaces de artículos antiguos** que no se han podido confirmar (en `docs/data/articulos.js`):
  - El Mundo (2022), «Las islas Senkaku y la integridad territorial de Japón» (ver la dirección candidata arriba).
  - La Vanguardia (2014), «El elefante blanco de Hong Kong».
  - La Vanguardia (2014), «La nueva familia de los libres».
- [ ] **Apariciones excluidas por no estar confirmadas** (están en el Excel y `gen_data.py` las deja fuera a propósito). Si se confirman, añádalas a `docs/data/medios.js`:
  - Telemadrid, conexión del 22/04/2026 (solo consta el contacto).
  - Vídeo de YouTube del 18/05/2026, sin identificar.
  - Onda Cero (Carlos Alsina): posible colaboración futura.
  - Antena 3 (Buendía Estudios): posible colaboración futura.
  - RNE – Mediodía, conexión programada para el 19/06/2026, sin confirmar que se emitiera.
  - RNE Navarra (Pamplona), entrevista del 02/06/2026 pendiente de emisión.
- [ ] **Sesión *Author Meets Critics*** en la AAS: no se muestra hasta que se confirme la aceptación.
- [ ] **CV en PDF**: no hay archivo `cv/CV_Lopez_Aranguren.pdf`, por eso la web no ofrece la descarga del CV.
