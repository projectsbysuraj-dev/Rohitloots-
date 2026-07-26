// Helper utility to parse and sanitize image URLs, especially ImgBB links, HTML embeds, and BBCodes.

export const FALLBACK_APP_LOGO = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150&auto=format&fit=crop&q=80';

export function cleanImageUrl(input: string | undefined | null): string {
  if (!input) return '';
  let url = input.trim();

  // 0. Base64 data URL from file upload
  if (url.startsWith('data:image/')) {
    return url;
  }

  // 1. Handle HTML Embed code pasted from ImgBB / PostImage / ImageShack
  // e.g. <a href="https://ibb.co/xyz"><img src="https://i.ibb.co/xyz/logo.png" alt="logo" border="0"></a>
  const srcMatch = url.match(/src=["']([^"']+)["']/i);
  if (srcMatch && srcMatch[1]) {
    url = srcMatch[1];
  }

  // 2. Handle BBCode pasted from ImgBB
  // e.g. [url=...][img]https://i.ibb.co/xyz/logo.png[/img][/url]
  const bbMatch = url.match(/\[img\](.*?)\[\/img\]/i);
  if (bbMatch && bbMatch[1]) {
    url = bbMatch[1];
  }

  // 3. Remove leading/trailing quotes or brackets if present
  url = url.replace(/^["'\[<]+|["'\]>]+$/g, '').trim();

  // 4. Fix missing protocol for i.ibb.co or ibb.co
  if (url.startsWith('i.ibb.co/') || url.startsWith('ibb.co/')) {
    url = 'https://' + url;
  }

  return url;
}

export function isImgBbViewerUrl(url: string): boolean {
  if (!url) return false;
  const clean = cleanImageUrl(url);
  // Matches https://ibb.co/XYZ but NOT https://i.ibb.co/XYZ/image.png
  return clean.includes('ibb.co/') && !clean.includes('i.ibb.co/');
}

export function formatDisplayAmount(val: number | string | undefined | null, defaultVal: string = '0'): string {
  if (val === undefined || val === null || val === '') {
    return defaultVal.includes('%') || defaultVal.startsWith('₹') ? defaultVal : `₹${defaultVal}`;
  }
  if (typeof val === 'number') {
    return `₹${val.toLocaleString('en-IN')}`;
  }
  const str = String(val).trim();
  if (!str) {
    return defaultVal.includes('%') || defaultVal.startsWith('₹') ? defaultVal : `₹${defaultVal}`;
  }
  // If user typed custom text with %, ₹, comma, or text like "1%, 2%" or "1%"
  if (str.includes('%') || str.startsWith('₹') || str.toLowerCase().includes('cashback') || str.includes(',')) {
    return str;
  }
  // If pure numeric string
  const num = Number(str);
  if (!isNaN(num)) {
    return `₹${num.toLocaleString('en-IN')}`;
  }
  return str;
}
