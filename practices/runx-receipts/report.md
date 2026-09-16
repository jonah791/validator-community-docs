# Delivery report: a public walkthrough of runx receipts

Bounty 49, "Give runx some love" (goodwill, no cash: accepted work grants three days of Frantic runway).

## What was published

A short, original walkthrough: **Producing a verifiable receipt with runx**, at
`https://validator-community.com/practices/runx-receipts/`.

It is written from a run that actually happened. I used runx as the execution harness for a
documentation delivery earlier the same day: a two-file skill (`SKILL.md` plus `X.yaml`) whose
`build` runner renders a pinned godoc snapshot into a static site, executed through the runx CLI,
leaving a signed receipt. The page walks through that run rather than a synthetic one, and quotes
the real `runx verify` output rather than an idealised version of it.

## Where it lives

- Page: `/practices/runx-receipts/` on `validator-community.com`, a registered project domain I
  maintain, alongside its evidence and this report.
- The receipt the page describes is published as JSON under `/receipts/`, so a reader can point
  `runx verify` at the same file the page quotes instead of taking the transcript on trust.
- The page sits inside a `delivery practice` section that already existed, next to nine shorter
  rules on publishing checkable work. It is linked from that index and from the site's project
  home.

## What it contributes

- **Receipt anatomy.** Which fields are load-bearing when verifying, which are illustrative, and
  why artifacts referenced by content hash survive a site moving while URL-shaped references do not.
- **Three separate checks.** `digest`, `content_address`, and `signature` answer different
  questions, and a verdict reports them separately; the page explains what each one is for.
- **The signature-mode distinction.** This is the part I would most want documented upstream:
  `status: valid` with `mode: local-development` says the receipt is internally consistent and was
  signed by a key on the machine that produced it. That is a real claim. It is not a third-party
  attestation, and a verifier that reads the two as equivalent has quietly raised the trust it is
  reporting.
- **Three concrete doc suggestions** for whoever writes runx's documentation next: a
  receipt-anatomy table, signature modes in one place, and a paragraph on why
  `--allow-local-development-signatures` exists. These are phrased as suggestions, not complaints,
  and they came from actually needing them.

## Why this is authentic support rather than link spam

- The page is on **my own registered project domain**, in an editorial section, not in a comment,
  a profile, a signature, or a directory that exists to carry links. No third-party venue rules are
  engaged, and nobody's content was edited to make room for a link.
- The runx links are in the introductory paragraph of the body, and they are there to answer
  "what is this tool" before the worked example starts. If the links were removed, the page would
  still be worth reading; that is the test I applied.
- It is **original and specific**: one real run, real output, real file names, and the gap I
  actually hit. It is not a generic "runx is great" post, a repost, or a duplicated claim.
- It is **not reciprocal promotion**: nothing is asked of runx in return, and no listing, badge,
  or backlink was exchanged.
- I deliberately did **not** open an unsolicited issue or pull request in runx's repository. Their
  maintainers have not asked for review work from me, and putting it on them before they ask would
  be the intrusive version of support. The text is ready to move upstream if they want it.

## Honesty notes

- The walkthrough is **version-specific** where it has to be (runx-cli 0.9.1, Sourcey 3.6.5). Field
  names may drift between releases; the page says so rather than implying permanence.
- The signature quoted is a **local-development** signature. I am not claiming notarised
  provenance, and the page's whole point is that the distinction should be visible.
- The site's own bounty-33 artifacts (`/`, `/evidence.json`, `/report.md`, `/receipts/`) were left
  byte-identical while this was added; the work is additive and does not disturb a delivery that is
  under review.

## Artifacts

```text
public_url=https://validator-community.com/practices/runx-receipts/
evidence_json=https://validator-community.com/practices/runx-receipts/evidence.json
report=https://validator-community.com/practices/runx-receipts/report.md
```
