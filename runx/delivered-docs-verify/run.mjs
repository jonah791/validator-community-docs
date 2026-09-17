// Runner for delivered-docs-verify.
// Checks the committed build against the delivery packet: the snapshot digest
// must match, and every page the packet lists must exist in the checkout.
// The site root is resolved from this file's own location
// (<root>/runx/delivered-docs-verify/run.mjs), so the verdict does not depend
// on the working directory the governed run happens to use.
// Read-only: no network, no writes, no subprocess.
import { readFileSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import { join } from 'path';

const siteRoot = fileURLToPath(new URL('../../', import.meta.url));

const expectedDigestRaw = process.env.RUNX_INPUT_SNAPSHOT_DIGEST ?? '';
const expectedDigest = expectedDigestRaw.replace(/^sha256:/, '');

const listed = (process.env.RUNX_INPUT_EXPECTED_PAGES ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const snapshotPath = join(siteRoot, 'godoc-validator.json');
const snapshotBytes = readFileSync(snapshotPath);
const snapshotDigest = createHash('sha256').update(snapshotBytes).digest('hex');

const missing = listed.filter((p) => !existsSync(join(siteRoot, p)));

const result = {
  site_root_tail: siteRoot.split('/').filter(Boolean).slice(-2).join('/'),
  snapshot_digest: `sha256:${snapshotDigest}`,
  snapshot_bytes: snapshotBytes.length,
  snapshot_matches: snapshotDigest === expectedDigest,
  pages_listed: listed.length,
  pages_missing: missing.length,
  pages_missing_list: missing.join(','),
  pages_all_present: missing.length === 0,
};
result.verified = result.snapshot_matches && result.pages_all_present;

process.stdout.write(JSON.stringify(result) + '\n');
