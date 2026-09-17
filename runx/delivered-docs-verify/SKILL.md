---
name: delivered-docs-verify
description: Verify a delivered static documentation build against its recorded snapshot digest and page count, and return the verdict as named artifacts.
---

# delivered-docs-verify

Run this when a documentation site was published from a pinned upstream commit
and a reviewer needs a bounded, recomputable check that the delivered bytes are
the bytes that were recorded, not a later edit.

## When to use

Use it on a checkout of the delivered site repository. It answers one question:
does the committed build still match the digests and page count the delivery
packet claims. It does not regenerate the site and it does not fetch anything.

## Procedure

1. Read `godoc-validator.json` from the repository root and hash it with SHA-256.
2. Compare that digest with the declared `snapshot_digest` input.
3. Count every `.html` page in the checkout and compare with `expected_pages`.
4. Return the two verdicts and the observed values as named artifacts.

## Output

`named_emits` exposes `snapshot_digest`, `snapshot_matches`, `pages_found`,
`pages_expected`, `pages_match`, and `verified`. A run seals a receipt whose
`result` body carries those values, so a reviewer can compare the receipt with
the checkout without rerunning anything by hand.

## Limits

- This is a verification of delivered bytes, not a regeneration of the site. The
  generating run happened earlier and is described in the delivery report.
- It reads files inside the checkout only. No network, no writes, no subprocess.
- A passing verdict says the checkout matches the recorded digests. It says
  nothing about whether those digests are the right thing to publish.
