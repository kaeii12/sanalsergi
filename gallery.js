import * as THREE from "three";
import { getData, photoUrl as url, logoUrl } from "./api.js";
let cats = [], photos = [], settings = { school_name: "OKUL ADI", exhibition_title: "SANAL SERGİ", logo_path: null };
try { ({ cats, photos, settings } = await getData()); }
catch (e) {
  console.error(e);
  const m = document.createElement("div");
  m.style.cssText = "position:fixed;top:5rem;left:1rem;right:1rem;background:#b3392f;color:#fff;padding:.8rem 1rem;border-radius:6px;z-index:5";
  m.textContent = "Sergi henüz yapılandırılmadı: " + (e.message || e);
  document.body.append(m);
}
document.title = `${settings.exhibition_title || "Sanal Sergi"} | ${settings.school_name || "Okul"}`;
const W = 8, H = 4.2, SP = 4.4, INTRO = 9, EMPTY = null;
const scene = new THREE.Scene(); scene.background = new THREE.Color(0xdcdcd8);
const cam = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, .1, 2000); cam.rotation.order = "YXZ";
const r = new THREE.WebGLRenderer({ antialias: true }); r.setSize(innerWidth, innerHeight);
r.setPixelRatio(Math.min(devicePixelRatio, 2)); document.body.append(r.domElement);
scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b5ab, 2.3));

const std = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: .9, ...o });
const bas = (c, o = {}) => new THREE.MeshBasicMaterial({ color: c, ...o });
const canvasTex = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
const plane = (w, h, m, x, y, z, ry = 0, parent = scene) => { const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); o.position.set(x, y, z); o.rotation.y = ry; parent.add(o); return o; };
const box = (w, h, d, m, x, y, z) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); scene.add(o); return o; };
const glow = (stops) => canvasTex(256, 256, (g, w, h) => { const q = g.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2);
  q.addColorStop(0, "rgba(255,240,205,.9)"); q.addColorStop(1, "rgba(255,240,205,0)"); g.fillStyle = q; g.fillRect(0, 0, w, h); });
const glowMat = new THREE.MeshBasicMaterial({ map: glow(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .5 });

// bölümler: önce karşılama holü, sonra bölümler art arda
let z = -INTRO; const secs = [];
for (const c of cats) { const len = Math.ceil(c.quota / 2) * SP + 4; secs.push({ c, z0: z, len }); z -= len; }
const total = -z, mid = z / 2;
box(W, .1, total, std(0xcfcbc3, { roughness: .25, transparent: true, opacity: .82 }), 0, 0, mid);  // yarı saydam parlak zemin
box(W, .1, total, std(0xe9e7e1), 0, -3.2, mid);                                                  // zemin altı (yansıma zemini)
box(.1, 3.2, total, std(0xf3f2ee), -W / 2, -1.6, mid); box(.1, 3.2, total, std(0xf3f2ee), W / 2, -1.6, mid);
box(W, .1, total, std(0xf7f6f3), 0, H, mid);
box(.1, H, total, std(0xf1f0ec), -W / 2, H / 2, mid); box(.1, H, total, std(0xf5f4f1), W / 2, H / 2, mid);
box(W, H, .1, std(0xf1f0ec), 0, H / 2, .05); box(W, H, .1, std(0xf1f0ec), 0, H / 2, -total - .05);
// tavan ışık şeritleri ve duvar üstü ışık
for (const x of [-1.6, 1.6]) box(.14, .04, total, bas(0xfff6e0), x, H - .03, mid);
const wash = canvasTex(4, 128, (g, w, h) => { const q = g.createLinearGradient(0, 0, 0, h); q.addColorStop(0, "rgba(255,244,215,.8)"); q.addColorStop(1, "rgba(255,244,215,0)"); g.fillStyle = q; g.fillRect(0, 0, w, h); });
const washMat = new THREE.MeshBasicMaterial({ map: wash, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .55 });
plane(total, 1.7, washMat, -W / 2 + .06, H - .85, mid, Math.PI / 2); plane(total, 1.7, washMat, W / 2 - .06, H - .85, mid, -Math.PI / 2);

const label = (text, bg, bar) => canvasTex(1024, 256, (g, w, h) => {
  g.fillStyle = bg; g.fillRect(0, 0, w, h); g.fillStyle = bar; g.fillRect(0, h - 22, w, 22);
  g.fillStyle = "#fff"; g.font = "bold 92px Georgia,serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, w / 2, h / 2 - 8, 940); });
const cable = (x, zz, y0) => box(.03, H - y0, .03, bas(0x777777), x, (H + y0) / 2, zz);

// Okul adı ve logo Supabase site_settings tablosundan gelir.
const banner = canvasTex(2048, 512, (g, w, h) => {
  g.fillStyle = "#f7f6f3"; g.fillRect(0, 0, w, h);
  g.fillStyle = "#2f6fb3"; g.fillRect(0, h - 26, w, 26);
  g.fillStyle = "#1d2433"; g.textAlign = "center"; g.textBaseline = "middle";
  const words = String(settings.school_name || "OKUL ADI").trim().split(/\s+/);
  const lines = []; let line = "";
  for (const word of words) {
    const next = (line + " " + word).trim();
    if (next.length > 28 && line) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line);
  const useLogo = !!settings.logo_path, center = useLogo ? 1250 : 1024;
  const fontSize = lines.length > 4 ? 51 : 69;
  g.font = `bold ${fontSize}px Arial,sans-serif`;
  const start = Math.max(90, 215 - (lines.length - 1) * 45);
  lines.slice(0, 6).forEach((t, i) => g.fillText(t, center, start + i * 78, useLogo ? 1450 : 1900));
  g.fillStyle = "#2f6fb3"; g.font = "bold 43px Arial,sans-serif";
  g.fillText(String(settings.exhibition_title || "SANAL SERGİ").toLocaleUpperCase("tr-TR"), center, 447, useLogo ? 1400 : 1900);
});
if (settings.logo_path) {
  const logo = new Image(); logo.crossOrigin = "anonymous"; logo.onload = () => {
    const g = banner.image.getContext("2d"); g.drawImage(logo, 52, 46, 412, 412); banner.needsUpdate = true;
  }; logo.src = logoUrl(settings.logo_path);
}
plane(6.4, 1.6, new THREE.MeshBasicMaterial({ map: banner }), 0, 3.0, -4.6); cable(-2.8, -4.6, 3.8); cable(2.8, -4.6, 3.8);
box(2.6, .1, .9, std(0xc89c68), 0, .45, -6.6); box(.12, .45, .7, std(0x2a2d36), -1.1, .22, -6.6); box(.12, .45, .7, std(0x2a2d36), 1.1, .22, -6.6);

const clickable = [], loader = new THREE.TextureLoader().setCrossOrigin("anonymous");
const frameMat = std(0x26262a), matMat = bas(0xfbfbf9);
for (const s of secs) {
  const hex = s.c.color || "#2f6fb3";
  plane(5, 1.25, new THREE.MeshBasicMaterial({ map: label(s.c.name, "#1d2433", hex) }), 0, 3.25, s.z0 - .6);
  cable(-2.2, s.z0 - .6, 3.85); cable(2.2, s.z0 - .6, 3.85);
  box(W - .2, .02, .35, bas(hex), 0, .06, s.z0 - .2);
  for (let i = 0; i < s.c.quota; i++) {
    const right = i % 2, idx = i >> 1, p = photos.find(x => x.category === s.c.id && x.slot === i);
    const g = new THREE.Group();
    g.position.set(right ? W / 2 - .05 : -W / 2 + .05, 0, s.z0 - 2 - SP * (idx + .5));
    g.rotation.y = right ? -Math.PI / 2 : Math.PI / 2; scene.add(g);
    plane(4.6, 3.8, glowMat, 0, 1.9, .01, 0, g);                                    // spot ışığı
    const build = (pw, ph, map) => {
      const fr = new THREE.Mesh(new THREE.BoxGeometry(pw + .16, ph + .16, .06), frameMat); fr.position.set(0, 1.75, .03); g.add(fr);
      plane(pw + .1, ph + .1, matMat, 0, 1.75, .062, 0, g);
      const im = plane(pw, ph, map ? new THREE.MeshBasicMaterial({ map }) : bas(0xe4e1d9), 0, 1.75, .066, 0, g);
      const mi = im.clone(); mi.scale.y = -1; mi.position.y = -1.75; g.add(mi);        // zemin yansıması
      return im;
    };
    if (!p) { const im = build(2.2, 1.5, null); continue; }
    loader.load(url(p.path), t => {
      t.colorSpace = THREE.SRGBColorSpace; const a = t.image.width / t.image.height;
      const pw = a > 1.25 ? 2.3 : 1.55 * a, ph = pw / a, im = build(pw, ph, t);
      im.userData = { p, src: url(p.path) }; clickable.push(im);
      const tag = canvasTex(512, 128, (c, w, h) => { c.fillStyle = "#fff"; c.fillRect(0, 0, w, h); c.fillStyle = "#1d2433"; c.font = "bold 44px Georgia,serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(p.title || "", w / 2, h / 2, 470); });
      plane(1.3, .32, new THREE.MeshBasicMaterial({ map: tag }), 0, 1.75 - ph / 2 - .42, .066, 0, g);
    });
  }
}
// hareket
cam.position.set(0, 1.7, -1.2); let yaw = 0, pitch = 0; const keys = {};
addEventListener("keydown", e => keys[e.key.toLowerCase()] = 1);
addEventListener("keyup", e => keys[e.key.toLowerCase()] = 0);
document.querySelectorAll("#pad button").forEach(b => {
  b.onpointerdown = e => { e.stopPropagation(); keys[b.dataset.k] = 1; };
  b.onpointerup = b.onpointerleave = () => keys[b.dataset.k] = 0;
});
let drag = null;
r.domElement.onpointerdown = e => drag = { x: e.clientX, y: e.clientY, moved: 0 };
addEventListener("pointermove", e => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.moved += Math.abs(dx) + Math.abs(dy);
  yaw -= dx * .004; pitch = Math.max(-1, Math.min(1, pitch - dy * .004)); drag.x = e.clientX; drag.y = e.clientY;
});
const ray = new THREE.Raycaster(), lb = document.getElementById("lb");
addEventListener("pointerup", e => {
  if (drag && drag.moved < 6 && e.target === r.domElement) {
    ray.setFromCamera(new THREE.Vector2(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1), cam);
    const h = ray.intersectObjects(clickable)[0];
    if (h) { const { p, src } = h.object.userData;
      lb.querySelector("img").src = src; lb.querySelector("h2").textContent = p.title || "";
      lb.querySelector("p").textContent = p.descr || ""; lb.classList.remove("hidden"); }
  }
  drag = null;
});
lb.onclick = () => lb.classList.add("hidden");
addEventListener("resize", () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); r.setSize(innerWidth, innerHeight); });
const secEl = document.getElementById("sec"); let last = 0;
r.setAnimationLoop(t => {
  const dt = Math.min((t - last) / 1000, .1); last = t;
  const f = (keys.w || keys.arrowup ? 1 : 0) - (keys.s || keys.arrowdown ? 1 : 0), sd = (keys.d ? 1 : 0) - (keys.a ? 1 : 0);
  if (keys.arrowleft) yaw += 1.8 * dt; if (keys.arrowright) yaw -= 1.8 * dt;
  const v = 4 * dt;
  cam.position.x += (-Math.sin(yaw) * f + Math.cos(yaw) * sd) * v;
  cam.position.z += (-Math.cos(yaw) * f - Math.sin(yaw) * sd) * v;
  cam.position.x = Math.max(-W / 2 + .7, Math.min(W / 2 - .7, cam.position.x));
  cam.position.z = Math.max(-total + .7, Math.min(-.7, cam.position.z));
  cam.rotation.set(pitch, yaw, 0);
  const s = secs.find(s => cam.position.z <= s.z0 && cam.position.z > s.z0 - s.len);
  secEl.textContent = s ? s.c.name : (settings.school_name || "Sanal Sergi");
  r.render(scene, cam);
});
