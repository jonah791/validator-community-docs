# validator — community API reference (generated)

Unofficial, **community-generated** API reference for
[`go-playground/validator`](https://github.com/go-playground/validator), built from the library's
own source. Not affiliated with the maintainers.

| | |
| --- | --- |
| Upstream | https://github.com/go-playground/validator |
| Pinned commit | `dfe35cf8317892133dfe31e36054dcbf36aab604` |
| Release tag | `v10.30.4` |
| Upstream license | MIT |
| Generator | [Sourcey](https://github.com/sourcey/sourcey) v3.6.5 (`sourcey godoc` + `sourcey build`) |
| Snapshot | `godoc-validator.json` (25 packages) — committed so the site rebuilds without Go |

## Rebuild

```bash
npm install sourcey
git clone https://github.com/go-playground/validator.git target-validator
cd target-validator && git checkout dfe35cf8317892133dfe31e36054dcbf36aab604 && cd ..
sourcey godoc -m ./target-validator -p ./... -o godoc-validator.json
sourcey build            # reads sourcey.config.ts, writes ./dist
```

## Contents

- `dist/` — the built static site (this is what GitHub Pages serves)
- `sourcey.config.ts` — the build configuration
- `introduction.md`, `maintainer-notes.md` — the two hand-written pages
- `godoc-validator.json` — the extracted API snapshot for the pinned commit

Generated content is derived from the upstream project and carries its MIT license; the
hand-written pages are released under the same terms. Corrections belong in an upstream issue —
upstream is the source of truth.
