"""Package the static demo; optional maintainer helper, not needed to run it."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import base64
import json

root = Path(__file__).parent
page = (root / 'index.html').read_text(encoding='utf-8')
css = (root / 'styles.css').read_text(encoding='utf-8')
script = (root / 'app.js').read_text(encoding='utf-8')
images = {
    name: 'data:image/webp;base64,' + base64.b64encode(
        (root / 'assets' / (name + '.webp')).read_bytes()
    ).decode('ascii')
    for name in ['paste', 'oil', 'brush']
}
script = script.replace('const goods = [', 'const productImages = ' + json.dumps(images) + ';\nconst goods = [')
script = script.replace('src="assets/${g.id}.webp"', 'src="${productImages[g.id]}"')
page = page.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + css + '\n</style>')
page = page.replace('<script src="app.js"></script>', '<script>\n' + script + '\n</script>')
assert 'src="app.js"' not in page
assert 'href="styles.css"' not in page
assert 'src="assets/${g.id}.webp"' not in page
(root / 'Signal-Three.html').write_text(page, encoding='utf-8')
files = ['Signal-Three.html', 'index.html', 'styles.css', 'app.js', 'package-demo.py',
         'README.md', 'RESEARCH.md', 'DESIGN.md', 'DESIGN-REVIEW.md', 'CREDITS.md']
with ZipFile(root / 'Signal-Three-demo.zip', 'w', ZIP_DEFLATED) as archive:
    for name in files:
        path = root / name
        if path.exists():
            archive.write(path, arcname='Signal-Three/' + name)
    for path in (root / 'assets').glob('*.webp'):
        archive.write(path, arcname='Signal-Three/assets/' + path.name)
print('Created Signal-Three.html and Signal-Three-demo.zip')
