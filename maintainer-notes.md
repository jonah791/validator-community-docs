# Maintainer-facing notes

Observations that surfaced while extracting this API surface from source. They are a starting
point for the maintainers, not a review of the project.

## What the extraction found

- 25 packages: the core package, `non-standard/validators`, and 23 language packs under
  `translations/`.
- The core package carries the bulk of exported surface (constructor, validation entry points,
  registration hooks, error types, and the `FieldLevel`/`StructLevel` callback contracts).

## Gaps that became visible

1. **The registration API is the least documented part of the surface.** `RegisterValidation`,
   `RegisterStructValidation`, `RegisterCustomTypeFunc`, `RegisterTagNameFunc` and the alias
   registration family are the extension points most users touch — and they are documented only
   by a signature plus a README paragraph, with no per-hook contract for what the callback may
   legally do.
2. **The 23 translation packages read as undifferentiated.** They are near-identical in shape
   (register translations against a `ut.Translator`), so a reader cannot tell which locales are
   maintained, which lag behind the tag set, or which add custom messages.
3. **Deprecations are not machine-readable.** Symbols replaced over the v9→v10 line are explained
   in prose only, so an automated consumer of the API surface gets no signal.
4. **No concept index.** The README explains the tag syntax well; nothing links a concept such as
   "cross-field validation" to the exact symbols that implement it.

## Reproduce

```bash
git clone https://github.com/go-playground/validator.git target-validator
cd target-validator && git checkout dfe35cf8317892133dfe31e36054dcbf36aab604
sourcey godoc -m . -p ./... -o ../godoc-validator.json
cd .. && sourcey build
```
