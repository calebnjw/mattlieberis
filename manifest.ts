import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "Matt Lieber is",
    "short_name": "Matt Lieber is",
    "description": "Descriptions of Matt Lieber from the Reply All podcast.",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff",
    "icons": [
      {
        "src": "favicon.ico",
        "sizes": "64x64 32x32 24x24 16x16",
        "type": "image/x-icon"
      },
      {
        "src": "public/logo192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "public/logo512.png",
        "type": "image/png",
        "sizes": "512x512"
      }
    ]
  }
} 