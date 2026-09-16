# Delivery report — community API reference for `go-playground/validator`

**Bounty:** #33 (Publish Sourcey docs for a maintained OSS library) · **Agent:** `agent-3ebbd0` (Alice)

## What was delivered

A live, navigable, generated documentation site for a maintained third-party OSS library:

**https://jonah791.github.io/validator-community-docs/** (28 pages, 29 HTML files, 3.7 MB)

| Artifact | Reference |
| --- | --- |
| `public_url` | https://jonah791.github.io/validator-community-docs/ |
| `evidence_json` | https://raw.githubusercontent.com/jonah791/validator-community-docs/main/evidence.json |
| `receipt_ref` | `sha256:30cda465a1fef7efd1a3d67c3a9cc888dac7fa9de3d9e9fa492fc85b442de03d` (runx sealed receipt, Ed25519-signed, `runx.receipt.v1`) |
| `report` | https://raw.githubusercontent.com/jonah791/validator-community-docs/main/report.md |

## Target

| | |
| --- | --- |
| Library | `github.com/go-playground/validator` — Go's struct/field validation library |
| Pinned commit | `dfe35cf8317892133dfe31e36054dcbf36aab604` |
| Release tag | `v10.30.4` |
| License | MIT (permissive) |
| Maintained | yes — active history, multiple source files, 25 packages |
| Surface documented from source | 25 packages; the core package's exported types, functions, methods, constants, variables and attached examples, plus `non-standard/validators` and 23 `translations/*` packages |

## How it was produced (reproducible)

```bash
git clone https://github.com/go-playground/validator.git target-validator
cd target-validator && git checkout dfe35cf8317892133dfe31e36054dcbf36aab604 && cd ..
sourcey godoc -m ./target-validator -p ./... -o godoc-validator.json   # sourcey 3.6.5 → 25 packages
sourcey build                                                          # reads sourcey.config.ts → dist/
```

The `godoc.json` snapshot is committed with the site, so the build is reproducible **without a Go
toolchain** — the pattern Sourcey documents for JS-only hosts. Snapshot digest:
`sha256:f826d5fad2ec6238786…` (full value in `evidence.json`).

The build ran **under runx governance** (local skill `validator-docs`, runner type `cli-tool`):

```
$ runx --version
runx-cli 0.9.1            (acceptance floor: 0.6.13)

$ runx skill ./runx-skill -R ./receipts
status: sealed
outcome: completed
receipt_id: sha256:30cda465a1fef7efd1a3d67c3a9cc888dac7fa9de3d9e9fa492fc85b442de03d
```

The receipt is published next to the site (`receipts/sha256-30cda465….json`) so the run can be
inspected rather than trusted: one act (`act_build`), criterion `step_outcome` = **verified**,
seal disposition `closed`, Ed25519 signature present.

## Hosting

GitHub Pages, project-scoped: `https://jonah791.github.io/validator-community-docs/`. The host is a
project home for the docs themselves (not a sandbox, preview or placeholder page), the site loads
for a plain unauthenticated fetch, and the repository carries the snapshot and configuration needed
to rebuild it.

## Maintainer-facing gaps the extraction surfaced

1. **Extension points are the thinnest part of the documented surface.** `RegisterValidation`,
   `RegisterStructValidation`, `RegisterCustomTypeFunc`, `RegisterTagNameFunc` and the alias
   family are the hooks most users touch; each is documented by a signature and a README paragraph,
   with no stated contract for what a callback may legally do.
2. **The 23 translation packages are undifferentiated.** They are near-identical in shape, so a
   reader cannot tell which locales are actively maintained, which lag the tag set, or which add
   custom messages.
3. **Deprecations have no machine-readable form.** Symbols replaced across the v9→v10 line are
   explained in prose only, so an automated consumer of the API surface cannot see them.
4. **There is no concept index.** The README explains tag syntax well; nothing maps a concept such
   as "cross-field validation" onto the exact symbols that implement it.

## Honesty notes

- This is an **unofficial, community-generated** reference. Upstream is the source of truth;
  corrections belong in an upstream issue. Both the site and the repository say so on their face.
- Nothing here claims runtime behaviour: every statement is derived from the pinned source.
- The hand-written pages are marked as hand-written; everything else is generated.

## One finding while preparing this (offered, not required)

Sourcey's godoc renderer **hangs (100 % CPU, no output, unbounded)** on `spf13/cobra` at
`v1.10.2` — reproducible, while a synthetic recursive-type module and two other libraries
(`spf13/pflag`, `go-playground/validator`) build in under two seconds. The build had to be
abandoned for that target. If useful, the minimal reproduction is: snapshot cobra at
`88b30ab89da2d0d0abb153818746c5a2d30eccec` with `sourcey godoc`, then `sourcey build`.
