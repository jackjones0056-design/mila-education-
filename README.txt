KINDERGARTEN MATH MISSION — INSTALL / DEPLOY

WHAT THIS IS
- 8 weeks
- 4 interactive lessons per week (32 total)
- 10–15 minute sessions
- touch-friendly for iPad/computer
- spoken directions
- saved progress on the device
- parent dashboard
- offline caching after first successful HTTPS load
- Home Screen / standalone PWA support

IMPORTANT
The app is a real PWA. iPad/iPhone service workers and offline installation require the app to be served from HTTPS. Opening index.html from the Files app is not equivalent to hosting it.

FASTEST HOSTING OPTIONS
1. GitHub Pages
   - Create a repository.
   - Upload the CONTENTS of this folder to the repository root.
   - Enable Settings > Pages > Deploy from branch > main / root.
   - Open the resulting HTTPS URL in Safari on iPad.
   - Share > Add to Home Screen.

2. Netlify Drop / Cloudflare Pages
   - Upload this folder as a static site.
   - Open the resulting HTTPS URL in Safari.
   - Share > Add to Home Screen.

LOCAL COMPUTER TEST
From inside this folder:
  python3 -m http.server 8080
Then open http://localhost:8080 on the computer.
This is useful for testing on the same computer, but iPad installation/offline support still needs HTTPS.
