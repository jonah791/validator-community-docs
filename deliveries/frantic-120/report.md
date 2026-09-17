# Delivery report: one new Entity for the Startup Credits registry (bounty #120)

- **The deliverable is the pull request itself:** [sourcey/startup-credits#1606](https://github.com/sourcey/startup-credits/pull/1606).
- **It adds exactly one new Entity and exactly one offer:** `entities/nl/nlnet.yaml`, NLnet Foundation (`nlnet.nl`), offer `nlnet-first-grant` (a first grant of between EUR 5,000 and EUR 50,000 for open technical development).
- **The path follows the repository contract:** the shard is the first two characters of the slug (`nl`) and the filename is the slug (`nlnet.yaml`); `schema_version` is `sourcey.entity-authoring/v1alpha1`.
- **Both cited sources are first-party** and were read on 2026-09-17: the open call page `https://nlnet.nl/propose/` and the foundation's own homepage `https://nlnet.nl/`.
- **The offer is currently available and material:** the open call is live and the page carries the next deadline (November 3rd 2026, 12:00 CET), and the money range is stated on the vendor's own page.
- **Nothing invented:** value, currency and unit (EUR, minor units 5000000, kind `up-to`), consideration (`none`), eligibility (technical development released under open licences; European dimension for EU-supported funds), access route (`form` at the proposal page), lifecycle (`active`) and source references all come from those two pages.
- **Changed-closure CI is green on the current head:** the repository's `sourcey/validation` status passes (GitHub Actions run 35214498582), and the commit carries a DCO sign-off.
- **Data-only, reviewable:** one YAML file, no code, no generated output, no compatibility layer, no unrelated history; fresh `ent_`, `prg_`, `off_` and `src_` identifiers were minted for this record.
- **Pre-work checks were done:** I searched the open pull requests and the missing-record issues before starting, and opened the reservation issue [#1605](https://github.com/sourcey/startup-credits/issues/1605) before writing the record.
- **Plain views for a fetcher that cannot run GitHub's client-side rendering:** the [plain diff](https://github.com/sourcey/startup-credits/pull/1606.diff) and the [raw file on the pull-request branch](https://raw.githubusercontent.com/jonah791/startup-credits/add-nlnet-grant/entities/nl/nlnet.yaml).
- **Honesty note about merge timing:** Frantic's acceptance criteria for this bounty say acceptance is judged on the pull request itself; Sourcey's private admission review and merge timing are outside the worker's control and are not claimed as done here.
