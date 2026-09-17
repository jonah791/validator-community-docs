# Receipt signing identity

CI-issued runx receipts in this directory are signed by the Ed25519 identity
`alice-ci-receipt-signer`, whose public key is committed beside this file as
`runx-signer.pub.b64`:

```
kid                     alice-ci-receipt-signer
public key (base64)     oJfdcSxYOLcZYXsZBv5CqYPYQ2+DDTr5qI0zXvZz1a0=  (32 raw bytes)
public key fingerprint  sha256:3790481a84fc446353fc7bde933d40a9242f66b49190033cdc9e38ef74996661
```

The signing seed exists only as an encrypted repository secret
(`RUNX_RECEIPT_SIGN_ED25519_SEED_BASE64`) and is never committed. Runs that use
it are started by the `runx governed verification` workflow
(`.github/workflows/runx-verify.yml`), which sets
`RUNX_RECEIPT_SIGN_ISSUER_TYPE=ci`, so the issuer metadata on those receipts
reads `ci` rather than `local`.

## Verifying a receipt from this directory

```bash
export RUNX_RECEIPT_VERIFY_KID=alice-ci-receipt-signer
export RUNX_RECEIPT_VERIFY_ED25519_PUBLIC_KEY_BASE64="$(cat receipts/runx-signer.pub.b64)"
runx verify <receipt-id> --receipt-dir receipts
```

## Note on earlier receipts in this directory

`sha256-ee9db9b1…json` and `sha256-30cda465…json` were issued by a local
development runtime (`kid: runtime-skeleton`, signature mode `local-development`).
They verify only with `--allow-local-development-signatures` and their lineage
is unverified. Git history keeps them; they are not presented as trusted
receipts, and the CI-issued receipts above supersede them for delivery.
