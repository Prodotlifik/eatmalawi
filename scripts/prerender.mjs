// Pre-render a static index.html per restaurant so shared links get real
// link-preview metadata (name, cuisine, photo, description). Social crawlers
// (WhatsApp, Facebook, iMessage, X) do not execute JavaScript, so they need
// Open Graph tags served as HTML at the link's own URL.
//
// Runs after `vite build` (see package.json) and writes:
//   dist/restaurant/<id>/index.html
// GitHub Pages then serves /eatmalawi/restaurant/<id> via its directory
// index, with a redirect to the trailing-slash URL.
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import restaurantsData from "../src/data/restaurants.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const publicDir = join(root, "public");
const siteBase = "https://prodotlifik.github.io/eatmalawi";
const maxImageBytes = 1_000_000; // WhatsApp skips previews with oversized images

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Prefer the featured photo, but fall back to the next photo when the
// featured file is too large for chat-app link previews.
function pickPreviewImage(restaurant) {
  const candidates = restaurant.images?.length ? restaurant.images : [restaurant.image];
  for (const image of candidates) {
    const file = join(publicDir, image.replace(/^\//, ""));
    if (existsSync(file) && statSync(file).size < maxImageBytes) {
      return image;
    }
  }
  return candidates[0];
}

// Replace the content of one meta tag in place. The base index.html already
// contains every preview tag, so prerendering only swaps values; duplicated
// tags would make crawlers pick the wrong (first) image or URL.
function replaceMeta(html, attribute, label, value) {
  const pattern = new RegExp(`<meta ${attribute}[^>]*>`);
  if (!pattern.test(html)) {
    throw new Error(`prerender: could not find ${label} in dist/index.html`);
  }
  return html.replace(pattern, `<meta ${attribute} content="${escapeHtml(value)}" />`);
}

const template = readFileSync(join(distDir, "index.html"), "utf8");

for (const restaurant of restaurantsData) {
  const title = `${restaurant.name} – ${restaurant.cuisine} restaurant in ${restaurant.city}`;
  const tagline = restaurant.description.replace(/\.$/, "");
  const description = `${tagline} · ${restaurant.location}`;
  const imageUrl = `${siteBase}${pickPreviewImage(restaurant)}`;
  const imageAlt = `${restaurant.name} – ${restaurant.cuisine} restaurant in ${restaurant.city}`;
  const pageUrl = `${siteBase}/restaurant/${restaurant.id}`;

  let html = template;

  const titlePattern = /<title>[\s\S]*?<\/title>/;
  if (!titlePattern.test(html)) {
    throw new Error("prerender: could not find title tag in dist/index.html");
  }
  html = html.replace(titlePattern, `<title>${escapeHtml(title)}</title>`);

  html = replaceMeta(
    html,
    'property="og:title"',
    "og:title",
    title
  );
  html = replaceMeta(
    html,
    'property="og:description"',
    "og:description",
    description
  );
  html = replaceMeta(
    html,
    'property="og:url"',
    "og:url",
    pageUrl
  );
  html = replaceMeta(
    html,
    'property="og:image"',
    "og:image",
    imageUrl
  );
  html = replaceMeta(
    html,
    'property="og:image:alt"',
    "og:image:alt",
    imageAlt
  );
  html = replaceMeta(
    html,
    'name="twitter:title"',
    "twitter:title",
    title
  );
  html = replaceMeta(
    html,
    'name="twitter:description"',
    "twitter:description",
    description
  );
  html = replaceMeta(
    html,
    'name="twitter:image"',
    "twitter:image",
    imageUrl
  );

  const canonicalPattern = /<link rel="canonical"[^>]*>/;
  if (!canonicalPattern.test(html)) {
    throw new Error("prerender: could not find canonical link in dist/index.html");
  }
  html = html.replace(
    canonicalPattern,
    `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`
  );

  const outDir = join(distDir, "restaurant", String(restaurant.id));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
  console.log(`prerendered dist/restaurant/${restaurant.id}/index.html (${restaurant.name})`);
}
