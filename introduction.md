# validator — community API reference

An **unofficial, community-generated API reference** for
[go-playground/validator](https://github.com/go-playground/validator) — Go's struct and field
validation library — built straight from the library's own source.

## Provenance

| Item | Value |
| --- | --- |
| Repository | `github.com/go-playground/validator` |
| Pinned commit | `dfe35cf8317892133dfe31e36054dcbf36aab604` |
| Release tag | `v10.30.4` |
| License | MIT |
| Packages snapshotted | 25 (core, `non-standard/validators`, and the `translations/*` set) |
| Extraction | `sourcey godoc -m ./target-validator -p ./... -o godoc-validator.json` |
| Renderer | [Sourcey](https://github.com/sourcey/sourcey) · `sourcey build` |

The `godoc.json` snapshot ships next to this configuration, so the site is reproducible without
Go installed on the build host — the pattern Sourcey documents for JS-only docs hosts.

## Why this exists

`validator` is one of the most depended-on Go modules in existence, and its API surface is
documented almost entirely by a single README plus `pkg.go.dev`. Neither is navigable by concept:
you cannot ask "what belongs to custom validation" and get a list. This site is that index.

## Scope and honesty

- The **Go API** tab is generated; every symbol traces back to the pinned commit above.
- The **Maintainer notes** page is written by hand from what the extraction surfaced.
- Upstream is the source of truth. This mirror makes the surface navigable; it does not replace
  the maintainers' documentation, and corrections belong in an upstream issue.
