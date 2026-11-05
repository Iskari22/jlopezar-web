"""Genera site/data/*.js a partir del Excel de contribuciones y del contenido verificado."""
import json, re, sys, datetime as dt
import openpyxl

XLSX = sys.argv[1]
OUT = sys.argv[2]
wb = openpyxl.load_workbook(XLSX, data_only=True)

def s(v):
    if v is None: return ""
    if isinstance(v, (dt.datetime, dt.date)): return v.strftime("%d/%m/%Y")
    # Excel convierte una duración escrita como «14:46» en una hora (14:46:00): se recupera el texto original
    if isinstance(v, dt.time): return f"{v.hour}:{v.minute:02d}" if not v.second else v.strftime("%H:%M:%S").lstrip("0")
    return str(v).strip()

def to_iso(txt, default_year=2026):
    m = re.search(r"(\d{1,2})/(\d{1,2})(?:/(\d{4}))?", txt or "")
    if not m: return ""
    d, mo, y = int(m.group(1)), int(m.group(2)), int(m.group(3) or default_year)
    return f"{y:04d}-{mo:02d}-{d:02d}"

def yt_id(url):
    if not url: return ""
    m = re.search(r"(?:v=|youtu\.be/|/live/)([A-Za-z0-9_-]{11})", url)
    return m.group(1) if m else ""

def yt_start(url):
    m = re.search(r"[?&]t=(\d+)", url or "")
    return int(m.group(1)) if m else 0

def tipo_de(t, medio):
    t = (t or "").lower()
    if "presentación" in t or "acto" in t: return "evento"
    if "reseña" in t or "recomendación" in t or "cita el libro" in t or "(opinión)" in t: return "resena"
    if "podcast" in t and "radio" not in t: return "podcast"
    if t.startswith("youtube"): return "video"
    if t.startswith("tv"): return "tv"
    if t.startswith("radio"): return "radio"
    if "prensa" in t or "revista" in t: return "prensa"
    return "otros"

# ---------- MEDIOS ----------
ws = wb["Contribuciones en medios"]
rows = list(ws.iter_rows(min_row=4, values_only=True))
medios, excluidos, seen = [], [], set()
for r in rows:
    fecha, medio, tipo, tema, titulo, perio, enlace, dur, notas = (list(r) + [None]*9)[:9]
    fecha_s, medio, tipo, tema, titulo, perio, enlace, dur, notas = map(s, (fecha, medio, tipo, tema, titulo, perio, enlace, dur, notas))
    if not medio: continue
    low = (titulo + " " + notas + " " + tema).lower()
    # exclusiones: futuros, programados, sin identificar, contactos sin confirmar
    if fecha_s == "FUTURO" or "programada" in low or "sin identificar" in low or "será emitida" in low or "contacto facilitado" in low:
        excluidos.append(f"{fecha_s} · {medio} · {titulo or tema} ({notas})"); continue
    # los artículos propios de ABC/UNAV van en la sección de artículos
    if perio == "Juan Luis López Aranguren": continue
    urls = [u.strip() for u in re.split(r"\s+", enlace) if u.startswith("http")]
    # fila de Negocios TV con varios enlaces y sin título → una entrada por vídeo
    if len(urls) > 1 and not titulo:
        for u in urls:
            medios.append(dict(fecha="", fechaTexto="2026", medio=medio, tipo="tv", titulo="Tertulia de geopolítica",
                               detalle="Negocios TV", url=u, yt=yt_id(u), t=0, duracion="", tema="Geopolítica", destacado=False))
        continue
    url = urls[0] if urls else ""
    if url and url in seen and "ethic" in url:
        continue
    if url: seen.add(url)
    # fecha de publicación/emisión si consta en notas
    pub = re.search(r"(?:publicad[ao]|emitid[ao]|Emitido|Publicado)[^0-9]{0,40}?(\d{1,2}/\d{1,2}(?:/\d{4})?)", notas)
    iso = to_iso(pub.group(1)) if pub else to_iso(fecha_s)
    if not iso and fecha_s: iso = to_iso(fecha_s)
    tp = tipo_de(tipo, medio)
    if not titulo:
        titulo = "Reseña de «El eje del mundo que viene»" if tp == "resena" else "Intervención"
    if medio.startswith("Heraldo") and tp == "resena" and not iso:
        iso = "2026-06-14"; titulo = "«Ballenas y elefantes», reseña del libro"
    # vídeo extra (versión en YouTube) en notas
    extra = re.findall(r"https?://\S+", notas)
    extra = [e.rstrip(").,") for e in extra]
    if not url and extra:
        url = extra.pop(0)
    vid = yt_id(url) or next((yt_id(e) for e in extra if yt_id(e)), "")
    detalle = perio if perio and perio != "—" and perio != medio else ""
    medios.append(dict(fecha=iso, fechaTexto="", medio=medio, tipo=tp, titulo=titulo.strip("“”\""),
                       detalle=detalle, url=url, yt=vid, t=yt_start(url), duracion=dur if re.match(r"^\d", dur) else "",
                       tema=tema, destacado=False))

# Casa Asia (Madrid, 30/10/2026) — fuente: ABC, Agenda, 31/10/2026, p. 42
medios.append(dict(fecha="2026-10-30", fechaTexto="", medio="Casa Asia (Madrid) – Jornadas Sino-Europeas de Eurodefense", tipo="evento",
                   titulo="Debate y presentación del libro con el embajador Javier Puig Saura y Alicia González Pérez (Eurodefense Joven España)",
                   detalle="", url="", yt="", t=0, duracion="", tema="Presentación del libro", destacado=True))
medios.append(dict(fecha="2026-10-31", fechaTexto="", medio="ABC", tipo="prensa",
                   titulo="«Debate en Casa Asia sobre el Indo-Pacífico. El eje del mundo que viene» (Agenda, p. 42)",
                   detalle="", url="", yt="", t=0, duracion="", tema="Presentación del libro", destacado=False))
# Arahealth
medios.append(dict(fecha="2026-10-01", fechaTexto="", medio="Arahealth – Itinerarios de Futuro (Zaragoza)", tipo="evento",
                   titulo="Mesa redonda «Masas sociales, nuevos centros de consumo. ¿Hacia dónde va el mundo?», con Santiago Niño-Becerra y Marta Peirano; modera Pere Estupinyà",
                   detalle="", url="", yt="", t=0, duracion="", tema="Siglo asiático", destacado=False))

DEST = ["cKNOeqXKink", "H7qwRm_vpCU", "8hT_WZeSwbY", "Aie7Tn_6uaM", "9RdGL9qyBlM"]
for m in medios:
    if m["yt"] in DEST: m["destacado"] = True
    if any(k in m["medio"] for k in ["El Mundo", "RNE – Cinco Continentes", "Rosa de los Vientos", "COPE", "TVE – Canal 24", "Todo es Mentira", "El Periódico de Catalunya"]):
        m["destacado"] = True
    if m["medio"] == "ABC" and "20260416041106" in m["url"]: m["destacado"] = True

medios = [m for m in medios if m["medio"] != "Medio"]
FIX_TITULO = {
    "20260416041106": "«Con la guerra de Irán y Venezuela, EE. UU. ha cortado dos de las tres fuentes de petróleo barato de China»",
    "hLTCHbSUARY": "Tertulia de geopolítica: Trump, Zelensky y la negociación sobre Ucrania (parte 2)",
    "eau8SA9vXc8": "Tertulia de geopolítica: Trump, Irán e Israel (parte 1)",
    "cksuAz1u6uw": "Orden mundial: Trump y Xi protagonizan la reunión del siglo, tregua comercial y la IA a escena",
    "72krkQVdGIg": "Orden mundial: tensión en Arabia Saudí y avisos de EE. UU. (programa completo)",
}
FIX_EXACT = {"Tertulia “Todo es Geopolítica": "Tertulia «Todo es Geopolítica»",
             "Las Tardes de Tele7 13.07.2026": "Entrevista sobre el libro en «Las Tardes de Tele7»",
             "G7: ¿Trump vuelve a acercarse a sus aliados occidentales? • FRANCE 24 Español": "G7: ¿Trump vuelve a acercarse a sus aliados occidentales?"}
for m in medios:
    for k, v in FIX_TITULO.items():
        if k in m["url"] or k == m["yt"]: m["titulo"] = v
    t = m["titulo"]
    t = re.sub(r'^(ARANGUREN:\s*)', '', t)
    t = re.sub(r'^Tertulia Corte \d:\s*', '', t)
    t = re.sub(r'\.?\s*Arangure?n?$', '', t)
    t = t.replace('""', '"').strip(' "“”')
    if t.startswith("…"): t = t[1:].strip()
    if re.search(r'^[A-ZÁÉÍÓÚÑ0-9 ,:.\-–]{25,}$', t): t = t.capitalize()
    if t and t[0] not in "«¿¡" and m["tipo"] in ("tv", "prensa", "radio") and (m["titulo"].startswith(("ARANGUREN", "\"", "“", "…")) or "Tertulia Corte" in m["titulo"]):
        t = "«" + t.strip("«»") + "»"
    m["titulo"] = FIX_EXACT.get(t, t)
    for k, v in FIX_TITULO.items():
        if k == m["yt"]: m["titulo"] = v
    m["medio"] = m["medio"].replace("Informativos nocher", "Informativos noche").replace(" (revista)", "").replace(" (podcast)", "")
    m["medio"] = m["medio"].replace("Onda Cero - Más de uno", "Onda Cero – Más de uno")
    if m["tipo"] in ("video", "otros"): m["tipo"] = "podcast"
    if m["titulo"].startswith("Entrevista (sección Internacional)"): m["titulo"] = "Entrevista sobre la cumbre Trump–Xi"

# Títulos reales y datos confirmados por el autor (CV de noviembre de 2026)
TITULOS_CV = [  # (fecha, parte del nombre del medio, título)
    ("2026-05-13", "El Mundo", "«Si EE. UU. no defiende militarmente Taiwán, nadie volverá a confiar en Washington»"),
    ("2026-05-14", "El Periódico de Catalunya", "«Trump depende de Xi para evitar que Irán se convierta en su Vietnam»"),
    ("2026-05-14", "France 24", "«Xi y Trump: el pulso entre Ormuz y la línea roja de Taiwán»"),
    ("2026-04-30", "El Canal del Coronel", "«China dominará el planeta: el choque contra EE. UU. es inminente»"),
    ("2026-04-13", "Capital Radio", "«Trump bloquea Ormuz: el fin del eje de poder de la II Guerra Mundial»"),
    ("2026-05-01", "Diario de Navarra", "«El siglo XXI será el de Asia. Europa nos hemos quedado al margen de todo»"),
    ("2026-05-04", "RNE Ràdio 4", "«L'Indopacífic com a centre de poder mundial» (en catalán)"),
]
for f, med, t in TITULOS_CV:
    for m in medios:
        if m["fecha"] == f and med in m["medio"]: m["titulo"] = t
for m in medios:
    if m["medio"] == "TVE – Informativos noche":
        m["medio"] = "TVE – Telediario de la noche"; m["titulo"] = "Intervención grabada para el Telediario de la noche"
# Medios en los que ha intervenido, sin fecha ni enlace concretos
for med, tipo in [("Intereconomía", "tv"), ("EITB", "tv"), ("Navarra Televisión", "tv"),
                  ("Cadena SER", "radio"), ("Aragón Radio", "radio")]:
    medios.append(dict(fecha="", fechaTexto="Sin fecha", medio=med, tipo=tipo, titulo="", detalle="", url="", yt="", t=0,
                       duracion="", tema="", destacado=False))

medios.sort(key=lambda m: m["fecha"] or ("0000" if m["fechaTexto"] == "Sin fecha" else "2026-00-00"), reverse=True)

# ---------- ARTÍCULOS ----------
wa = wb["ABC"]
articulos = []
for r in wa.iter_rows(min_row=4, values_only=True):
    n, fweb, fpap, soporte, genero, titulo, tema, resumen, secc, impresa, enlace, notas = (list(r)+[None]*12)[:12]
    if not isinstance(n, int): continue
    if s(genero) == "Entrevista": continue
    f = fweb if isinstance(fweb, dt.datetime) else fpap
    articulos.append(dict(fecha=f.strftime("%Y-%m-%d"), medio="ABC", genero=s(genero), titulo=s(titulo).strip("«»"),
                          tema=s(tema), resumen=s(resumen), url=s(enlace), soporte=s(soporte), impresa=s(impresa) if s(impresa) != "—" else ""))
articulos.append(dict(fecha="2026-05-13", medio="Global Affairs (Universidad de Navarra)", genero="Artículo", titulo="El siglo del Indo-Pacífico se decide en el mar frente a China",
                      tema="Indo-Pacífico / China", resumen="Por qué la competición por el orden del siglo XXI se juega en las rutas marítimas del Indo-Pacífico.",
                      url="https://www.unav.edu/es/web/global-affairs/el-siglo-del-indo-pacifico-se-decide-en-el-mar-frente-a-china", soporte="Web", impresa=""))
# Artículos antiguos. Solo se pone URL si se ha localizado la página original (ver README).
for f, medio, t, u in [("2022-01-01", "El Mundo", "Las islas Senkaku y la integridad territorial de Japón", ""),
                    ("2022-01-01", "The Conversation", "Rushdie y Averroes frente a los fanatismos",
                     "https://theconversation.com/rushdie-y-averroes-frente-a-los-fanatismos-189711"),
                    ("2016-01-01", "Policy Forum (Asia & The Pacific Policy Society, ANU)", "Seoul and Tokyo's New Security Axis",
                     "https://www.policyforum.net/seoul-tokyos-new-security-axis/"),
                    ("2014-01-01", "La Vanguardia", "El elefante blanco de Hong Kong", ""),
                    ("2014-01-01", "La Vanguardia", "La nueva familia de los libres", "")]:
    articulos.append(dict(fecha=f, medio=medio, genero="Artículo", titulo=t, tema="", resumen="", url=u, soporte="", impresa="", soloAnio=True))
articulos.sort(key=lambda a: a["fecha"], reverse=True)

def dump(name, obj):
    with open(f"{OUT}/{name}.js", "w", encoding="utf-8") as fh:
        fh.write(f"// Generado a partir de la hoja de contribuciones. Puede editarse a mano.\nwindow.{name.upper()} = ")
        json.dump(obj, fh, ensure_ascii=False, indent=1)
        fh.write(";\n")

dump("medios", medios)
dump("articulos", articulos)
print("medios", len(medios), "articulos", len(articulos))
from collections import Counter
print(Counter(m["tipo"] for m in medios))
print("con video", sum(1 for m in medios if m["yt"]))
print("EXCLUIDOS:"); print("\n".join(excluidos))
print("medios distintos", len(set(re.split(r" [–-] ", m["medio"])[0] for m in medios)))
