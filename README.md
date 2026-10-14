# Kumar Anurag — Portfolio Website

A responsive, light glassmorphism portfolio built with plain HTML, CSS, and JavaScript.

## Run it

1. Keep `index.html`, `style.css`, and `script.js` in the same folder.
2. Add your media files using the paths below (or edit the `src`, `poster`, and `data-full` values in `index.html` to match your real filenames).
3. Open `index.html` in a browser. For best local video playback, use a local static server such as VS Code Live Server.

## Expected media structure

```text
Kumar_Anurag_Portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── Broadcasting/
│   ├── production-photo.jpg
│   ├── stats-photo.jpg
│   ├── game-feed-1-poster.jpg       # optional video poster
│   ├── game-feed-2-poster.jpg       # optional video poster
│   ├── game-feed-3-poster.jpg       # optional video poster
│   ├── full-production-poster.jpg   # optional video poster
│   └── videos/
│       ├── game-feed-1.mp4
│       ├── game-feed-2.mp4
│       ├── game-feed-3.mp4
│       └── full-production-video.mp4
├── OCR/
│   └── screenshots/
│       └── ocr-demo-01.png
└── Events/
    ├── Shining Star/
    │   ├── Shining Star-01.jpg
    │   ├── Shining Star-02.jpg
    │   └── ... up to -10.jpg
    ├── Pro Invitational Season 1/
    ├── Pro Invitational Season 2/
    ├── Crown Forge/
    ├── Mythical Arena/
    ├── Realm of Rivals/
    ├── Mizoram Inter School LAN/
    ├── National Grind Season 1/
    └── Biyani Inter College LAN/
```

## Event image naming convention

Each event has its own folder. The filename starts with the same event name, followed by a two-digit sequence number:

- `Events/Mythical Arena/Mythical Arena-01.jpg`
- `Events/Mythical Arena/Mythical Arena-02.jpg`
- `Events/Mythical Arena/Mythical Arena-03.jpg`

Use `-01` through `-10` as needed. The first image is the event cover; the rest appear when the gallery is expanded. The website hides missing gallery thumbnails automatically, so an event can have 6, 8, or 10 images. Use `.png` or `.webp` if needed, but update the matching file paths in `index.html` to use that extension.

## Notes

- The two production photos are `Broadcasting/production-photo.jpg` and `Broadcasting/stats-photo.jpg`.
- Videos are expected as MP4 files for broad browser compatibility. Keep video files reasonably compressed for faster page loading.
- Poster images are optional; if you don't have them, remove the corresponding `poster="..."` attribute from the video element.
- OCR uses screenshots only. Discord projects are described without publishing private code or server details. 3D and game development are marked as in progress.
- No actual personal photos or video files are included in this code package yet. The paths are wired and ready for your assets.
