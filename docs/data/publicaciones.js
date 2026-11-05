// Publicaciones académicas. Para añadir una, copie un bloque { ... } y cambie los datos.
// tipo: "libro" | "articulo" | "capitulo" | "enciclopedia" | "informe". destacada: true la muestra arriba.
window.PUBLICACIONES = [
 {anio: 2026, tipo: "libro", destacada: true, titulo: "El eje del mundo que viene: Cómo el Indo-Pacífico está transformando el orden global", fuente: "Barcelona: Ariel (Grupo Planeta). Monografía de autor único.", url: "https://www.planetadelibros.com/libro-el-eje-del-mundo-que-viene/447137"},
 {anio: 2025, tipo: "enciclopedia", destacada: true, titulo: "Science and Technology Diplomacy", fuente: "Edward Elgar Encyclopedia for City and Place Branding, Edward Elgar, pp. 382–387.", doi: "10.4337/9781035319640"},
 {anio: 2023, tipo: "capitulo", destacada: true, titulo: "Geopolitical Aspects of the European Union's Approach to the Indo-Pacific", fuente: "The Indo-Pacific Theatre. Strategic Visions and Frameworks, Routledge, pp. 188–201.", doi: "10.4324/9781003342311-15"},
 {anio: 2023, tipo: "articulo", destacada: true, titulo: "Japan's Science and Technology Diplomacy: Society 5.0 and its International Projection", fuente: "Communication & Society, 36(2), pp. 225–239.", doi: "10.15581/003.36.2.225-239"},
 {anio: 2022, tipo: "articulo", destacada: true, titulo: "The EU's Strategic Projection in the Indo-Pacific", fuente: "Cuadernos Europeos de Deusto, 3, pp. 29–49.", doi: "10.18543/ced-03-2022pp29-49"},
 {anio: 2017, tipo: "articulo", destacada: true, titulo: "Rational Choice Theory and International Communication: A New Interpretation of Article 21 of the Japanese Constitution", fuente: "Osaka University Law Review, 64, pp. 111–134."},

 {anio: 2026, tipo: "capitulo", titulo: "Japanese Science & Technology Diplomacy in the Indo-Pacific after the Ukrainian Invasion", fuente: "Global Role of Asia Indo-Pacific for International Relations, Springer (en prensa)."},
 {anio: 2025, tipo: "capitulo", titulo: "La diplomacia silenciosa de Japón: estrategias y desafíos de su soft power en el siglo XXI", fuente: "Dialógica y praxis, Marcial Pons."},
 {anio: 2025, tipo: "capitulo", titulo: "Tejiendo lazos globales: análisis comunicativo de la diplomacia científica y tecnológica en las relaciones internacionales", fuente: "Áreas comunicativas y sus nuevos retos, Marcial Pons."},
 {anio: 2024, tipo: "capitulo", titulo: "Hacia una indexación de la Diplomacia pública japonesa: metodologías y desafíos en un mundo globalizado", fuente: "Las contribuciones de Japón desde la perspectiva del siglo XXI, Aranzadi, pp. 51–68."},
 {anio: 2023, tipo: "capitulo", titulo: "Japón y la inteligencia artificial: una herramienta para su proyección internacional", fuente: "Retos demográficos y sociedad 5.0 en Japón, Aranzadi, pp. 59–84."},
 {anio: 2023, tipo: "articulo", titulo: "Desafíos legislativos y geopolíticos de los Servicios de Inteligencia japoneses", fuente: "Derecom, 34."},
 {anio: 2023, tipo: "informe", titulo: "Panorama general sobre la implantación de los robots y la IA en Japón: análisis social y jurídico-internacional", fuente: "Proyecto IASAC-UNIDIGITAL (coautor)."},
 {anio: 2022, tipo: "capitulo", titulo: "Japón y su diplomacia tecnológica: del milagro económico japonés al Free and Open Indo-Pacific", fuente: "Japón en la Era Reiwa, Aranzadi, pp. 155–173."},
 {anio: 2022, tipo: "capitulo", titulo: "Orden mundial y multilateralismo en el Indo-Pacífico", fuente: "Transición de poder y transformaciones del orden liberal en tiempos de pandemia, Tirant lo Blanch, pp. 237–252."},
 {anio: 2022, tipo: "articulo", titulo: "Adaptaciones metodológicas en Estudios Japoneses. Una perspectiva nacional e internacional", fuente: "MIRAI. Estudios Japoneses, 6, pp. 37–49.", doi: "10.5209/mira.80781"},
 {anio: 2021, tipo: "articulo", titulo: "La diplomacia olímpica de Japón: De Tokio 1964 a Tokio 2021", fuente: "MIRAI. Estudios Japoneses, 5, pp. 67–76.", doi: "10.5209/mira.74697"},
 {anio: 2021, tipo: "articulo", titulo: "El Indo-Pacífico como nuevo eje geopolítico global", fuente: "Global Affairs (Universidad de Navarra), 3, pp. 6–11."},
 {anio: 2021, tipo: "capitulo", titulo: "China e India como actores globales en los factores estructurales del nuevo siglo asiático", fuente: "Actores regionales y normas globales, Tirant lo Blanch, pp. 157–168."},
 {anio: 2021, tipo: "capitulo", titulo: "Análisis comparativo entre Japón y España de la dimensión comunicativa en la lucha contra el COVID-19", fuente: "Derecho, Empresa y Administración Pública en Japón, Tirant lo Blanch, pp. 255–276."},
 {anio: 2020, tipo: "articulo", titulo: "El glocalismo como herramienta para potenciar la creatividad y la innovación de Japón en un mundo globalizado", fuente: "MIRAI. Estudios Japoneses, 4, pp. 11–22.", doi: "10.5209/mira.67540"},
 {anio: 2020, tipo: "capitulo", titulo: "El impacto de la comunicación internacional digital en la formación de un movimiento masculinista global", fuente: "Ética, comunicación y género, Dykinson, pp. 489–496."},
 {anio: 2019, tipo: "capitulo", titulo: "Del Tatte Shakai a las particularidades culturales y comunicativas de la sociedad nipona", fuente: "Derecho y relaciones internacionales en Japón, Prensas de la Universidad de Zaragoza, pp. 273–304."},
 {anio: 2019, tipo: "capitulo", titulo: "Gas sarín, sectas y propaganda en Japón", fuente: "Libertad de expresión y discurso de odio por motivos religiosos, LICREGDI, pp. 194–219."},
 {anio: 2019, tipo: "capitulo", titulo: "De los panfletos de mayo de 1968 a los foros digitales del siglo XXI", fuente: "Mayo del 68. Una época de cambios, un cambio de época, Editorial UFV, pp. 13–22."},
 {anio: 2018, tipo: "capitulo", titulo: "Las dimensiones geopolítica y comunicativa de la disputa por las islas Senkaku/Diaoyu a través de la historia", fuente: "El agua en Japón. Una aproximación jurídica y social, Tirant lo Blanch, pp. 205–250."},
 {anio: 2017, tipo: "articulo", titulo: "Rational Choice Theory and Digital Communication in Japan", fuente: "Japan Foundation Report, 1, pp. 36–49."},
 {anio: 2017, tipo: "articulo", titulo: "A Glocalism-Based Approach to the International Communication of the Japanese Political and Economic Actors", fuente: "Media and Communication / Mediji i komunikacije, IV(8), pp. 25–42."},
 {anio: 2017, tipo: "articulo", titulo: "Las relaciones China-Japón y la dimensión de seguridad en Asia Oriental en la era Trump", fuente: "Jiexi Zhongguo, 25, pp. 29–34."},
 {anio: 2017, tipo: "capitulo", titulo: "The Virtual Gender Identity Phenomenon and its International Projection on Online Gaming", fuente: "La desigualdad de género invisibilizada en la comunicación, Dykinson, pp. 849–859."},
 {anio: 2017, tipo: "capitulo", titulo: "The New Glocal Gender Equality Paradigm: Communicative Challenges of a Multicultural Society", fuente: "La desigualdad de género invisibilizada en la comunicación, Dykinson, pp. 839–848."},
 {anio: 2016, tipo: "articulo", titulo: "The Communicative Dimension and Security in Asia-Pacific: A communicative-viewing proposal for reform of the Japanese Intelligence Services", fuente: "UNISCI Discussion Papers, 41, pp. 29–52.", doi: "10.5209/rev_RUNI.2016.n41.52673"},
 {anio: 2012, tipo: "capitulo", titulo: "Aplicación de la Teoría de Juegos en el Análisis Comunicativo como parte integrante del Ciclo de Inteligencia", fuente: "Cultura de Inteligencia, Plaza y Valdés, pp. 67–76."},
 {anio: 2012, tipo: "capitulo", titulo: "El fenómeno del Jugador múltiple en el análisis comunicativo de la Diplomacia Pública", fuente: "Comunicación Institucional y Política, Fragua, pp. 189–202."},
 {anio: 2011, tipo: "articulo", titulo: "China, ¿exportadora de estabilidad?", fuente: "I Electronic Symposium on Chinese Politics, 1, pp. 29–55."},
 {anio: 2010, tipo: "capitulo", titulo: "China y el mantenimiento del status-quo en Asia-Pacífico", fuente: "Un renacentista del siglo XXI: Homenaje a Pedro Lozano Bartolozzi, EUNSA, pp. 365–373."}
];

window.TRAYECTORIA = [
 {anio: "2024–", clase: "now", titulo: "Profesor Permanente Laboral de Derecho Internacional Público y Relaciones Internacionales", lugar: "Facultad de Derecho, Universidad de Zaragoza"},
 {anio: "2026", clase: "now", titulo: "Autor de «El eje del mundo que viene»", lugar: "Ariel (Grupo Planeta)"},
 {anio: "2025–", clase: "now", titulo: "Governing Board de la International Communication Section", lugar: "International Studies Association (ISA)"},
 {anio: "2023–25", clase: "", titulo: "Coordinador del Área de Derecho Internacional Público", lugar: "Facultad de Derecho, Universidad de Zaragoza"},
 {anio: "2023–24", clase: "", titulo: "Profesor invitado en el Máster en Seguridad Europea", lugar: "LUISS Guido Carli, Roma · «China and International Security in Asia»"},
 {anio: "2019–24", clase: "", titulo: "Profesor Ayudante Doctor", lugar: "Universidad de Zaragoza, donde enseña desde 2017"},
 {anio: "2017–19", clase: "", titulo: "Profesor", lugar: "Universidad Francisco de Vitoria · «Mundo Actual: China, India y Japón», en inglés"},
 {anio: "2016–17", clase: "", titulo: "Investigador postdoctoral de la Japan Foundation", lugar: "Osaka University (OSIPP) e International University of Japan"},
 {anio: "2016–", clase: "", titulo: "Investigador del Grupo de Investigación Japón", lugar: "Universidad de Zaragoza · Grupo de Referencia del Gobierno de Aragón"},
 {anio: "2013–15", clase: "", titulo: "Profesor", lugar: "Universitat Internacional de Catalunya"},
 {anio: "2009–16", clase: "", titulo: "Profesor e investigador", lugar: "Universidad de Navarra"},
 {anio: "2013", clase: "edu", titulo: "Doctor en Comunicación con Mención Internacional", lugar: "Universidad de Navarra"},
 {anio: "2008–09", clase: "edu", titulo: "Máster en Análisis Político · Máster en Sociedades de Asia Oriental y Relaciones Internacionales · Licenciatura en Estudios de Asia Oriental", lugar: "Universitat Oberta de Catalunya"},
 {anio: "2007", clase: "edu", titulo: "Diploma en Lengua y Estudios Japoneses", lugar: "Kyoto University of Foreign Studies (Japón)"},
 {anio: "2005", clase: "edu", titulo: "Licenciatura en Periodismo · Diploma en Comunicación Política", lugar: "Universidad de Navarra · experiencia como periodista en Diario de Navarra"}
];

window.RECONOCIMIENTOS = [
 {t: "Japan Foundation Japanese Studies Fellowship 2016/2017", d: "Doce meses de investigación en Japón; único beneficiario en España en esa convocatoria. Encuesta nacional con más de 3.500 respuestas."},
 {t: "Dos sexenios de investigación", d: "CNEAI (periodo 2016–2024, concedido en 2026) y ACPUA (periodo 2010–2021)."},
 {t: "Acreditación ANECA", d: "Profesor Contratado Doctor."},
 {t: "Investigador principal", d: "«Geopolítica, Derechos Humanos y Libertad Religiosa» (2025–2026); «Protección de minorías religiosas y Relaciones Internacionales» (2023–2024); «Diplomacia Cultural Aragón–Japón» (Fundación Ibercaja); Grupo de Referencia Japón (Gobierno de Aragón)."},
 {t: "Proyecto IASAC-UNIDIGITAL", d: "Inteligencia Artificial y Sistemas Autónomos Cognitivos, con nueve universidades españolas (2022–2023)."},
 {t: "Asesor del International Board", d: "Bhutan Baccalaureate Program, The Royal Academy of Bhutan (2024)."},
 {t: "Asesor extranjero de tesis doctorales", d: "L.N. Gumilyov Eurasian National University, Astana (Kazajistán), desde 2024."},
 {t: "Governing Board, International Communication Section", d: "International Studies Association (ISA), desde 2025."},
 {t: "Evaluador científico", d: "Pacific Affairs, Routledge, Relaciones Internacionales (UAM), Sortuz, Artefactos y Kairós."},
 {t: "Innovación docente", d: "Coordinador del proyecto «Protección de minorías, derechos humanos y globalización en el aula» (2026/2027)."}
];
