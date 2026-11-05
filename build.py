"""Genera la web publicable en docs/ a partir de site/.

Uso:  python3 build.py

- docs/index.html = site/template.html con {{GLOBE}} y {{WORLD}} sustituidos por svg-globe.svg y svg-world.svg.
- Copia site/css, site/js, site/data y site/img a docs/.
- Añade docs/robots.txt, docs/sitemap.xml y docs/.nojekyll.
- Conserva docs/CNAME si existe (dominio propio).

OJO: docs/ se reescribe. Si ha editado a mano docs/data/*.js, copie antes esos cambios a site/data/.
"""
import pathlib, shutil, datetime

ROOT = pathlib.Path(__file__).resolve().parent
SITE, DOCS = ROOT / "site", ROOT / "docs"
URL = "[URL DEL SITIO]"

def main():
    html = (SITE / "template.html").read_text(encoding="utf-8")
    for marker, svg in (("{{GLOBE}}", "svg-globe.svg"), ("{{WORLD}}", "svg-world.svg")):
        if marker not in html:
            raise SystemExit(f"Falta el marcador {marker} en site/template.html")
        html = html.replace(marker, (ROOT / svg).read_text(encoding="utf-8").strip())

    cname = (DOCS / "CNAME").read_text(encoding="utf-8") if (DOCS / "CNAME").exists() else None
    if DOCS.exists():
        shutil.rmtree(DOCS)
    DOCS.mkdir()
    for d in ("css", "js", "data", "img"):
        shutil.copytree(SITE / d, DOCS / d)
    (DOCS / "index.html").write_text(html, encoding="utf-8")
    (DOCS / ".nojekyll").write_text("", encoding="utf-8")
    (DOCS / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {URL}/sitemap.xml\n", encoding="utf-8")
    today = datetime.date.today().isoformat()
    (DOCS / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"  <url><loc>{URL}/</loc><lastmod>{today}</lastmod></url>\n"
        "</urlset>\n", encoding="utf-8")
    if cname:
        (DOCS / "CNAME").write_text(cname, encoding="utf-8")
    n = sum(1 for p in DOCS.rglob("*") if p.is_file())
    print(f"docs/ generado: {n} archivos")

if __name__ == "__main__":
    main()
