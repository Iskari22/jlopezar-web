import { geoOrthographic, geoEqualEarth, geoPath, geoGraticule10 } from "d3-geo";
import { feature, mesh } from "topojson-client";
import { readFileSync, writeFileSync } from "fs";

const world = JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8"));
const land = feature(world, world.objects.land);
const round = (s) => s.replace(/(\d+\.\d{1})\d+/g, "$1");

// Globo del Indo-Pacífico (motivo del hero)
{
  const size = 800;
  const p = geoOrthographic().rotate([-112, -8]).fitExtent([[10, 10], [size - 10, size - 10]], { type: "Sphere" }).precision(0.3);
  const path = geoPath(p);
  const svg = `<svg class="globe" viewBox="0 0 ${size} ${size}" aria-hidden="true" focusable="false">
<circle cx="${size / 2}" cy="${size / 2}" r="${p.scale()}" class="g-sea"/>
<path class="g-grat" d="${round(path(geoGraticule10()))}"/>
<path class="g-land" d="${round(path(land))}"/>
<circle cx="${size / 2}" cy="${size / 2}" r="${p.scale()}" class="g-rim"/>
</svg>`;
  writeFileSync("svg-globe.svg", svg);
}

// Mapamundi de conferencias y estancias
const places = JSON.parse(readFileSync("places.json", "utf8"));
{
  const W = 1000, H = 500;
  const p = geoEqualEarth().rotate([-10, 0]).fitExtent([[4, 4], [W - 4, H - 4]], { type: "Sphere" });
  const path = geoPath(p);
  const dots = places.map((c, i) => {
    const [x, y] = p([c.lon, c.lat]);
    return `<g class="pin pin-${c.tipo}" data-i="${i}" tabindex="0" role="button" aria-label="${c.ciudad}: ${c.que.replace(/"/g, "&quot;")}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><circle r="9" class="pin-halo"/><circle r="4.2"/></g>`;
  }).join("\n");
  const svg = `<svg class="worldmap" viewBox="0 0 ${W} ${H}" role="img" aria-label="Mapa de conferencias, estancias de investigación y docencia internacional">
<path class="w-sphere" d="${round(path({ type: "Sphere" }))}"/>
<path class="w-grat" d="${round(path(geoGraticule10()))}"/>
<path class="w-land" d="${round(path(land))}"/>
${dots}
</svg>`;
  writeFileSync("svg-world.svg", svg);
}
console.log("ok");
