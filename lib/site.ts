export function siteOrigin() {
  const value = process.env.SITE_URL || "https://toolinto.netlify.app";
  const url = new URL(value);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("SITE_URL must start with https:// or http://");
  }
  return url.origin;
}
