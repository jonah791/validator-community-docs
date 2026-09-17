# runx support action: close the getting-started verify dead end

## What was posted

A pull request against `runxhq/runx` that adds the expected verdicts to the
getting-started walkthrough:

- https://github.com/runxhq/runx/pull/489
- one file changed: `docs/getting-started.md`, 41 lines added
- branch `docs/verify-local-development-flag` on the fork `jonah791/runx`
- commit `2c26254`, signed off under the DCO

The runx link sits in the body of the page the reader is already reading: the
added block documents `runx verify <receipt-id> --allow-local-development-signatures`,
which is the flag the CLI names when verification stops. The repository is
linked as https://github.com/runxhq/runx in the pull request body and throughout
the surrounding page.

## Where it lives

The pull request is public, reachable by a plain fetch, and readable without an
account. It is on the project's own repository, in the documented contribution
path, next to the issue it closes.

## What the page says now

The walkthrough seals a local-development receipt and then sends the reader to
`runx verify <receipt-id>`. That command exits non-zero with a message naming
three ways forward, and the one that applies to the receipt the walkthrough just
produced appears in the CLI help but nowhere in the getting-started path. The
inspection step reports `"verification": { "status": "unverified" }` without
saying whether that is expected either.

The added block records both expected verdicts in order: the unverified
projection, then the verifier-required message, then the local-development
verdict, and one sentence scoping what that verdict covers. A reader no longer
has to leave the document to find out whether their receipt is broken.

## Why this is authentic support

- The gap is already reported by someone else on the same revision, so this is
  not a promotional drive: it is the missing half of a fix nobody had written.
- The reproduction is first hand. On `runxhq/runx @ 02549ee8ff7029767f555d211ea65c92987c445c`
  with `runx-cli 0.9.1` and Node v22.22.1, running the checked-in
  `examples/hello-world` seals receipt
  `sha256:9097fe629c3555dc2204137dbf52d4f1d08bcbd8d0bea4c170b15c456f217099`,
  whose inspection reports `unverified`, whose `runx verify` prints the
  verifier-required message, and whose
  `runx verify --allow-local-development-signatures` prints
  `signature mode: local-development`, `tree sha256:<receipt-id> (1 receipt): ok`,
  `verification: ok`.
- The change is documentation only: no code, schema, or contract is touched, so
  there is nothing for a maintainer to re-verify beyond the text.
- The venue allows it. The repository accepts documentation pull requests from
  outside contributors and asks only for a DCO sign-off, which the commit
  carries.

## Why it is not link spam

The pull request is not a mention of runx anywhere a pitch would be out of
place. It is a change inside runx's own documentation, on the page whose reader
hit the dead end, closing an issue that a different contributor opened two days
earlier. There is no reciprocal link, no cross-promotion, and no request to
read anything else. The only external noun added to the page is the flag the CLI
itself prints.
