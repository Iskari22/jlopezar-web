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

### Poner el email y el LinkedIn

Archivo: **`docs/data/config.js`**:

```js
window.CONFIG = {
  email: "su-direccion@dominio.es",
  linkedin: "https://www.linkedin.com/in/su-perfil/"
};
```

Con el email puesto, el bloque de contacto muestra un enlace `mailto:`, aparece el botón «Copiar» y el botón rojo «Contactar para entrevista» abre directamente el correo. Con el LinkedIn puesto, aparece su enlace en Contacto. Mientras estén vacíos, la web muestra `[EMAIL DE CONTACTO]` y no enseña LinkedIn.

Opcional: en `docs/index.html` hay un formulario de contacto preparado (Formspree), dentro de un comentario. Las instrucciones están junto a él.

### Cambiar fotos

Las fotos están en **`docs/img/`**. Para cambiar una, súbala con **el mismo nombre** y sustituya la anterior (en GitHub: entre en la carpeta, **Add file → Upload files**). Cada foto existe en tres versiones:

| Archivo | Uso | Tamaño recomendado |
|---|---|---|
| `nombre.webp` | versión normal | 1200–1400 px de ancho |
| `nombre-sm.webp` | versión ligera para móvil y miniaturas | 600–700 px de ancho |
| `nombre-hd.jpg` | descarga para prensa y foto ampliada | 1600 px en el lado largo |

Dónde se usa cada una: `casa-asia-1` (portada y kit de prensa), `casa-asia-2` y `casa-asia-3`, `rne-1/2/3`, `negocios-tv`, `france-24` y `retrato` (galería; `retrato` y `rne-2` también en el kit de prensa), `portada.webp` (cubierta del libro) y `og.jpg` (1200×630, la imagen que sale al compartir el enlace en X o LinkedIn). Para convertir a WebP sirve cualquier conversor gratuito, como squoosh.app.

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

- **Cifra de apariciones en medios.** Cuenta televisión, radio, prensa y vídeo o pódcast (72 entradas) y se redondea a la decena inferior: «70+». No cuenta las reseñas del libro (las escriben otros) ni los actos. El registro de medios muestra 76 entradas, porque incluye los 4 actos.
- **Cifras fijas.** «2.ª edición», «N.º 1 en Ciencias Militares (Amazon.es)» y «9 convenciones de la ISA» proceden de `CONTENIDO_WEB.md`. Las columnas en ABC (19) y las ciudades (28) se calculan desde los datos.
- **Biografías.** Se han escrito a partir de los datos verificados, sin nombrar universidades, en tres longitudes (en español: 54, 116 y 247 palabras; en inglés: 57, 127 y 251) y están en `docs/js/app.js` (`BIOS`). La web cuenta las palabras en directo.
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

- [ ] **Email de contacto**: `docs/data/config.js` (`email`).
- [ ] **LinkedIn**: `docs/data/config.js` (`linkedin`).
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
