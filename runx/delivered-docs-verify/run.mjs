// Runner for delivered-docs-verify.
// Checks a checkout against the delivery packet: the snapshot digest must match
// and every page the packet lists must exist.
//
// Site root resolution, in order:
//   1. RUNX_INPUT_SITE_ROOT, used as an absolute path when absolute, otherwise
//      resolved against this skill directory;
//   2. otherwise the checkout this skill lives inside
//      (<root>/runx/delivered-docs-verify/run.mjs).
//
// The runner never throws on missing data: a checkout that is not there is a
// reported verdict (`snapshot_present: false`, `verified: false`), not a crash,
// so an isolated harness run stays reviewable.
// Read-only: no network, no writes, no subprocess.
import { readFileSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import { isAbsolute, join } from 'path';

const skillDir = fileURLToPath(new URL('./', import.meta.url));
const siteRootInput = (process.env.RUNX_INPUT_SITE_ROOT ?? '').trim();
const siteRoot = siteRootInput
  ? (isAbsolute(siteRootInput) ? siteRootInput : join(skillDir, siteRootInput))
  : fileURLToPath(new URL('../../', import.meta.url));

const expectedDigestRaw = process.env.RUNX_INPUT_SNAPSHOT_DIGEST ?? '';
const expectedDigest = expectedDigestRaw.replace(/^sha256:/, '');

// Stop rather than report a meaningless verdict when the packet's digest is not
// a digest at all. This is the declared stop case in X.yaml.
if (!/^[0-9a-f]{64}$/i.test(expectedDigest)) {
  process.stderr.write(
    JSON.stringify({
      error: 'snapshot_digest must be 64 hexadecimal characters, optionally prefixed with sha256:',
      got: expectedDigestRaw,
    }) + '\n',
  );
  process.exit(1);
}

const listed = (process.env.RUNX_INPUT_EXPECTED_PAGES ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const snapshotPath = join(siteRoot, 'godoc-validator.json');
const result = {
  site_root_tail: siteRoot.split('/').filter(Boolean).slice(-2).join('/'),
  snapshot_present: false,
  snapshot_digest: null,
  snapshot_bytes: null,
  snapshot_matches: false,
  pages_listed: listed.length,
  pages_missing: null,
  pages_missing_list: '',
  pages_all_present: false,
  note: '',
};

if (existsSync(snapshotPath)) {
  const snapshotBytes = readFileSync(snapshotPath);
  const snapshotDigest = createHash('sha256').update(snapshotBytes).digest('hex');
  const missing = listed.filter((p) => !existsSync(join(siteRoot, p)));
  result.snapshot_present = true;
  result.snapshot_digest = `sha256:${snapshotDigest}`;
  result.snapshot_bytes = snapshotBytes.length;
  result.snapshot_matches = snapshotDigest === expectedDigest;
  result.pages_missing = missing.length;
  result.pages_missing_list = missing.join(',');
  result.pages_all_present = missing.length === 0;
  result.verified = result.snapshot_matches && result.pages_all_present;
  result.note = result.verified
    ? 'checkout matches the packet digest and lists every page'
    : 'checkout is present but does not match the packet';
} else {
  result.note = `no godoc-validator.json under ${siteRoot}; nothing was verified`;
}

process.stdout.write(JSON.stringify(result) + '\n');
