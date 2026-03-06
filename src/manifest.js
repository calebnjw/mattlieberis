// manifest.json data for PWA
// This file exports manifest data that can be served as JSON for Progressive Web App support

export const manifestData = {
  "name": "Matt Lieber is",
  "short_name": "Matt Lieber is",
  "description": "Descriptions of Matt Lieber from the Reply All podcast.",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "/icon192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/icon512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
};
