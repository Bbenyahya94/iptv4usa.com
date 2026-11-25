# IPTV4USA website

Static multi-page subscription website for US viewers at `iptv4usa.com`. Run `node build.mjs` to regenerate the HTML in `dist/`. The included `Dockerfile` serves `dist/` through nginx on port 80 and uses `nginx.conf` for clean page URLs, the XML sitemap, robots.txt, and a custom 404 page.

For Coolify, upload the contents of this project to the repository root. Set build strategy to **Dockerfile**, base directory to `/`, Dockerfile location to `/Dockerfile`, and exposed port to `80`. Set the public domain to `https://iptv4usa.com` and deploy.

Prices supplied by the owner: 1 connection costs $15/1 month, $26/3 months, $38/6 months, $65/12 months. For 2/3/4/5 connections, the total base price is discounted by 5%/10%/15%/20%. Trial price is $0. Confirm availability, payment details, and legal policy wording before publishing.

Contact details: WhatsApp +212 670 779271, Telegram @premiumiptvpanelscom, support@reselleriptv.com.

The home page displays channel and streaming-platform brand icons from `dist/assets/brands/`. They are bundled locally; visitors do not request them from an external image host. `node download-logos.mjs` refreshes these files when needed, then `node build.mjs` regenerates the HTML. Brand names are reference examples, not a statement of subscription availability or affiliation.

`robots.txt` and `sitemap.xml` are generated from the page list. Submit `https://iptv4usa.com/sitemap.xml` to Google Search Console after publication. Search ranking and indexing are not guaranteed.
