import { defineConfig, godoc, markdown } from "sourcey";

// Community-generated API reference for go-playground/validator v10.30.4 (MIT).
// The API surface is extracted from the pinned source commit with `sourcey godoc`
// and committed as godoc-validator.json, so this site rebuilds without a Go toolchain.
export default defineConfig({
  name: "validator · community API reference",
  navigation: {
    tabs: [
      {
        tab: "About",
        slug: "",
        source: markdown({
          groups: [{ group: "Start here", pages: ["introduction", "maintainer-notes"] }],
        }),
      },
      {
        tab: "Go API",
        slug: "api",
        source: godoc({
          snapshot: "../godoc-validator.json",
          mode: "snapshot",
          includeTests: true,
        }),
      },
    ],
  },
});
