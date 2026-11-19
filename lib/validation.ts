export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validPassword(value: unknown, min = 1): value is string {
  return typeof value === "string" && value.length >= min &&
    new TextEncoder().encode(value).length <= 72;
}

export function normalizeUrl(input: unknown): string | null {
  if (typeof input !== "string") return null;
  let value = input.trim();
  if (!value || value.length > 2048) return null;
  if (!/^https?:\/\//i.test(value)) {
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) return null;
    value = `https://${value}`;
  }
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password ||
        !url.hostname.includes(".") || url.href.length > 2048) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function translationInput(value: unknown) {
  if (!isRecord(value)) return null;
  const { text, from, to } = value;
  if (typeof text !== "string" || !text.trim() || text.length > 1000 ||
      (from !== "fa" && from !== "en" && from !== "auto") ||
      (to !== "fa" && to !== "en")) return null;
  return { text, from, to };
}
