# CONTENIDO_WEB.md — Web personal de Juan Luis López Aranguren

> **Para Claude Code:** este archivo contiene (A) las instrucciones del encargo y (B) todo el contenido verificado. Constrúyelo todo a partir de aquí. No inventes datos, cifras, cargos ni enlaces. Si falta algo, déjalo marcado como `[PENDIENTE]`.

---

## A. INSTRUCCIONES DEL ENCARGO

### Objetivo
Sitio web personal **atractivo, visual e informativo** que posicione a Juan Luis López Aranguren como **referente en Relaciones Internacionales, Indo-Pacífico y Asia en España**. Público principal: periodistas, productores de radio y TV, organizadores de congresos y editores. Público secundario: académicos y lectores del libro.

### Requisitos técnicos
- Sitio **estático** (HTML + CSS + JS, sin backend ni base de datos), listo para **GitHub Pages** desde la rama `main` (raíz del repo o carpeta `/docs`, explícalo en el README).
- Contenido editable sin tocar el HTML: guardar en JSON los listados que crecen (`data/medios.json`, `data/articulos.json`, `data/publicaciones.json`, `data/conferencias.json`) y renderizarlos con JS.
- **Responsive** (perfecto en móvil), carga rápida, accesible (contraste AA, textos alternativos, navegación por teclado).
- **Bilingüe ES/EN** con un conmutador (español por defecto; en inglés basta con portada, bio, libro y contacto).
- **SEO**: `<title>`, meta description, Open Graph y Twitter Card (para que al compartir el enlace en X/LinkedIn salga una tarjeta con foto), datos estructurados `schema.org/Person` y `schema.org/Book`, `sitemap.xml`, `robots.txt`. Palabras clave: experto Indo-Pacífico, analista geopolítica China Japón, profesor relaciones internacionales, tertuliano geopolítica.
- Sin cookies ni rastreadores. Si quieres analítica, deja preparada (comentada) la opción de una sin cookies.
- `README.md` en español, para alguien que **no programa**: cómo publicar en GitHub Pages, cómo añadir una entrevista o un artículo editando los JSON, cómo cambiar fotos y cómo conectar un dominio propio (archivo `CNAME`).

### Inspiración
Busca en la web referencias de páginas personales de analistas internacionales, historiadores y autores de geopolítica con presencia mediática (por ejemplo, las de Peter Frankopan, Ian Bremmer o Rana Mitter, o webs de *speakers* y *think tanks*). Toma **patrones**, no copies diseños:
- *Hero* potente con foto, nombre y una línea de posicionamiento.
- Franja "Le has visto en", con los nombres de los medios **en tipografía**. **No uses logotipos de medios** (son marcas registradas).
- El libro como pieza destacada.
- Rejilla visual de apariciones en medios, con vídeos incrustados cuando haya enlace de YouTube.
- Cifras clave animadas (contadores).
- Línea de tiempo del CV.
- Kit de prensa descargable.

### Estética
- Sobria, editorial y elegante, al estilo de un *think tank* o una revista de análisis internacional. Nada infantil ni recargado.
- Paleta: azul océano profundo / tinta, con acento cálido (rojo laca o ámbar, guiño asiático discreto).
- Tipografía: una serif con carácter para titulares y una sans legible para texto (Google Fonts).
- Motivo gráfico sutil: mapa o líneas del Indo-Pacífico (SVG propio y original, de baja opacidad) en el *hero* o como separador.
- Animaciones suaves al hacer scroll; nada que maree.

### Fotografías
- Usa **solo** las fotos de la carpeta `fotos/` del repositorio. **No descargues fotos de internet**, tampoco de él, porque las fotos de prensa tienen derechos.
- Si la carpeta está vacía o faltan fotos, usa recuadros elegantes con el texto `[FOTO]` y explica en el README qué foto va en cada sitio.
- Optimiza las fotos (WebP, tamaños responsive) y crea una galería con *lightbox*.

### Enlaces a artículos y apariciones
- **Busca en la web** los enlaces reales de los artículos y apariciones listados en la sección B (ABC, El Mundo, The Conversation, La Vanguardia, ANU Policy Forum, programas de radio y TV, la entrevista de YouTube).
- Añade solo enlaces que hayas **encontrado y comprobado**. **Nunca construyas ni adivines una URL.** Si no lo encuentras, pon `"url": ""` y `"pendiente": true` en el JSON y no muestres el botón de enlace.
- Si encuentras más artículos o apariciones suyas que no están en la lista, añádelos con `"verificar": true`.
- Para las publicaciones académicas, enlaza por DOI (`https://doi.org/...`) cuando lo tengan.

### Privacidad (importante)
- **No publiques** fecha de nacimiento, dirección postal ni teléfono.
- Contacto: botón `mailto:` con el marcador `[EMAIL DE CONTACTO]`, que él sustituirá, y enlace a X (@jlopezar). Deja preparada (comentada) la opción de un formulario con Formspree.
- Pie de página: "Las opiniones expresadas en los artículos y entrevistas son a título personal."

### Presentación institucional
- En la portada, el titular y la bio se presenta como **"Profesor de Relaciones Internacionales y Derecho internacional público"**, sin nombrar universidades ni usar logos institucionales (no quiere mezclar sus opiniones con la institución).
- Las universidades sí aparecen como dato factual en la sección **CV / Trayectoria**.
- Usa siempre las denominaciones españolas exactas de los cargos (p. ej. "Profesor Permanente Laboral") y **no** equivalencias anglosajonas en la versión española.

### Estructura del sitio (página única con navegación fija, más páginas secundarias si conviene)
1. **Inicio (hero)**: foto, nombre, línea de posicionamiento ("Analista del Indo-Pacífico, China, Japón y el orden global"), dos botones ("Contactar para entrevista" y "El libro") y la franja "Le has visto en".
2. **Cifras clave** (contadores): se detallan en la sección B.
3. **El libro**: portada (`fotos/portada-libro.*` si existe), descripción, hitos (2.ª edición, n.º 1 en Ciencias Militares de Amazon.es, 3.ª edición en Navidad 2026, venta en España, EE. UU. e Hispanoamérica) y botón de compra `[ENLACE COMPRA]`.
4. **En los medios**: rejilla filtrable por tipo (TV / Radio / Prensa / YouTube-podcast), con tarjetas por aparición y vídeos incrustados cuando haya.
5. **Artículos de opinión**: tarjetas con medio, fecha y titular, enlazadas.
6. **Investigación y publicaciones**: libro, artículos, capítulos y enciclopedia, filtrables por tipo y año, con DOI. Destacadas arriba las 5-6 más relevantes.
7. **Conferencias y docencia internacional**: mapa o lista visual de ciudades (Honolulu, Las Vegas, Nashville, Montreal, Tokio, San Francisco, Rijeka, Chicago, Columbus, Kioto, Princeton, McGill, Lisboa, Roma, Ciudad de México, Santiago de Chile, Oñati…).
8. **Trayectoria (CV)**: línea de tiempo visual con formación, cargos, estancias y becas. Botón de descarga del CV en PDF si existe `cv/CV_Lopez_Aranguren.pdf`; si no, `[PENDIENTE]`.
9. **Sala de prensa**: bio corta (50 palabras), bio media (120) y bio larga (250), con botón "copiar"; fotos descargables en alta resolución; temas sobre los que puede opinar.
10. **Contacto**: email, X, LinkedIn `[PENDIENTE]`, ORCID y Google Scholar.

### Entrega
- Trabaja en una rama y abre un *pull request* hacia `main` con un resumen claro.
- Al final, lista en el README todo lo marcado como `[PENDIENTE]` para que él lo complete.

---

## B. CONTENIDO VERIFICADO

### Identidad
- **Nombre:** Juan Luis López Aranguren
- **Presentación pública:** Profesor de Relaciones Internacionales y Derecho internacional público
- **Especialidad:** Indo-Pacífico, geopolítica de Asia Oriental, Japón, China, diplomacia pública y científico-tecnológica, comunicación internacional, guerra híbrida.
- **Redes:** X @jlopezar · ORCID https://orcid.org/0000-0002-4720-863X · Google Scholar https://scholar.google.com/citations?user=W_pPcp0AAAAJ · Scopus Author ID 57189505265 · ResearcherID B-6479-2019
- **Idiomas:** español (nativo), inglés C2, japonés C2, catalán C2, francés C1, chino mandarín B1.

### Cifras clave (para contadores)
- 1 monografía en Planeta (Ariel), ya en 2.ª edición
- n.º 1 en Ciencias Militares en Amazon.es
- 30+ publicaciones académicas
- 9 convenciones consecutivas de la International Studies Association (ISA)
- 13+ universidades de América, Europa, Asia y Oceanía donde ha investigado o impartido docencia
- 6 idiomas
- 12 meses de investigación en Japón con la Japan Foundation Fellowship

### El libro
- **Título:** *El eje del mundo que viene: Cómo el Indo-Pacífico está transformando el orden global*
- **Editorial:** Ariel (Grupo Planeta), Barcelona, 2026. Monografía de autor único. Publicado el 15 de abril de 2026.
- **Hitos:** 2.ª edición en noviembre de 2026; 3.ª edición prevista para la campaña de Navidad 2026; n.º 1 en la categoría Ciencias Militares de Amazon.es; a la venta también en EE. UU. e Hispanoamérica.
- **Tesis (para redactar la descripción, en tono editorial):** el Indo-Pacífico se ha convertido en el nuevo eje geopolítico del orden global; el libro integra Derecho internacional público, Relaciones Internacionales y estudios de seguridad para explicar al lector en español por qué el centro de gravedad del mundo se desplaza hacia Asia. Idea fuerza: "el siglo XXI será el siglo asiático".
- **Recorrido académico:** propuesta de sesión *Author Meets Critics* sobre el libro en el congreso de la Association for Asian Studies (AAS) `[PENDIENTE de confirmar aceptación; no mostrar hasta confirmar]`.

### En los medios (apariciones)
Tipo · medio · detalle. Buscar los enlaces según las instrucciones.
- **TV** · Negocios TV · Tertuliano permanente de geopolítica.
- **TV** · Cuatro, programa de Risto Mejide · Entrevista sobre la visita de Trump a Xi Jinping (mayo de 2026).
- **YouTube** · Entrevista con Pedro Baños con motivo del lanzamiento del libro (2026).
- **Radio** · Radio Nacional de España (RNE), incluido *Cinco Continentes*.
- **Radio** · Onda Cero.
- **Radio** · COPE (ciclo de presentación del libro, 2026).
- **Radio** · Cadena SER.
- **Radio** · Aragón Radio.
- **TV** · Intereconomía.
- **Prensa** · ABC (columnista; ver artículos).
- **Prensa** · Diario de Navarra.
- **Prensa** · Heraldo de Aragón.
- **Prensa** · El País (entrevista o cita).
- **Evento** · Ponente en la mesa redonda "Masas sociales, nuevos centros de consumo. ¿Hacia dónde va el mundo?", junto a Santiago Niño-Becerra y Marta Peirano, en *Itinerarios de Futuro. Diálogos con el talento*, II Conferencia de Arahealth (Aragón Health Cluster), moderada por Pere Estupinyà, 1 de octubre de 2026.

### Artículos de opinión y divulgación
- **ABC (2025):** "Europa, jardineros en una guerra"; "La sala de las lágrimas"; "Cinco días persas de oscuridad"; "Trump, un Polifemo global"; "Tucídides en Alaska"; "El asesinato de Charlie Kirk, un ataque contra todos nosotros"; "La Vuelta y el suicidio de la diplomacia deportiva"; y un artículo de noviembre de 2025 sobre Gaza `[título PENDIENTE]`.
- **ABC (2026):** "1808: Cuando toda España fue Ceuta" (septiembre de 2026). Busca otros artículos suyos en ABC de 2026.
- **El Mundo (2022):** "Las islas Senkaku y la integridad territorial de Japón".
- **The Conversation (2022):** "Rushdie y Averroes frente a los fanatismos".
- **La Vanguardia (2014):** "El elefante blanco de Hong Kong"; "La nueva familia de los libres".
- **Asia & The Pacific Policy Society — Policy Forum (Australian National University, 2016):** "Seoul and Tokyo's New Security Axis".

### Publicaciones académicas destacadas (mostrar arriba)
1. *El eje del mundo que viene*, Ariel (Grupo Planeta), 2026.
2. "Geopolitical Aspects of the European Union's Approach to the Indo-Pacific", en *The Indo-Pacific Theatre. Strategic Visions and Frameworks*, Routledge, 2023, pp. 188–201. DOI 10.4324/9781003342311-15
3. "Science and Technology Diplomacy", en *Edward Elgar Encyclopedia for City and Place Branding*, Edward Elgar, 2025, pp. 382–387. DOI 10.4337/9781035319640
4. "Japan's Science and Technology Diplomacy: Society 5.0 and its International Projection", *Communication & Society*, 36(2), 2023, pp. 225–239. DOI 10.15581/003.36.2.225-239
5. "The EU's Strategic Projection in the Indo-Pacific", *Cuadernos Europeos de Deusto*, 3, 2022, pp. 29–49. DOI 10.18543/ced-03-2022pp29-49
6. "Rational Choice Theory and International Communication: A New Interpretation of Article 21 of the Japanese Constitution", *Osaka University Law Review*, 64, 2017, pp. 111–134.

### Resto de artículos en revistas
- "The Communicative Dimension and Security in Asia-Pacific: A communicative-viewing proposal for reform of the Japanese Intelligence Services", *UNISCI Discussion Papers*, 41, 2016, pp. 29–52. DOI 10.5209/rev_RUNI.2016.n41.52673
- "Rational Choice Theory and Digital Communication in Japan", *Japan Foundation Report*, 1, 2017, pp. 36–49.
- "A Glocalism-Based Approach to the International Communication of the Japanese Political and Economic Actors", *Media and Communication / Mediji i komunikacije*, IV(8), 2017, pp. 25–42.
- "Desafíos legislativos y geopolíticos de los Servicios de Inteligencia japoneses", *Derecom*, 34, 2023.
- "El glocalismo como herramienta para potenciar la creatividad y la innovación de Japón en un mundo globalizado", *MIRAI. Estudios Japoneses*, 4, 2020, pp. 11–22. DOI 10.5209/mira.67540
- "La diplomacia olímpica de Japón: De Tokio 1964 a Tokio 2021", *MIRAI. Estudios Japoneses*, 5, 2021, pp. 67–76. DOI 10.5209/mira.74697
- "Adaptaciones metodológicas en Estudios Japoneses. Una perspectiva nacional e internacional", *MIRAI. Estudios Japoneses*, 6, 2022, pp. 37–49. DOI 10.5209/mira.80781
- "El Indo-Pacífico como nuevo eje geopolítico global", *Global Affairs* (Universidad de Navarra), 3, 2021, pp. 6–11.
- "Las relaciones China-Japón y la dimensión de seguridad en Asia Oriental en la era Trump", *Jiexi Zhongguo*, 25, 2017, pp. 29–34.
- "China, ¿exportadora de estabilidad?", *I Electronic Symposium on Chinese Politics*, 1, 2011, pp. 29–55.

### Capítulos de libro
- "La diplomacia silenciosa de Japón: estrategias y desafíos de su soft power en el siglo XXI", en *Dialógica y praxis*, Marcial Pons, 2025.
- "Tejiendo lazos globales: análisis comunicativo de la diplomacia científica y tecnológica en las relaciones internacionales", en *Áreas comunicativas y sus nuevos retos*, Marcial Pons, 2025.
- "Hacia una indexación de la Diplomacia pública japonesa: metodologías y desafíos en un mundo globalizado", en *Las contribuciones de Japón desde la perspectiva del siglo XXI*, Aranzadi, 2024, pp. 51–68.
- "Japón y la inteligencia artificial: una herramienta para su proyección internacional", en *Retos demográficos y sociedad 5.0 en Japón*, Aranzadi, 2023, pp. 59–84.
- "Japón y su diplomacia tecnológica: del milagro económico japonés al Free and Open Indo-Pacific", en *Japón en la Era Reiwa*, Aranzadi, 2022, pp. 155–173.
- "Orden mundial y multilateralismo en el Indo-Pacífico", en *Transición de poder y transformaciones del orden liberal en tiempos de pandemia*, Tirant lo Blanch, 2022, pp. 237–252.
- "China e India como actores globales en los factores estructurales del nuevo siglo asiático", en *Actores regionales y normas globales*, Tirant lo Blanch, 2021, pp. 157–168.
- "Análisis comparativo entre Japón y España de la dimensión comunicativa en la lucha contra el COVID-19", en *Derecho, Empresa y Administración Pública en Japón*, Tirant lo Blanch, 2021, pp. 255–276.
- "Las dimensiones geopolítica y comunicativa de la disputa por las islas Senkaku/Diaoyu a través de la historia", en *El agua en Japón*, Tirant lo Blanch, 2018, pp. 205–250.
- "Del Tatte Shakai a las particularidades culturales y comunicativas de la sociedad nipona", en *Derecho y relaciones internacionales en Japón*, Prensas de la Universidad de Zaragoza, 2019, pp. 273–304.
- "Gas sarín, sectas y propaganda en Japón", en *Libertad de expresión y discurso de odio por motivos religiosos*, LICREGDI, 2019, pp. 194–219.
- "De los panfletos de mayo de 1968 a los foros digitales del siglo XXI", en *Mayo del 68*, Editorial UFV, 2019, pp. 13–22.
- "El impacto de la comunicación internacional digital en la formación de un movimiento masculinista global", en *Ética, comunicación y género*, Dykinson, 2020, pp. 489–496.
- "The Virtual Gender Identity Phenomenon and its International Projection on Online Gaming" y "The New Glocal Gender Equality Paradigm", en *La desigualdad de género invisibilizada en la comunicación*, Dykinson, 2017.
- "Aplicación de la Teoría de Juegos en el Análisis Comunicativo como parte integrante del Ciclo de Inteligencia", en *Cultura de Inteligencia*, Plaza y Valdés, 2012, pp. 67–76.
- "El fenómeno del Jugador múltiple en el análisis comunicativo de la Diplomacia Pública", en *Comunicación Institucional y Política*, Fragua, 2012, pp. 189–202.
- "China y el mantenimiento del status-quo en Asia-Pacífico", en *Un renacentista del siglo XXI: Homenaje a Pedro Lozano Bartolozzi*, EUNSA, 2010, pp. 365–373.
- De próxima publicación: "Japanese Science & Technology Diplomacy in the Indo-Pacific after the Ukrainian Invasion", en *Global Role of Asia Indo-Pacific for International Relations*, Springer.
- Informe (coautor): "Panorama general sobre la implantación de los robots y la IA en Japón: análisis social y jurídico-internacional", proyecto IASAC-UNIDIGITAL.

### Trayectoria (CV) — para la línea de tiempo
**Formación**
- Doctor en Comunicación con Mención Internacional, Universidad de Navarra, 2013.
- Máster en Análisis Político, Universitat Oberta de Catalunya, 2009.
- Máster en Sociedades de Asia Oriental y Relaciones Internacionales, UOC, 2008.
- Licenciatura en Estudios de Asia Oriental, UOC, 2008.
- Diploma en Lengua y Estudios Japoneses, Kyoto University of Foreign Studies (Japón), 2007.
- Licenciatura en Periodismo y Diploma en Comunicación Política, Universidad de Navarra, 2005.

**Cargos**
- Profesor Permanente Laboral de Derecho Internacional Público y Relaciones Internacionales, Facultad de Derecho, Universidad de Zaragoza (desde mayo de 2024).
- Profesor en la Universidad de Navarra (Fundamentals of International Relations).
- Coordinador del Área de Derecho Internacional Público, Facultad de Derecho, Universidad de Zaragoza (2023–2025).
- Miembro de la Junta Directiva de la Sección de International Communication de la International Studies Association (ISA), elegido en 2025.
- Investigador del Grupo de Investigación Japón de la Universidad de Zaragoza (desde 2016).
- Profesor Ayudante Doctor, Universidad de Zaragoza (2019–2024).
- Profesor, Universidad Francisco de Vitoria (2017–2019).
- Investigador postdoctoral Japan Foundation (2016–2017).
- Profesor e investigador, Universidad de Navarra (2009–2016) y Universitat Internacional de Catalunya (2013–2015).

**Becas, proyectos y reconocimientos**
- **Japan Foundation Japanese Studies Fellowship 2016/2017**: 12 meses de investigación en Japón (International University of Japan y Osaka University – OSIPP), único beneficiario en España esa convocatoria. Proyecto: "Communication, Democracy and Policy-Making in Japan", con encuesta nacional de más de 3.500 respuestas.
- Sexenio de investigación CNEAI (periodo 2016–2024), concedido en julio de 2026.
- Ayuda predoctoral del Gobierno de Navarra.
- Investigador principal: "Geopolítica, Derechos Humanos y Libertad Religiosa" (Universidad de Zaragoza, 2025–2026); "Protección de minorías religiosas y Relaciones Internacionales" (2023–2024); "Diplomacia Cultural Aragón–Japón" (Fundación Ibercaja–Universidad de Zaragoza); Grupo de Referencia Japón (Gobierno de Aragón, 2017, co-IP).
- Participante en IASAC-UNIDIGITAL (Inteligencia Artificial y Sistemas Autónomos Cognitivos), Plan de Recuperación, nueve universidades (2022–2023).
- Coordinador del proyecto de innovación docente "Protección de minorías, derechos humanos y globalización en el aula" (Universidad de Zaragoza, 2026/2027).
- Asesor del International Board del Bhutan Baccalaureate Program, The Royal Academy of Bhutan (2024).
- Asesor extranjero (*foreign consultant*) de tesis doctorales en Relaciones Internacionales en la L.N. Gumilyov Eurasian National University (Astana, Kazajistán), desde 2024.
- Director de tesis doctoral sobre diplomacia pública japonesa (Universidad de Zaragoza, desde 2025).
- Evaluador para *Pacific Affairs* (Q1), Routledge, *Relaciones Internacionales* (UAM), *Sortuz* (Oñati), *Artefactos* (Salamanca) y *Kairós* (Ecuador).

**Estancias de investigación y docencia internacional**
Princeton University (PIIRS, 2022) · SOAS, University of London (2012) · Abertay University, Dundee (2016) · International University of Japan y Osaka University (2016–2017) · Kobe University (2019) · Dokkyo University · Jawaharlal Nehru University, Nueva Delhi (2019–2021) · University of Auckland (2014) · Beijing Foreign Studies University · McGill University (2023) · Universidade de Lisboa (ISCSP / Instituto do Oriente) y Universidade da Beira Interior (2023) · LUISS Guido Carli, Roma (2023, 2024) · UNAM, México (2024) · Pontificia Universidad Católica de Chile (2025) · Oñati International Institute for the Sociology of Law (2025) · Université Savoie Mont Blanc, Chambéry (BIP Erasmus+ UNITA, 2026).

### Conferencias internacionales (ISA y otras)
- ISA, 67.ª Convención Anual, Columbus, Ohio (2026): ponencia aceptada.
- ISA, Chicago (2025): ponencias sobre IA en la cooperación en el Indo-Pacífico y herramientas digitales para la investigación y docencia en RRII; mesas redondas.
- CEEISA–ISA, Universidad de Rijeka, Croacia (2024).
- ISA, San Francisco (2024): diplomacia digital de Japón en América Latina; IA como herramienta de seguridad y diplomacia en el Indo-Pacífico.
- ISA Asia-Pacific, Universidad de Waseda, Tokio (2023): presidente y comentarista de sesión.
- ISA, Montreal (2023): la invasión rusa de Ucrania y la estrategia de la UE en el Indo-Pacífico.
- ISA, Nashville (2022): el giro estratégico de la UE hacia el Indo-Pacífico.
- ISA, Las Vegas / virtual (2021): nacionalismo frente a un orden liberal asiático en el conflicto Senkaku/Diaoyu.
- ISA, Honolulu (2020): ponencia aceptada (convención suspendida por la COVID-19).
- AAS-in-Asia, Kioto (2020).
- Congresos del Grupo de Investigación Japón (Universidad de Zaragoza) y de la Asociación de Estudios Japoneses en España (AEJE), incluido Soria, octubre de 2026.

### Temas sobre los que opina (sala de prensa)
China y Taiwán · Japón · India · Corea · Indo-Pacífico y mar de China Meridional · Relación EE. UU.–China · AUKUS y Quad · Unión Europea en Asia · Guerra híbrida y desinformación · Diplomacia pública y *soft power* · Inteligencia artificial y geopolítica · Derecho internacional y conflictos (Ucrania, Oriente Próximo).

### Bios (redáctalas tú a partir de estos datos, en tono sobrio y sin superlativos vacíos)
- **Corta (≈50 palabras), media (≈120) y larga (≈250)**, en español y en inglés.
- Elementos imprescindibles: profesor de Relaciones Internacionales y Derecho internacional público; autor de *El eje del mundo que viene* (Ariel); especialista en Indo-Pacífico, China y Japón; tertuliano de geopolítica en Negocios TV y colaborador de ABC; investigación en Japón con la Japan Foundation; habla japonés.
