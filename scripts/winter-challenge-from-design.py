"""Publish a Claude Design export of the Winter Challenge page as the site's static page.

Usage (from the repo root):
    python3 scripts/winter-challenge-from-design.py "path/to/Winter Build Challenge FINAL.html"

Writes winter-challenge/index.html and public/winter-challenge/{img,fonts}/.
The export is one HTML file that unpacks itself in the browser: a JSON template
plus a manifest of base64 assets. This script unpacks it ahead of time, gives the
files readable names, restores SVG attributes the design runtime would restore,
and replaces the runtime's countdown bindings with a small script.
"""
import base64, gzip, json, os, re, shutil, sys, tempfile, html


def unpack(bundle_path):
    t = open(bundle_path, encoding='utf-8').read()

    def block(kind):
        m = re.search(r'<script type="__bundler/' + kind + r'">\s*(.*?)\s*</script>\s*(?=<script type="__bundler|</body>)', t, re.S)
        if not m:
            sys.exit(f'Not a Claude Design export: missing __bundler/{kind}')
        return m.group(1)

    out = tempfile.mkdtemp(prefix='wc-design-')
    os.makedirs(os.path.join(out, 'assets'))
    open(os.path.join(out, 'template.html'), 'w', encoding='utf-8').write(json.loads(block('template')))
    exts = {'image/png': '.png', 'image/jpeg': '.jpg', 'image/svg+xml': '.svg', 'image/webp': '.webp', 'font/woff2': '.woff2',
            'text/javascript': '.js', 'application/javascript': '.js', 'text/css': '.css'}
    for uuid, entry in json.loads(block('manifest')).items():
        data = base64.b64decode(entry['data'])
        if entry.get('compressed'):
            data = gzip.decompress(data)
        open(os.path.join(out, 'assets', uuid + exts.get(entry['mime'], '.bin')), 'wb').write(data)
    return out


if len(sys.argv) != 2:
    sys.exit(__doc__)
src, repo = unpack(sys.argv[1]), os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = open(os.path.join(src, 'template.html'), encoding='utf-8').read()
assets = {f.split('.')[0]: f for f in os.listdir(os.path.join(src, 'assets'))}

def slug(s):
    s = s.lower().replace('&', 'and')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

# Readable names for the files the page uses. The export gives every asset a new
# random id each time, so names come from what the asset is, never from its id.
UU = re.compile(r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')
names = {}

# Fonts: family, weight and style from their @font-face rule.
for block in re.findall(r'@font-face\s*\{([^}]*)\}', t):
    m = re.search(r'url\("?(' + UU.pattern + r')"?\)', block)
    if not m:
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    weight = (re.search(r'font-weight:\s*(\d+)', block) or re.search(r'()', '')).group(1) or '400'
    italic = '-italic' if re.search(r'font-style:\s*italic', block) else ''
    subset = '-latin' if 'unicode-range' in block else ''
    names.setdefault(m.group(1), f'fonts/{slug(fam)}-{weight}{italic}{subset}')

def img_tags(chunk):
    """Yield (uuid, alt, text right after the tag) for every <img> whose src is an asset."""
    for m in re.finditer(r'<img\b[^>]*>', chunk):
        tag = m.group(0)
        src = re.search(r'\ssrc="(' + UU.pattern + r')"', tag)
        if src:
            alt = re.search(r'\salt="([^"]*)"', tag)
            yield src.group(1), (alt.group(1).strip() if alt else ''), chunk[m.end():m.end() + 300]

# Header logos: Superteam Vietnam first, Solana second.
brand = re.search(r'class="wbc-brand".*?</a>', t, re.S)
if brand:
    for (uuid, _, _), name in zip(img_tags(brand.group(0)), ('img/superteamvn-logo', 'img/solana-logo')):
        names.setdefault(uuid, name)

SPECIAL = {'winter': 'img/winter-title', 'challenge': 'img/challenge-title', 'solana': 'img/solana-logo'}
for uuid, alt, after in img_tags(t):
    if alt.lower().startswith('snow globe'):
        names.setdefault(uuid, 'img/snow-globe')
    elif alt:
        names.setdefault(uuid, SPECIAL.get(slug(alt), 'img/' + slug(alt)))
for uuid, alt, after in img_tags(t):
    # An icon next to a name ("FluxRPC", "RugCheck") takes that name.
    label = re.match(r'\s*<span[^>]*>([^<]{2,40})</span>', after)
    if not alt and label:
        names.setdefault(uuid, 'img/' + slug(label.group(1)))
for uuid, _, _ in img_tags(t):
    names.setdefault(uuid, 'img/asset-' + uuid[:8])

taken = {}
for uuid, name in sorted(names.items()):
    if name in taken.values():
        names[uuid] = name + '-' + uuid[:4]
    taken[uuid] = names[uuid]

pub = os.path.join(repo, 'public', 'winter-challenge')
for sub in ('img', 'fonts'):
    shutil.rmtree(os.path.join(pub, sub), ignore_errors=True)
    os.makedirs(os.path.join(pub, sub))

def url_for(u):
    f = assets[u]
    rel = names[u] + os.path.splitext(f)[1]
    shutil.copyfile(os.path.join(src, 'assets', f), os.path.join(pub, rel))
    return '/winter-challenge/' + rel

# Split the export: <helmet> holds head material, the page is the div after it.
head_part = re.search(r'<helmet>(.*?)</helmet>', t, re.S).group(1)
body_part = re.search(r'</helmet>(.*?)</x-dc>', t, re.S).group(1)
title = html.unescape(re.search(r'<title>(.*?)</title>', t).group(1))

def swap(s):
    return UU.sub(lambda m: url_for(m.group(0)) if m.group(0) in names else m.group(0), s)
head_part, body_part = swap(head_part), swap(body_part)

# Countdown: the design tool filled these from its own runtime.
body_part = body_part.replace('{{countLabel}}', '<span data-count="label">Time left until kickoff</span>')
body_part = body_part.replace('aria-label="{{countAria}}"', 'data-count="timer" aria-label="Time left until kickoff"')
for k in ('days', 'hours', 'minutes', 'seconds'):
    body_part = body_part.replace('{{%s}}' % k, '<span data-count="%s">0</span>' % k)
body_part = re.sub(r' data-canvas-(width|height)="\d+"', '', body_part)
# The design tool stores camelCase SVG attributes as sc-camel-<kebab>; its runtime restores them.
def camel(m):
    parts = m.group(1).split('-')
    return parts[0] + ''.join(w.capitalize() for w in parts[1:]) + '='
body_part = re.sub(r'sc-camel-([a-z-]+)=', camel, body_part)
head_part = re.sub(r'sc-camel-([a-z-]+)=', camel, head_part)
assert '{{' not in body_part and 'sc-camel' not in body_part and not UU.search(body_part + head_part), 'unresolved template data'

intro = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', re.search(r'Superteam Vietnam runs Solana hackathons.*?</p>', body_part, re.S).group(0)))).strip()

page = f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{html.escape(title)}</title>
    <meta name="description" content="{html.escape(intro)}" />
    <meta name="theme-color" content="#0b4a94" />
    <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
    <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
    <link rel="canonical" href="https://vn.superteam.fun/winter-challenge/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Superteam Vietnam" />
    <meta property="og:title" content="Build Station: Winter Challenge" />
    <meta property="og:description" content="{html.escape(intro)}" />
    <meta property="og:url" content="https://vn.superteam.fun/winter-challenge/" />
    <meta property="og:image" content="https://vn.superteam.fun/winter-challenge/poster-1200.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://vn.superteam.fun/winter-challenge/poster-1200.jpg" />
    <link rel="preload" as="image" href="/winter-challenge/img/winter-title.webp" />
    <link rel="preload" as="image" href="/winter-challenge/img/challenge-title.webp" />
    <!-- Design by the Superteam Vietnam team (Claude Design export), converted to a static page. -->
{head_part}
  </head>
  <body>
{body_part.strip()}
    <script>
      // Countdown to kickoff, then to Demo Day (times in Vietnam, UTC+7).
      ;(function () {{
        var kickoff = Date.parse('2026-12-01T00:00:00+07:00')
        var demo = Date.parse('2027-01-16T00:00:00+07:00')
        var q = function (k) {{ return document.querySelector('[data-count="' + k + '"]') }}
        var pad = function (n) {{ return String(n).padStart(2, '0') }}
        function tick() {{
          var now = Date.now(), target = kickoff, label = 'Time left until kickoff'
          if (now >= kickoff) {{ target = demo; label = 'Time left until Demo Day' }}
          var diff = Math.max(0, target - now)
          if (now >= demo) {{ label = 'Demo Day is done. See you next season.'; diff = 0 }}
          var d = Math.floor(diff / 86400000), h = Math.floor(diff / 3600000) % 24
          var m = Math.floor(diff / 60000) % 60, s = Math.floor(diff / 1000) % 60
          q('label').textContent = label
          q('days').textContent = String(d)
          q('hours').textContent = pad(h)
          q('minutes').textContent = pad(m)
          q('seconds').textContent = pad(s)
          q('timer').setAttribute('aria-label', label + ': ' + d + ' days, ' + h + ' hours, ' + m + ' minutes')
        }}
        tick()
        setInterval(tick, 1000)
      }})()

      // Browsers without scroll-driven animations: show the dock and progress bar with a scroll listener.
      ;(function () {{
        if (window.CSS && CSS.supports('animation-timeline: scroll()')) return
        var dock = document.querySelector('.wbc-dock'), bar = document.querySelector('.wbc-progress')
        function onScroll() {{
          var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight
          if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')'
          if (dock) {{
            var on = y > 800
            dock.style.visibility = on ? 'visible' : 'hidden'
            dock.style.opacity = on ? '1' : '0'
            dock.style.transition = 'opacity .3s ease'
          }}
        }}
        window.addEventListener('scroll', onScroll, {{ passive: true }})
        onScroll()
      }})()
    </script>
  </body>
</html>
'''
open(os.path.join(repo, 'winter-challenge', 'index.html'), 'w', encoding='utf-8').write(page)
used = sorted(set(names[u] for u in names if u in t))
print('files:', len(used)); print('title:', title); print('description:', intro)
