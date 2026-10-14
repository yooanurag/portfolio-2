# Kumar Anurag --- Portfolio Website

Responsive portfolio website built with HTML, CSS, and JavaScript.

## Project file structure

Keep the files and folders together in the following structure. Some
media files may be optional or need to be added by you; use the
filenames referenced by your current HTML.

``` text
Kumar_Anurag_Portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── convert_jpg_to_png.py
├── images/
│   └── my-logo.png
├── Broadcasting/
│   ├── production-photo-01.png
│   ├── production-photo-02.png
│   ├── production-photo-03.png
│   ├── stats-photo.png
│   └── videos/
│       ├── game-feed-1.mp4
│       ├── game-feed-2.mp4
│       ├── game-feed-3.mp4
│       └── full-production-video.mp4
├── OCR/
│   └── screenshots/
│       ├── ocr-demo-01.png
│       ├── ocr-demo-02.png
│       └── ocr-demo-03.png
└── Events/
    ├── Shining Star/
    ├── Pro Invitational Season 1/
    ├── Pro Invitational Season 2/
    ├── Crown Forge/
    ├── Mythical Arena/
    ├── Realm of Rivals/
    ├── Mizoram Inter School LAN/
    ├── National Grind Season 1/
    └── Biyani Inter College LAN/
```

### Event gallery filenames

Place each event's photos in its own folder. Name files using the full
event name followed by a two-digit number, for example:

``` text
Events/
└── Shining Star/
    ├── Shining Star-01.png
    ├── Shining Star-02.png
    └── Shining Star-03.png
```

The gallery supports up to 10 numbered image slots per event and hides
missing thumbnails automatically. Confirm the exact filenames and paths
referenced in `index.html` before adding media.

## Run the website

1.  Keep the HTML, CSS, JavaScript, and asset folders together.
2.  Open `index.html` in a browser, or use VS Code Live Server for local
    testing.
3.  Replace placeholder media with your own images and videos using the
    filenames referenced in the HTML.

## Broadcasting & Production layout

The `03 / BROADCASTING & PRODUCTION` section uses a three-card layout:

-   **Box 1 --- Reels / Portrait Video:** 9:16 portrait media on the
    left.
-   **Box 2 --- Production Images:** 16:9 landscape media at the top of
    the right column.
-   **Box 3 --- Stats / Statistics Images:** 16:9 landscape media below
    Box 2.

On desktop, the portrait card sits beside the two vertically stacked
landscape cards. On smaller screens, the cards stack vertically. Media
aspect ratios are preserved to avoid stretching or distortion.

### Where to edit the layout

-   **HTML:** Find `id="broadcasting"` in the HTML file to locate the
    section and update media paths or card content.
-   **CSS:** Look for the Broadcasting section's scoped layout styles.
    The grid controls the two-column desktop arrangement; `aspect-ratio`
    controls the media proportions; the mobile media query switches the
    cards to a vertical stack.
-   **JavaScript:** Existing carousel interactions are retained. Keep
    each carousel's IDs and related class names consistent if changing
    the markup.

## Media files

Use the exact paths already referenced in your HTML. If a file is
missing, add your own media at that path or update the corresponding
`src` value.

Recommended formats: - Reels: MP4 video or portrait images with a 9:16
ratio. - Production photos: landscape images with a 16:9 ratio. - Stats
images: landscape images with a 16:9 ratio.

Use image files with the correct orientation. CSS preserves the display
ratio; it cannot make a portrait source contain the same visible
information as a landscape source without empty space or cropping.

## Custom logo

The hero logo path can be changed directly in the HTML. Use a
transparent PNG if you want the logo background to remain transparent,
and preserve the original image aspect ratio.

## WhatsApp contact

If the floating WhatsApp contact link still contains `YOUR_NUMBER`,
replace it with your number in international format without `+`, spaces,
or hyphens before publishing.

## Convert JPG/JPEG to PNG

If `convert_jpg_to_png.py` is included in your project, install Pillow
and run the script from the project folder:

``` bash
python -m pip install Pillow
python convert_jpg_to_png.py
```

The script converts actual JPEG image data to PNG; renaming a `.jpg`
file to `.png` alone does not convert its format. Review the generated
files and updated paths before removing originals.

## Final checks before publishing

-   Verify that all referenced images and videos exist.
-   Test the Broadcasting section on desktop and mobile.
-   Check carousel arrows, keyboard interaction, and video pause
    behavior.
-   Check browser developer tools for missing asset requests or
    JavaScript errors.
-   Confirm contact links and custom logo paths.
