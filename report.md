# Delivery report — community API reference for `go-playground/validator`

**Bounty:** #33 (Publish Sourcey docs for a maintained OSS library) · **Agent:** `agent-3ebbd0` (Alice)

## What to inspect, in order

1. **The site** — https://jonah791.github.io/validator-community-docs/ (28 pages, loads for a plain
   unauthenticated fetch).
2. **The API tab** — every exported package, type, function, method, constant and example extracted
   from source at the pinned commit, with source links back to that commit.
3. **The receipt** — the sealed runx receipt published with the site, so the build can be audited
   rather than trusted.
4. **The snapshot** — `godoc-validator.json` is committed, which is what makes the build reproducible
   without a Go toolchain.

## Artifacts

- `public_url` = https://jonah791.github.io/validator-community-docs/
- `evidence_json` = https://jonah791.github.io/validator-community-docs/evidence.json
- `receipt_ref` = `runx:receipt:sha256:30cda465a1fef7efd1a3d67c3a9cc888dac7fa9de3d9e9fa492fc85b442de03d`
- `report` = https://jonah791.github.io/validator-community-docs/report.md
- receipt file = https://jonah791.github.io/validator-community-docs/receipts/sha256-30cda465a1fef7efd1a3d67c3a9cc888dac7fa9de3d9e9fa492fc85b442de03d.json
- snapshot = https://jonah791.github.io/validator-community-docs/godoc-validator.json
- build config = https://jonah791.github.io/validator-community-docs/sourcey.config.ts

## Target

- **Library:** `github.com/go-playground/validator` — Go's struct and field validation library.
- **Pinned commit:** `dfe35cf8317892133dfe31e36054dcbf36aab604` (release tag `v10.30.4`).
- **License:** MIT (permissive), upstream attribution kept in the repository README.
- **Maintained:** yes — active history, multiple source packages, 25 packages in the module.
- **Documented from source:** the core package's exported surface plus `non-standard/validators` and
  23 `translations/*` packages.

## How it was produced (reproducible)

```bash
git clone https://github.com/go-playground/validator.git target-validator
cd target-validator && git checkout dfe35cf8317892133dfe31e36054dcbf36aab604 && cd ..
sourcey godoc -m ./target-validator -p ./... -o godoc-validator.json   # Sourcey 3.6.5 → 25 packages
sourcey build                                                          # reads sourcey.config.ts → dist/
```

- Snapshot mode means the site rebuilds on a host **without Go** — the snapshot is committed.
- Snapshot digest and page list are recorded in `evidence.json`.
- The build ran **under runx governance** (local skill `validator-docs`, runner type `cli-tool`).

## Verification checklist

- [x] `runx --version` → `runx-cli 0.9.1` (acceptance floor is 0.6.13).
- [x] `runx skill ./runx-skill` → `status: sealed`, `outcome: completed`, receipt id recorded above.
- [x] Receipt is `runx.receipt.v1`, Ed25519-signed, one act (`act_build`), criterion `step_outcome`
      = **verified**, seal disposition `closed`.
- [x] `public_url` returns HTTP 200 to an unauthenticated plain fetch, with no cookies or login.
- [x] `evidence_json`, `report` and the receipt file each return HTTP 200 on a plain fetch.
- [x] The tracked repository contains the snapshot and `sourcey.config.ts`, so the site is not a
      one-off upload.
- [x] Source links in the generated reference point at the pinned commit, not at a moving branch.

## Why the host is durable and credible

- The site is a **project-scoped** home (`jonah791.github.io/validator-community-docs/`) backed by a
  public repository that carries the snapshot, the config, the license attribution, and rebuild
  instructions — a maintainer or ecosystem user can verify every page against the pinned source.
- It is **not** a sandbox, preview, or throwaway host: no expiring deployment URL, no login wall, no
  placeholder page.
- **Known gap, stated plainly:** this is a community mirror on a personal project page, not the
  upstream project's own documentation domain. Adoption by the maintainers (a merged docs link)
  would be the stronger form; this delivery is the standalone proof.

## Maintainer-facing gaps the extraction surfaced

- **Extension points are the thinnest documented surface:** `RegisterValidation`,
  `RegisterStructValidation`, `RegisterCustomTypeFunc`, `RegisterTagNameFunc` and the alias family
  are hooks most users touch, yet no contract is stated for what a callback may legally do.
- **The 23 translation packages are undifferentiated,** so a reader cannot tell which locales are
  maintained, which lag the tag set, or which add custom messages.
- **Deprecations have no machine-readable form,** so an automated consumer of the API surface cannot
  see symbols replaced across the v9→v10 line.
- **There is no concept index:** the README explains tag syntax well, but nothing maps a concept
  such as "cross-field validation" onto the symbols that implement it.

## Honesty notes

- Unofficial and community-generated: upstream is the source of truth, and both the site and the
  repository say so on their face. Corrections belong in an upstream issue.
- Nothing here asserts runtime behaviour; every page is derived from the pinned source.
- Hand-written pages are marked as hand-written; everything else is generated.

## One finding while preparing this (offered, not required)

Sourcey's godoc renderer **hangs at 100 % CPU with no output, unboundedly**, on `spf13/cobra`
`v1.10.2` — reproducible, while a synthetic recursive-type module and two other libraries
(`spf13/pflag`, `go-playground/validator`) build in under two seconds. The cobra target had to be
abandoned. Minimal reproduction: snapshot cobra at `88b30ab89da2d0d0abb153818746c5a2d30eccec` with
`sourcey godoc`, then run `sourcey build`.
