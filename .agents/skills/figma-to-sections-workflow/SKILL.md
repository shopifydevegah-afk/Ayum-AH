---
name: ayum-figma-to-sections-workflow
description: The permanent operating standard for converting the AYUM Figma design into production Shopify sections in this Shopify theme — one section at a time. Use for any Figma-to-section implementation, follow-up bugfix, or design-driven change on the homepage, product page, or collection page. Covers Figma MCP inspection, pre-implementation reporting, the existing-first reuse ladder, the color-scheme-first / no-hardcoded-colors policy and existing-setting-first Theme Editor controls, the custom-class rule, preservation of merchant data, RTL/responsive/accessibility validation, and the final report format.
---

# AYUM — Figma → Shopify Sections Workflow

This skill is the **permanent source of truth** for converting the AYUM Figma design into production-ready Shopify sections in this repository. It is self-contained: it does not depend on any other Markdown file to be understood or followed.


**AYUM project identity (current):**
- Repository/project folder: `ayum-store`
- Project name: **AYUM**
- Figma file key: `7cOVp6r92Z3heL1aTMP5N3`
- Desktop full-page context node: `2001:3`
- Mobile full-page context node: `2001:581`
- Figma desktop: https://www.figma.com/design/7cOVp6r92Z3heL1aTMP5N3/Ayum--Copy-autolayout?node-id=2001-3&t=xvA1tZ1dkOjKjKcf-0
- Figma mobile: https://www.figma.com/design/7cOVp6r92Z3heL1aTMP5N3/Ayum--Copy-autolayout?node-id=2001-581&t=xvA1tZ1dkOjKjKcf-0

- These are context frames only; implementation still requires the exact desktop/mobile node for the one target section.

Two companion files exist and remain authoritative for what they cover, but this skill does not require them:

- [AGENTS.md](../../../AGENTS.md) — short repository orientation (mandatory, do not modify from this skill).
- [AYUM_PROJECT_PLAN.md](../../../AYUM_PROJECT_PLAN.md) — **project-specific** section inventory, Figma node map, status tracker (§22), implementation log (§23), and open questions (§20). **Permanent workflow rules live here in SKILL.md; per-section status and decisions live in the project plan.** Do not duplicate this skill inside the plan, and do not move workflow rules into the plan.

> Note: a root-level `SKILL.md` (the Kalles development standard) exists in git history but is **deleted in the working tree**. Do not rely on it. Everything from it that applies to AYUM work is reproduced or adapted below. There is also a separate skill directory `.Codex/skills/kalles-figma-to-sections-workflow/` — leave it alone; do not delete or edit it.

---

## 0.0 Native Kalles first — mandatory decision gate for EVERY section

This rule takes priority over older duplicate-first language in this skill, except when the user gives a newer, explicit, task-scoped exception. **Never duplicate just because a section is being used for AYUM.**

1. **Native Kalles works without source edits:** Use the ORIGINAL Kalles section/type and native blocks directly, configured through existing Theme Editor settings. Scoped CSS is allowed without modifying native source. Do **not** duplicate it. Use its existing `custom_class` setting when present; otherwise use a stable per-instance wrapper/Shopify section ID for styling. Do not modify the original to add `custom_class`.
2. **Native Kalles requires source edits:** If exact required functionality genuinely needs schema settings, Liquid/markup/JS changes, a new `custom_class` setting, or a changed native block, preserve the Kalles original untouched. Use ONE isolated AYUM copy of the closest native implementation. Reuse unchanged native dependencies. Make no redundant parallel settings; keep the selected merchant color scheme and use scheme variables first.
3. **AYUM copy already exists:** For requested follow-up changes, edit the existing AYUM copy in place, never duplicate it again. During a completed-homepage audit, treat the AYUM copy as a **migration candidate**, not an automatic deletion target. Replace it with native Kalles only when every saved setting, block, UI detail, behavior, and dependency can be preserved and the user approves the migration.

**Zero-regression migration gate:** The current merchant-configured homepage is the baseline; exact visual appearance, interactive behavior, responsive/RTL behavior, accessibility, color-scheme assignments and Theme Editor controls must survive. Inspect all current `templates/index.json` section and nested block IDs/types/settings, images/videos, products/collections, menu/links, styles, scripts and shared dependencies; compare native schemas field-by-field. A section type rename does NOT migrate custom block types or settings. For a full-homepage audit, perform READ-ONLY analysis and produce a section-by-section compatibility report and safe migration plan first. Do not edit any implementation file or delete duplicates in that audit. After approval, migrate **one section per task**, verify desktop/mobile browser results where possible and stop for approval before the next. If proof is incomplete, retain the AYUM copy. Never promise that static-only validation proves zero regressions.

**Scope protection:** Header, footer, announcement bar and other shared section groups are not automatically part of a homepage `index.json` migration. Never alter original vendor source, unrelated templates, global CSS, `config/settings_data.json`, or merchant data just to reduce duplicated filenames.

---

## 0. Scope and hard limits

This skill governs: converting Figma nodes into Liquid sections/blocks/snippets, their `{% schema %}`, their CSS, any required JavaScript, template JSON wiring, localization, RTL, responsive behavior, accessibility, and the reporting around all of it.

**Absolute limits — these are never negotiable:**

- **Never implement the full website in one task.** One section per task. One page at a time.
- **Never inspect, redesign, or implement unrelated sections during a focused single-section task.** If you notice a problem elsewhere, note it in the report; do not fix it.
- Never start the next section after finishing one. Stop and report.
- Never modify Shopify implementation files during an audit/plan/report-only task.
- Never claim something was tested when it was only inspected statically.

---

## 1. Source-of-truth priority

**Preserve this ordering exactly. It overrides convenience, habit, and visual intuition.**

1. Section-specific Figma desktop/mobile nodes are the primary source of truth.
2. Use Figma MCP to read actual structure, spacing, sizes, colors, typography, variables/tokens, and assets whenever possible using:
   - `get_design_context`
   - `get_variable_defs`
   - `get_metadata`
   - `get_screenshot`
3. Read values from the Figma node data.
4. Do not measure or estimate values from an image when the real Figma node data is available.
5. Cropped section screenshots are visual confirmation only.
6. Full-page Figma links are general context only.
7. Full-page screenshots are general context only.
8. Do not re-analyze or implement unrelated sections during a single-section task.
9. If a Figma node and a screenshot disagree, prefer the Figma node values and clearly flag the discrepancy.
10. The latest explicit correction from the user overrides older instructions.
11. Desktop and mobile nodes are both authoritative.
12. Do not assume mobile is a scaled-down desktop.
13. Existing theme conventions come after direct section-specific Figma requirements.
14. Agent assumptions have the lowest priority.

Codex must inspect the **exact** desktop and mobile nodes supplied for each task. A whole-page Figma node must **not** be used as a substitute for exact section nodes when exact nodes are available.

Supplementary ordering for non-Figma conflicts (applies below rule 1 and above rule 14): current explicit user request → this skill → `AGENTS.md` → verified **active** code path in this repository → `AYUM_PROJECT_PLAN.md` → verified Shopify OS 2.0 / Liquid platform behavior → general engineering practice → assumptions (state them).

When a conflict cannot be resolved safely: state the conflict, cite the evidence for each side, mark it **Needs verification**, and choose the least destructive path. Do not silently pick a convention.

---

## 2. Project facts (verified from this repository)

Re-verify anything marked *Needs verification* before relying on it.

### 2.1 Platform and theme

- **AYUM repository:** `ayum-store`. Before the first implementation, verify Shopify OS/theme name/version from `config/settings_schema.json` → `theme_info`; do not inherit the previous project's version as an assumption.
- **No `package.json`, no bundler, no build step, no test suite, no lint config.** A saved Liquid/JSON/asset file **is** the deployable artifact.
- File counts and available sections/blocks/snippets/assets must be read from the current AYUM repository; do not reuse counts from the previous project.
- Deployment/validation tooling is the Shopify CLI only (`shopify theme dev | check | push | pull`), which **cannot be assumed runnable** here.

### 2.2 Rendering architecture

- Entry point `layout/theme.liquid`: resolves RTL, sets `<html>`/`<body>` flags, renders head snippets (`css-variables`, `js-variables`, `scripts`, `social-meta-tags`, `structured-data`), then renders section groups `header-group`, `footer-group`, `system-group`. `layout/password.liquid` covers the password page.
- Sections declare a `{% schema %}` and pull child blocks via `{% content_for "blocks" %}` (dynamic) or `{% content_for "block", type: "...", id: "..." %}` (pinned; the pinned block must be declared `"static": true` with the **same id** in the preset or the slot renders empty).
- **A block's `type` is its filename minus `.liquid`, including any leading `_`.** The underscore is load-bearing.
- Templates are `templates/*.json` (only `gift_card`, `password`, `search.other` remain `.liquid`). Many suffixed variants exist (~17 `product.*`, ~11 `collection.*`, many `page.*`) and are merchant-selectable — **do not break them**.
- The `hdt-` / `hdt_` prefix is The4's namespace across custom-element tag names, CSS classes, snippets, and schema types. **Preserve exact strings.**

### 2.3 CSS architecture

- Design tokens live in `snippets/css-variables.liquid` inside a `:root { … }` `{% style %}` block, computed from `settings.*`. Families: spacing `--spacing-*`, colors `--color-*` / `--hdt-btn-*`, typography `--f_family_1..5` / `--font-*` / `--text-*` / `--h0-size..h6-size` (+ `-mb` mobile), layout `--container-max-width*`, radii `--radius-*`.
- **`--color-*` tokens are space-separated RGB triplets** (e.g. `34 34 34`), consumed as `rgb(var(--color-x))` or `rgb(var(--color-x) / .5)`. `color: var(--color-foreground)` alone is invalid.
- **Color schemes (verified in `snippets/css-variables.liquid` + `config/settings_schema.json`).** Schemes are defined by the merchant in Theme settings (`color_schemes` group: `text`, `text2`, `background`, `background2`, `background_gradient`, `button`, `button_label`, `button_border`, `secondary_button_label`, `accent_color`, `line_border`, `overlay`, price/input colors). A section opts in through the native `colors_by_section` checkbox + `color_scheme` setting, which renders `color-scheme="{{ section.settings.color_scheme }}"` on its wrapper; `css-variables.liquid` emits, per scheme, `[color-scheme="<id>"] { --color-background, --gradient-background, --color-background2, --color-foreground, --color-foreground2, --color-accent, --color-secondary, --color-tertiary, --hdt-btn-color/-bg/-border-color/-hover-*, --hdt-btn-secondary-*, --hdt-btn-tertiary-* }`. `--color-line-border`, `--color-overlay`, `--color-pr-*` and `--color-input-*` are emitted **only from the body scheme** (`color_scheme_body`) at `:root`, not per scheme. Utility classes consume them: `.hdt-s-gradient` (background, honoring `--background-opacity`) and `.hdt-s-text` / `.hdt-s-text2` (text). See §2.8 for the mandatory color policy.
- Global CSS loads **once**, at the end of `css-variables.liquid`: `base.css` + `theme.css` (preload), then `product-card.css`, `collection-products.css`. Do not re-load these anywhere. `base.css` is a Tailwind-preflight + `hdt-` utility library — **do not hand-edit**.
- Per-section CSS is lazy-loaded as the **first line(s)** of the section file: `{{ 'NAME.css' | asset_url | stylesheet_tag }}`. The theme uses external `asset_url` stylesheets exclusively — there are **zero** `{% stylesheet %}` embedded blocks.
- Instance-scoped CSS goes in an inline `{% style %}` block scoped by `#shopify-section-{{ section.id }}` (or `.hdt-section-spacing-{{ section.id }}` via `{% render 'spacing-vars', box: section %}`).
- Re-verify the AYUM repository's actual global custom override file before using it. Use a global override file only for cross-page, custom-class-scoped overrides — not for section-local styling.
- For a custom-class-gated stylesheet, load it conditionally from the shared section and prefix every selector with the instance class. Do not reuse a previous-project-specific stylesheet or class name.

### 2.4 JavaScript architecture

- Native ES modules via the **importmap** in `snippets/scripts.liquid` — aliases `@theme/global`, `@theme/events`, `@theme/utilities`, `@theme/floating`, `@theme/psw`, `@theme/zoom-psw`, `@theme/dayjs`, `@theme/libs`. Import from aliases, never raw asset paths. A new alias requires editing `scripts.liquid` **and** adding a matching `modulepreload`.
- **Editable JS source is `assets/events.js`, `assets/utilities.js`, `assets/custom.js` only.** All `*.min.js` are generated/vendor bundles with no in-repo source — never hand-edit them. `assets/theme.js` is intentionally empty. To change base-class behavior, subclass in `custom.js`.
- UI is Web Components: `customElements.define('hdt-…', class)`. `global.min.js` registers ~60 `hdt-*` elements; `facets.min.js` registers filtering elements.
- Cross-component communication uses the typed event bus in `assets/events.js` — reference `ThemeEvents` constants (`cart:update`, `variant:selected`, `dialog:open`, `filter:update`, …) and dispatch with the typed classes (`CartUpdateEvent`, `CartAddEvent`, `CartCountEvent`, `QuantitySelectorUpdateEvent`, `CartErrorEvent`). **Never hardcode a raw event string. `CartAddEvent.eventName === ThemeEvents.cartUpdate` — adds and updates share the `cart:update` channel.**
- Runtime config reaches JS as `window.themeHDN`, populated in **two stages**: `themeHDN.settings` in `snippets/js-variables.liquid` (head), `themeHDN.routes` + `themeHDN.extras` in `snippets/system-bottom.liquid` (footer). Code needing routes/extras must run after `system-bottom.liquid`.
- Reuse helpers from `assets/utilities.js` (`$4`/`$$4`/`$id4`, `debounce`, `throttle` — **rAF-based, not time-based**, `formatMoney`, `fetchCache`, `fetchConfig`, `matchMediaQuery`, `createImg`, `renderSrcset`, `requestIdleCallback`). Do not reimplement them.
- Guard editor-only code with `Shopify.designMode` (JS) / `request.design_mode` (Liquid); react to `shopify:section:load/unload/select/deselect/reorder` and `shopify:block:select/deselect`.

**JavaScript precedent rule:** inspect the AYUM repository for the closest existing isolated Web Component before adding JavaScript. Preserve the same guarded `customElements.define`, resilient/idempotent `connectedCallback`, per-instance state, and `disconnectedCallback` cleanup pattern. Do not copy previous-project-specific element names or asset filenames into AYUM.

### 2.5 Breakpoints — the real project values

**Verified from the repository:** the theme has exactly **two layout breakpoints — `768px` (md/tablet) and `1150px` (lg/desktop)** min-width, with `767` / `1149` max-width mirrors. (`750px` appears only in image `sizes` strings, never in layout.) Utility prefixes are mobile-first: unprefixed = mobile, `md:` = ≥768, `lg:` = ≥1150. Column counts come from `col_dk` / `col_tb` / `col_mb` schema selects → `hdt-grid-cols-{col_mb} md:hdt-grid-cols-{col_tb} lg:hdt-grid-cols-{col_dk}`.

Therefore the **project tiers are**:

| Tier | Range | Figma source |
| --- | --- | --- |
| Mobile | below 768px | Figma 390 frames |
| Tablet | 768px to below 1150px | **not designed** — interpolate |
| Desktop | 1150px and above | Figma 1440 frames |

**There is no 1440 breakpoint in this theme.** Do not introduce one, and do not treat "small desktop 1150–1439" as a separate designed tier. A 1440-wide Figma frame maps to the ≥1150 desktop tier; verify the layout is still sane at 1150–1439 (it is the same tier), and say so honestly in the report.

Validate the boundaries: **767 / 768 / 1149 / 1150**, plus a wide check at **1440** and narrow checks at **390**, **375**, and **320** for overflow. Adding a new layout breakpoint desyncs grid, typography tokens, and the `md:`/`lg:` utilities — if a design genuinely requires one, flag it as a documented exception before writing it.

Do not treat tablet as an enlarged mobile or a shrunk desktop automatically. Because 768–1149 is undesigned, infer it safely from: the project architecture, the Figma Auto Layout behavior (hug/fill/wrap), content constraints, the existing `col_tb` defaults, and reasonable interpolation. Prefer fluid sizing. **Never write a layout rule that only works at the exact screenshot width**, and avoid one-off magic widths not backed by Figma or a documented layout requirement.

### 2.6 RTL / LTR

- **This project supports both, and the AYUM design direction/language must be verified from the exact Figma nodes and active storefront configuration before implementation — do not assume RTL or LTR.**
- Storefront locales present: `ar`, `de`, `es`, `fr`, `zh-CN`, `en.default`. Schema locales: `de`, `es`, `fr`, `zh-CN`, `en.default` — **there is no `ar.schema.json`**, so Arabic Theme-Editor labels fall back to English.
- Direction is resolved **once** in `layout/theme.liquid` from `settings.right_to_left` (`enable` / `enable-with-list` against a hardcoded ISO list including `ar`) → sets `dir`, a `dir--rtl` / `dir--ltr` class, and passes `is_rtl` to `css-variables`, which emits `--value-logical-flip`, `--value-origin-start`, `--value-origin-end`.
- **Write logical properties first**: `margin-inline`, `padding-inline`, `inset-inline-start` / `inset-inline-end`, `border-inline-start` / `border-inline-end`, `text-align: start` / `end`. Add an explicit `.dir--rtl` override only where a physical value is unavoidable, and say why.
- Do not hardcode left/right where the layout should mirror. Do not force direction globally from a section. Do not reverse content that should stay LTR (some media, numeric sequences, slider geometry, certain icons) without checking the actual design.
- Legitimate exception pattern (precedent: categories-routine, trust-marquee): set `direction: ltr` on a **geometry-only** container (a grid track or an animation track) to get predictable physical placement, then restore `direction: rtl` on each text-bearing child. Document it when you do.
- In JS, read `document.documentElement.getAttribute('dir')` or `isRTL` from `@theme/global` — never re-detect direction.
- **Locale-driven direction rule (permanent — learned from the H5 About and H7 Reviews bugfixes):** this theme resolves `dir` from the *storefront locale*, and `en.default` is the default locale — so the page is LTR for most visitors even though AYUM content is Arabic. Therefore, for any section whose content is authored in Arabic: (1) never rely on the page `dir`, a single wrapper rule, or per-leaf selector lists for text direction; declare `direction: rtl` (with `unicode-bidi: isolate`) **once at each text-content boundary** — the card/column/content wrapper — so every descendant inherits it. **Direction and alignment are separate decisions: never bundle a `text-align` into the direction rule.** Alignment follows the *design* — centered elements (section headers, badges) stay `text-align: center` and must not receive `start`/`end`; only content the design edge-aligns gets `text-align: start`/`end` (which then resolves against the declared direction). Verified failure: pairing `text-align: start` with the direction declaration on the H7 centered header blocks shoved the whole header to the right. (2) Keep geometry tracks (grids, flex rows, slider viewport/container) separate: pin a track's direction explicitly only when a physical order must hold in every locale, and never override the `<hdt-slider>` container/track direction — its JS follows the page `dir`. (3) Validate the section in **both** the `ar` and `en.default` locales before claiming RTL correctness.
- **Validate both RTL and LTR.**

### 2.7 Typography and brand

- Verify AYUM typography from the exact Figma nodes and current theme settings. Do not carry the previous project's El Messiri assumption into AYUM.
- **Do not hardcode a `font-family`.** Prefer, in order: existing theme typography classes → project typography variables / CSS custom properties (`--font-heading-family`, `--font-body-family`, `--font-semibold`, `--f_family_1..5`) → inherited font-family.
- **Do not put Liquid inside a plain static `.css` asset** (e.g. `src: url({{ 'font.woff2' | asset_url }});` in a `.css` file will not be processed). Use an inline `{% style %}` block in the Liquid section, or a valid static asset URL strategy.

### 2.8 Figma design tokens and the color-scheme-first policy (mandatory)

Read the real AYUM values per node each time with `get_variable_defs` / `get_design_context`. Do not reuse the previous project's color or typography token values as AYUM defaults.

**Figma color values are design defaults, not code.** Every color a section renders must stay controllable from the Shopify Theme Editor. This applies to section backgrounds, headings, descriptions, buttons, badges, borders, pagination dots, slider arrows, cards, overlays, and every hover/active/selected/focus state.

**Inspection — before writing any CSS or adding any color setting:**

1. Inspect the existing color schemes and their variables (§2.3): which schemes the merchant has defined (read-only look at `config/settings_data.json` → `color_schemes`; never edit it) and which variables a scheme exposes per section vs. only at `:root`.
2. Check the original Kalles section's (and its blocks') schema for existing color controls: `colors_by_section` + `color_scheme` + `background_opacity`, `text_color` selects (`hdt-s-text`, `hdt-text-secondary`, `hdt-text-primary`, …), button style selects (`hdt-btn-*` variants), and per-block `color` settings (e.g. `button_custom` primary/secondary/hover colors, `text_custom` `color_text`).
3. Map each Figma color role to the closest native source and record the mapping (e.g. Figma background → scheme `--color-background`; heading → `--color-foreground`; accent → `--color-accent`; primary button → `--hdt-btn-bg` / `--hdt-btn-color`).
4. Reuse the existing scheme variable or native setting whenever it can express the role.
5. Preserve the merchant's ability to change the color in the Theme Editor (a scheme switch or a setting change must visibly change the rendered color).

**Resolution ladder for each color role (take the first that works):**

1. An existing **color scheme variable** consumed through the native `colors_by_section` / `color_scheme` settings (or the scheme the section — or a slide/block with its own `color_scheme` — already inherits).
2. An existing **native color setting** on the section or block (reuse it; never add a parallel duplicate). This includes native `text_color` selects (`hdt-s-text` / `hdt-text-secondary` / `hdt-text-primary`): do not override their result with an AYUM color.
3. A **new color setting on the isolated AYUM section/block** (never on the original Kalles file), with a meaningful label, the Figma value as its `default`, `"alpha": true` when the design needs transparency (the setting type supports it and the repo already uses it), and grouped under a clear `header`.

**“Value missing” vs. “role missing” (mandatory test before adding a new color setting):**

- **The scheme has the color role, but not the current Figma value:** this is merchant configuration, not a missing feature. Consume the native scheme variable. Report which scheme field the merchant should configure, preferably in a dedicated scheme assigned to this section rather than changing a shared scheme.
- **The scheme structurally cannot express the role:** e.g. multiple independent per-card colors beyond the scheme slots, or no relevant scheme token at all. Only then consider an AYUM-specific color setting, and only if no existing native block/section control fits.
- Ask: *If the merchant edited the assigned color scheme, could it reproduce this design?* If yes, do **not** create a parallel setting. Switching schemes must visibly affect the colors assigned to those roles.

**No hardcoded colors (mandatory).** Never write a design color literal in Liquid, CSS, or JavaScript — e.g. `color: #EA3A79;`, `background-color: #26B3D0;`, `border-color: #4E6E70;`, `color: rgb(38, 56, 58);`, `rgba(...)` fills, or a hex inside a JS string. Allowed without a setting: `transparent`, `currentColor`, `inherit`, and values derived from scheme/setting variables (e.g. `rgb(var(--color-foreground) / .75)`, `color-mix(in srgb, var(--ayum-x) 75%, transparent)`). A Figma value may appear **only** as the `default` of a schema setting (or in a section/block preset).

**Emitting a setting.** Expose each setting as a scoped CSS custom property and consume it from the section stylesheet:

```liquid
{%- style -%}
  #shopify-section-{{ section.id }} .ayum-section {
    --ayum-accent: {{ section.settings.ayum_accent.rgb }};   /* triplet: use rgb(var(--ayum-accent) / a) */
  }
{%- endstyle -%}
```

```css
.ayum-section .ayum-button { background-color: rgb(var(--ayum-accent)); }
```

A `style="--ayum-accent: …"` attribute on the wrapper (or on a block element for per-block colors) is equally valid. Only setting-driven **custom properties** go inline; no static rules. Prefer `.rgb` triplets so values compose with the theme's `rgb(var(--x) / alpha)` pattern. When a native scheme variable exists, consume it directly instead of minting a new `--ayum-*` property.

**Never** edit a shared color scheme, change global scheme definitions to suit one section, or hand-edit `config/settings_data.json` (schemes live there and only the merchant creates/edits them in the Theme Editor). Never scatter static design colors across CSS files.

**Legacy note:** AYUM sections implemented before this rule may contain literal colors in `assets/dev1.css`. Do not copy them as a pattern. Migrate them only when a task touches that section (or the user asks), using the ladder above. Switching to the correct scheme variables may change rendered colors until the merchant configures the assigned scheme; do not add redundant color pickers simply to preserve old literal values. Record old rendered/Figma colors and specify which scheme fields to configure. Before retiring an obsolete setting, inspect existing template and section-group saved data and preserve merchant values.

### 2.9 Naming conventions for AYUM

- Use a `ayum` / `ay` marker for new AYUM-specific sections, blocks, snippets, assets, custom elements, and scope classes **only when a project-specific marker is actually needed**.
- Prefer clear names such as `ayum-hero`, `ayum-featured-products`, `ayum-icon-grid`, `ayum-testimonials`, or a collision-free `hdt-ay*` component prefix.
- **Pick a unique prefix and check it does not collide with an existing `hdt-` class or custom element before using it.**
- Do not carry previous-project-specific names (`truecare-*`, `hdt-tc*`, `_tc-*`) into AYUM unless they already exist in the AYUM repository for a verified reason.
- **Never** use vague names such as `custom-section`, `new-section`, `test-section`, `section-1`.


### 2.10 Product cards

- Dispatcher: `section.settings.product_des` / `block.settings.product_des` selects `snippets/card-product{N}.liquid` (plus `card-product-list`, `card-product-discount1..3`). `card-product1` is the default and is rendered directly by many surfaces.
- **Never assume a product-card style number from the previous project.** Re-verify all existing `card-product*.liquid` files and the exact AYUM dispatcher/selector before choosing a number; never reuse an occupied value or infer the next number from another card system.
- **Numbering is local to the specific dispatcher or selector.** Never assume the next number; never infer it from another card system; never reuse an occupied value; never hijack an existing style.
- Shared sub-snippets affect **every** card: `card-product-media`, `card-price` (→ `price.liquid`), `badges`, `color-list`, `hdt-pr-card-rating` (a **0-byte reviews hook** — if ratings render nothing, that is why).
- Choose the closest existing card by **real markup and behavior**, not appearance alone.

### 2.11 Money, cart, variants

- Three canonical price snippets by surface: `snippets/price.liquid` (PDP/quick-view, variant-reactive), `snippets/card-price.liquid` (cards), `snippets/line-item-price.liquid` (cart/order lines). Reuse one; **do not add a fourth**.
- Render money only from authoritative raw values: Liquid `| money` / `| money_with_currency` on `variant.price`, `line_item.final_price`, `cart.total_price`, …; JS `formatMoney(cents, format)` fed raw integer cents. **Never parse a number out of formatted price text. Never compute totals/tax/discounts client-side.** Shopify owns cart contents, prices, taxes, discounts, and checkout.
- Cart mutations go through the AJAX + Section-Rendering + event-bus flow (`cart/add.js|change|update` with a `sections:` param, then a typed `Cart*Event`). Reuse `<hdt-cart-drawer>` / `<cart-items-component>` / `<hdt-line-item>` / `<hdt-quantity-wrapp>`; do not hand-roll cart fetches or mutate cart DOM outside this flow.

### 2.12 Sliders

- Existing custom elements: `<hdt-slider>` (primary, ~50 usages), `<hdt-slideshow>`, `<hdt-slider-thumb>`, `<hdt-slider-counter>`, `<hdt-slider-sync>`, `<hdt-scrollsnap>`, `<hdt-marquee>` — all defined in generated `assets/global.min.js` / `libs.min.js`. **Do not add a second slider library.**

### 2.13 Integrations and data

- Theme metafields: `metafields.theme.*` (brand, countdown, category_image, product_stock, custom_badges, label, …), `metafields.home.menu`, `metafields.ecomrise.colors`. Reference by exact `namespace.key`, confirm usage by grepping theme code — **not** by trusting `.shopify/metafields.json` (git-ignored per-developer CLI cache). Guard every metafield read for the absent case.
- Integrations: ecomrise (wishlist/compare/swatches, dual-mode with `localStorage`), Appstle Subscriptions (`selling_plan`), Google Shopping feed, `@app` blocks in 8 sections. App markup/state is **not** theme-owned — preserve the extension points, do not restyle or rewire.
- **Reviews are unresolved** (`hdt-pr-card-rating.liquid` / `hdt-pr-single-rating.liquid` are 0-byte hooks; Ryviu is commented out). Anything depending on real ratings/reviews is **blocked** until the merchant names the app.
- **The4 license/activation** (`purchase_code` in `settings_schema.json` + the design-mode block in `custom.js`) must be left intact — never hardcode, regenerate, strip, relocate, or log it.

---

## 3. Figma MCP inspection rules

Before writing any code for a section, inspect the **exact** desktop node and the **exact** mobile node with Figma MCP. Use `get_metadata` for structure, `get_design_context` for real properties, `get_variable_defs` for tokens, and `get_screenshot` for visual confirmation only.

Inspect, where available:

- Auto Layout direction · Auto Layout gap · padding
- width and height behavior · fixed, hug, or fill sizing · min/max dimensions
- constraints · alignment
- component structure · component variants
- variables · design tokens
- typography styles · font size · font weight · line height · letter spacing · text alignment
- colors · opacity · fills · gradients
- borders · corner radius · shadows · effects
- image cropping · image fit · object position
- desktop/mobile differences · hidden layers
- decorative assets · exportable assets

**Codex must not infer exact values by visually measuring screenshots when node data is available.** Screenshots confirm overall appearance *after* the real node values have been read.

Practical notes for the AYUM Figma file (`7cOVp6r92Z3heL1aTMP5N3`):

- Full-page desktop context: `2001:3` — https://www.figma.com/design/7cOVp6r92Z3heL1aTMP5N3/Ayum--Copy-autolayout?node-id=2001-3&t=xvA1tZ1dkOjKjKcf-0
- Full-page mobile context: `2001:581` — https://www.figma.com/design/7cOVp6r92Z3heL1aTMP5N3/Ayum--Copy-autolayout?node-id=2001-581&t=xvA1tZ1dkOjKjKcf-0
- These two links are **page-level context only**. For implementation, Codex must still inspect and use the exact desktop/mobile node IDs for the single target section, per the source-of-truth rules above.
- Do not carry any old previous-project frame IDs, draft/duplicate-node warnings, or node maps into AYUM. Build the AYUM node map from this Figma file and record verified section nodes in `AYUM_PROJECT_PLAN.md`.
- If a large-node metadata call exceeds the token limit, query the section's own node instead of repeatedly requesting the whole page.
- **Figma asset URLs are short-lived and must never reach a production file.** Do not paste a `figma.com` or `api/mcp/asset` URL into Liquid, CSS, JS, or template JSON. If an icon or decorative glyph is needed, download it once and store/transcribe it locally using the project's established asset pattern. Never store a large raw SVG string inside `templates/*.json`.

---

## 4. Project inspection before coding

A pre-implementation inspection is **required before every section task**. Inspect:

- the target template · the template JSON · the section currently used there
- the closest existing section · relevant blocks · relevant snippets
- relevant CSS files · relevant JavaScript · existing custom elements · existing assets
- existing schema settings · existing naming conventions · existing utility classes
- the theme's **color schemes** and the base section's color controls (`colors_by_section`, `color_scheme`, `background_opacity`, `text_color` selects, button styles, block color settings) — per §2.8
- existing Theme Editor settings for every other design property the Figma node defines (spacing, layout, image ratio, radius, card spacing, alignment, slider options) — per §5.2
- existing responsive conventions · existing RTL conventions
- the existing slider/carousel implementation
- existing Theme Editor behavior · existing merchant data
- any manually added project changes

Also confirm the **active code path**. This theme ships near-duplicate and legacy files (`custom-section.liquid` is active; `custom_section.liquid` is orphaned legacy; there are three predictive-search variants; 13+ product-card variants). Grep `templates/` and `sections/*-group.json` for the exact `"type"` / render call before editing anything.

Identify the **closest existing project implementation** before creating a new custom solution, and explain what can be reused and why.

### 4.1 Required pre-implementation report

Produce this **before editing**, unless the user explicitly requests immediate implementation without a report.

1. **Files inspected** — each file and why it matters.
2. **Relevant existing architecture** — verified render path, blocks, styles, scripts, schema, data sources, integration points.
3. **Closest native Kalles section / block / snippet** — whether it can be used unchanged or needs an isolated AYUM copy; identify reused unchanged dependencies and justify the boundaries.
4. **Proposed files to modify.**
5. **Proposed schema changes.**
5a. **Color & settings mapping** — the color schemes inspected; for each Figma color role, the scheme variable or native setting reused, or the new AYUM setting proposed (id, type, label, Figma default) and why no native source fits; the same for non-color design properties (§5.2).
6. **Proposed CSS scope** (the exact scope class / `section.id` selector and the exact stylesheet file).
7. **Proposed JavaScript changes, if any** — including why HTML/CSS cannot do it.
8. **Data-preservation considerations** — which setting IDs, block types, and saved template instances are at risk.
9. **Risks** — regression, saved data, lifecycle, responsive, RTL, localization, a11y, performance, app compatibility.
10. **Out-of-scope areas** — explicitly listed.
11. **Unanswered questions that materially affect implementation.**

**Ask the user only about details that cannot be safely resolved by inspecting the codebase or Figma.** Do not ask questions answerable from project files, Figma MCP, existing templates, or existing Theme Editor schema. Otherwise proceed with a clearly stated, low-risk assumption.

---

## 5. Native-Kalles-first, isolated-AYUM implementation strategy (permanent)

**AYUM-specific overriding requirement:** Inspect and reuse the closest native Kalles implementation as the foundation, but **never modify an original Kalles section file for AYUM-specific work**. This holds even for a minimal CSS/schema change or an otherwise inert new option. The original section must remain available and fully functional, without AYUM-specific alterations.

Decision order for each requested section:

1. Inspect the closest native Kalles section, blocks, snippets, schema, CSS, JS, and real template instances.
2. When the original already achieves the requested design **without any source-file changes**, it may be used as-is and configured through its existing Theme Editor settings. Do not mutate its source.
3. First test whether existing Kalles settings, blocks, tokens and section-instance-scoped CSS can reproduce the design without native source edits. **Only when a native source change is genuinely unavoidable**, use one isolated AYUM copy of the closest native section (or the existing AYUM copy if already present). Adding a new schema setting, Liquid hook or `custom_class` to the original is prohibited. No automatic duplication for CSS-only adjustments.
4. Preserve native behavior in the AYUM copy: use existing Kalles settings, tokens, color schemes, utilities, CSS patterns, blocks and integrations before adding new controls or implementation logic.
5. Refer to unchanged native snippets, blocks, scripts and styles when they already behave correctly. If a shared block/snippet/component itself needs AYUM-specific source changes, make an AYUM-specific copy and update only AYUM call sites/references; do not edit the shared original. Avoid unnecessary copies of untouched dependencies.
6. Create an entirely new section without a native base **only when no suitable existing Kalles section exists**, and explain the inspection evidence.

**Isolation is mandatory; needless duplication of sections or dependencies is not.** Use native Kalles directly when no source edit is needed; duplicate the *section file* only when customization requires source edits, and do not automatically duplicate every block, snippet, CSS/JS asset, or helper. A stylesheet or script specifically for the AYUM copy may be created if needed, with unique selectors/names and no effect on native instances.

**Never modify for AYUM-specific design work:** original Kalles `sections/*.liquid` files, original shared `blocks/*.liquid` and `snippets/*.liquid` behavior, original vendor/global CSS/JS, or native presets. Do not insert an AYUM condition, custom class, new setting, or harmless-looking opt-in inside a native original. If a shared dependency needs a change, isolate it first. Changes to AYUM-owned files are permitted within the requested task scope.

If a task is targeting an **already-existing AYUM section**, update that isolated section in place with the smallest safe fix; do not create a second duplicate or rebuild it. Existing instance settings and merchant data remain authoritative.

Before implementation, identify: (a) the native Kalles baseline, (b) why it can/cannot be used unchanged, (c) the AYUM copy to use or create, (d) which dependencies are reusable unchanged, and (e) the exact file boundaries that protect the original.

### 5.1 Isolation and minimal-change architecture (permanent rule)

- Native Kalles originals are **read-only implementation references** for AYUM design changes.
- Reuse existing settings and platform behavior before inventing new versions.
- Modify existing AYUM-owned code in place when appropriate.
- For new customized sections, create the minimum required AYUM section copy; do not reimplement its functionality from scratch.
- For a dependent native block/snippet requiring modification, duplicate only that dependency and rewire only the AYUM copy.
- Do not edit shared Kalles assets to load AYUM styling: load the AYUM-only stylesheet from the AYUM section when necessary.
- Preserve the original section schema, presets, settings and all current usages unchanged. The AYUM copy should preserve useful native schema/settings/blocks and may add settings without losing existing behavior.
- Before creating additional files beyond the isolated section, explain their necessity and why existing unchanged dependencies cannot be reused.
- Avoid over-engineering, unnecessary duplicate assets, extra slider libraries, and broad/global overrides.

This policy **supersedes any generic reuse/extend recommendation elsewhere in this skill that would modify original Kalles files**. For example, a generally safe additive setting to a shared Kalles file is **not allowed** for AYUM-specific needs; add it to the AYUM copy instead.

### 5.2 Existing-setting-first for design properties (permanent rule)

The reuse ladder applies to **settings**, not only files. For every design property the Figma node defines, take the first source that can express it:

1. An existing **native Kalles setting** on the section or its blocks, configured to the Figma value in the instance (template JSON) or preset. Examples: section spacing (`mg`/`mg_mb`/`pd`/`pd_mb` via `spacing-vars`), layout (`section_layout`, `col_dk`/`col_tb`/`col_mb`, `layout_mode`), image ratio (`image_ratio`, `image_size`), card spacing (`space_items`), heading alignment and spacing (`section-heading` `alignment`/`margin_bottom`), heading size (`h_custom` + `font_size_heading_lg`/`font_size_heading`), button styling (`button_custom` sizes/colors/radius), slider options (`loop`, `autoplay`, `navUI`, `dotUI`, `pag_*`, `nav_*`), colors (§2.8).
2. A **theme token** (`--radius-*`, `--spacing-*`, `--font-*`, scheme variables) when the property is global by nature.
3. A **new, meaningful merchant-facing setting on the isolated AYUM section/block**, with the Figma value as its `default`, consumed dynamically through Liquid and scoped CSS — never a hardcoded value in its place.

Rules:

- Never add a setting that duplicates one Kalles already provides.
- Add settings only where merchant control is meaningful (colors, sizes a merchant would tune, show/hide, labels, layout choices). Do not expose internal implementation details (selector geometry, slide-size math, z-indexes, reveal tweaks); those may stay as scoped CSS constants, documented with the Figma source they come from.
- A new setting's default must reproduce the Figma design exactly, and changing it in the Theme Editor must visibly change the result. Verify both.
- New controls live only in the isolated AYUM copy; the original Kalles section, its blocks, and its presets stay unchanged and keep working independently.
- When a native setting's range/step cannot hold the Figma value (e.g. a step-2 range for 13px), say so, prefer a new AYUM setting over a hidden CSS override, and record the decision.

---

An isolated AYUM section copy is required whenever the closest native Kalles section needs AYUM-specific source edits, regardless of whether the change would regress existing instances. For an already isolated AYUM section, prefer an in-place scoped change instead of a second copy. Always reuse the theme's conventions inside the AYUM file — `spacing-vars`, `image_tag`/`image_url`, `placeholder_svg_tag`, color schemes, `hdt-container`, blocks lifecycle, font/color tokens — and leave every shared file untouched.

---

### 5.3 Completed homepage native-first audit and controlled migration

When asked to review completed AYUM homepage sections for unnecessary duplicates:

1. **Audit first; no edits.** Inventory `templates/index.json` and every referenced active section, nested block, snippet, stylesheet, script and saved setting; do not conflate `sections/*-group.json` shared components with homepage content.
2. For EACH AYUM section identify the nearest **original** Kalles section and native block types from actual files; compare schema IDs, options, nesting and functionality, not only visual similarity.
3. Categorize as **Native-ready**, **Retain AYUM copy** (new source-level controls needed), or **Needs verification**; describe exact capability gaps. `custom_class` alone cannot justify modifying the original; use a Shopify instance ID or existing hook when appropriate.
4. Record the existing merchant-selected color scheme **by actual ID**, every color/settings value, merchant content and effective layout; never silently switch schemes or discard new AYUM capabilities to fit native settings.
5. For Native-ready sections produce a mapping of old → native `type`, section settings, `blocks`/`block_order`, static/nested blocks, stylesheet hooks and interactive behavior. Clearly flag unmappable fields. Provide baseline-and-post-migration screenshots and functional verification plan, rollback plan and dependencies.
6. **Approval required before changing `index.json`** or removing a section, even when migration appears straightforward. Migrate just one section per approved phase; keep the previous AYUM implementation available for rollback until approved and verified.
7. If the current storefront/Theme Editor data is newer than local template JSON, do not overwrite it or run `shopify theme pull` without explicit authorization. Require fresh, verifiable data before attempting any write.
8. Do not infer successful pixel equivalence from schema parsing or static lint. Fail closed: retain the configured AYUM section when in doubt.

---

## 6. Custom class setting rule (permanent)

**Every new AYUM-owned reusable section requiring source customization should have an instance-specific custom class setting** unless:

- the section already has an equivalent setting, or
- the section is internal and cannot have schema, or
- adding it would break a strict framework contract, or
- there is a clearly documented technical reason not to add it.

When no equivalent exists **in an AYUM-owned section**, add a text setting like:

```json
{
  "type": "text",
  "id": "custom_class",
  "label": "Custom CSS class"
}
```

Apply the value safely to the **outermost stable section wrapper**. Requirements:

- preserve all existing wrapper classes
- do not replace native section identifiers
- do not use the merchant-entered class as an HTML `id`
- escape/sanitize the value appropriately for a class attribute
- do not render malformed whitespace
- do not render an unnecessary empty class fragment (guard with `{% if section.settings.custom_class != blank %}`)
- do not rename an existing equivalent setting
- reuse the existing setting if the project already provides one

The purpose is to let each section **instance** be targeted without editing Liquid again.

**Native exemption:** An untouched native Kalles section does NOT need to gain a `custom_class` setting. Never duplicate or edit original Kalles solely to satisfy this convention. Prefer an existing native setting or the instance-specific Shopify wrapper for CSS isolation.

**AYUM requirement:** inspect the current repository for an equivalent `custom_class` setting before adding one. Reuse an existing equivalent; do not copy previous-project-specific class names, stylesheet names, or section-instance values.

**In addition to the merchant custom class, implementation-specific CSS must still use a stable, unique project scope class (or `#shopify-section-{{ section.id }}`) where required.** Do not rely only on a merchant-entered class for internal implementation styling when that would make the section fragile — a merchant can clear or retype it.

Hard-won lesson (verified in this repo): **never put a layout-affecting box property on the height-observed sticky-header element.** A `border-bottom` on `<hdt-sticky-header>` fed the theme's `ResizeObserver` → `--header-height` feedback loop and inflated the header toward viewport height. Use `box-shadow: inset …` for hairlines on observed elements.

---

## 7. Preservation rules

When reusing, extending, or duplicating an existing section, block, or snippet, **preserve**:

- all existing schema settings · all existing block types · all existing setting IDs
- existing option values · presets · default values (unless intentionally adding a new default)
- existing section functionality · product and variant behavior · AJAX behavior
- cart drawer integration · slider behavior · Theme Editor reload behavior
- localization behavior · accessibility behavior
- merchant Customizer data · template JSON data
- selected products · selected collections · images · videos · links
- manually configured blocks · manually added code (unless the user explicitly asks to replace it)

And:

- **Never casually rename a setting ID.** Setting `id`s, block `type`s (filenames), event-name constants, and CSS token names are an **append-only contract** with `config/settings_data.json`, `templates/*.json`, `sections/*-group.json`, and cross-asset imports. Renaming silently drops the merchant's saved value or breaks imports.
- Never delete settings because the current design does not use them.
- Never simplify a duplicated base by removing controls.
- Add new capabilities **beside** existing capabilities.
- Never reset a section instance to preset/default data.
- Never rewrite template JSON in a way that discards merchant content.
- Never remove unrelated JSON section entries or reorder unrelated sections.

Editor JSON (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`) is **data, not source** — it carries an auto-generated banner and is rewritten by the Theme Editor. Change behavior in `.liquid` + `{% schema %}` defaults/presets. Touch template JSON only to wire or seed a section instance, and keep it strictly valid. **Never hand-edit `config/settings_data.json`.**

When inserting a section into a template's `order`, preserve every other key, setting, block, and order entry **byte-for-byte**, and state in the report where the new entry landed and what shifted.

---

## 8. Shopify Theme Editor and schema

All merchant-managed content should remain editable where practical: headings · descriptions · labels · buttons · links · images · desktop images · mobile images · icons · videos · video posters · products · collections · repeated cards · colors · backgrounds · alignment · layout options · section spacing · content width · visibility options.

Schema rules:

- keep JSON valid (a stray comma breaks the whole page/template)
- preserve existing IDs, settings, blocks, presets
- keep labels clear; keep section and block names within Shopify limits; avoid unnecessarily long labels
- avoid duplicate IDs
- ensure empty settings do not create broken markup
- use sensible defaults
- avoid hardcoding merchant content
- use blocks for repeatable content where appropriate
- use `image_picker` instead of hardcoded final images
- use Shopify video / video-URL settings where appropriate
- use product and collection pickers where appropriate — the picker is authoritative for title and URL (do not add a parallel manual title/link setting that can drift)
- every section needs a **valid preset**, and the section must render sanely with the preset's defaults
- design-property settings follow §2.8 (colors) and §5.2 (everything else): reuse native settings first; add new ones only to the isolated AYUM file, with Shopify-supported types (`color` — with `"alpha": true` when transparency is needed — `color_scheme`, `range`, `select`, `checkbox`, `text`), clear labels, and the Figma value as the `default`
- group added design controls under a descriptive `header` and keep their ids prefixed (e.g. `ayum_*`) so they never collide with native ids

**Localization:** merchant-entered content from the Theme Editor does **not** automatically require locale keys. Reusable interface strings added by the theme should use locale keys where appropriate (`{{ 'ns.key' | t }}` from `locales/*.json`; add to `en.default.json` first, then mirror into `ar.json` and peers with an identical JSON path — a key missing from a peer silently falls back to English; a key added only to a non-default locale never appears). Do not add locale keys for content the merchant directly edits unless the project architecture specifically requires it.

**Schema labels:** the shipped Kalles sections use `"t:"` keys resolved from `locales/*.schema.json`. For AYUM, inspect the current locale/schema files before choosing plain labels vs `"t:"` keys. Match whatever the file you are editing already does, and never mix in a `t:` key that does not exist.

---

## 9. CSS rules

Before editing CSS, inspect the project and identify the correct stylesheet for the target page or component. Codex must:

- confirm the stylesheet is actually loaded on the target template
- use the correct page-specific or component-specific file
- avoid global theme CSS when a scoped project file is available
- **never edit minified CSS**, and never hand-edit `assets/base.css` or `assets/theme.css`
- never place product-page CSS in a collection-only file
- never place collection-page CSS in a homepage-only file
- never use broad selectors that affect unrelated sections
- scope new CSS under a stable unique parent class (or `#shopify-section-{{ section.id }}`)
- preserve native utility classes
- use logical properties where possible
- avoid unnecessary `!important`; explain any that is required
- avoid high-specificity selector chains unless necessary (prefer winning on specificity honestly, e.g. `.ayum-header .hdt-container`, over `!important`)
- avoid brittle `nth-child` selectors when semantic classes can be added safely
- avoid styles dependent on specific Theme Editor block order unless the design intentionally requires that order

**Where CSS goes in this project:**

| Need | Location |
| --- | --- |
| Instance-specific values that need Liquid (colors/sizes from settings, gated logic) | setting-driven **custom properties only**, in an inline `{% style %}` scoped to `#shopify-section-{{ section.id }}` (or a `style="--x: …"` attribute on the wrapper/block); the rules that consume them live in the section stylesheet |
| AYUM Dev1 section rules | `assets/dev1.css`, every selector under the section's scope class |
| Rules shared by every instance of a section | that section's own external asset stylesheet, loaded at the **top** of the section file |
| Rules gated to one AYUM instance of a **shared** section | a dedicated asset (e.g. `ayum-<thing>.css`) loaded conditionally on `custom_class contains '…'`, every selector prefixed with that class |
| Cross-page override keyed to a custom class | `assets/custom-general.css` |
| Truly global rule | a token in `css-variables.liquid` — **never** a section file, never `base.css` |

**Colors and design values (mandatory, see §2.8 and §5.2):** no color literal in CSS — every color comes from a color-scheme variable, a native setting, or an AYUM setting exposed as a custom property. Emit color settings as `{{ setting.rgb }}` and consume them as `rgb(var(--x))` / `rgb(var(--x) / a)`. Never hardcode spacing, radius, or width where a token or a native setting exists; keep unavoidable implementation constants scoped and commented with their Figma source. Never change global scheme definitions or `css-variables.liquid` to match one section.

---

## 10. Section architecture

Every section should:

- have one stable outer wrapper
- preserve Shopify's section identity (`#shopify-section-{{ section.id }}`, `shopify_attributes` on blocks)
- support the custom class setting rule (§6)
- avoid broken output when optional settings are empty
- avoid unnecessary empty containers
- preserve semantic heading order
- use accessible buttons and links
- use responsive images (`image_tag` / `image_url` with `widths`/`sizes`, explicit `width`/`height`)
- use alt text correctly
- use lazy loading where appropriate
- avoid layout shift where practical
- remain functional in the Theme Editor
- remain functional when blocks are added, removed, or reordered
- avoid hard dependencies on preset block IDs
- support fallback behavior for missing mobile assets
- support merchant content without requiring code edits

Do not automatically add settings that add no merchant value. Where appropriate, reusable sections should support: section top/bottom spacing · desktop/mobile spacing · background color · background image · content width · alignment · desktop/mobile visibility · heading/content controls.

**Do not build a large generic settings framework onto every section — this theme already handles most of it globally.** Use the shared Kalles scaffold instead of inventing spacing settings: `section_layout` select (`container` / `wrapper_container` / `full_width` → `hdt-container*` classes), text `mg` / `mg_mb` / `pd` / `pd_mb` consumed via `{% render 'spacing-vars', box: section %}` inside a `{% style %}` block (CSVs are `top,right,bottom,left`), optional `colors_by_section` + `color_scheme`, `background_opacity`, `section_background`.

Blank states are part of the deliverable. Decide and implement explicitly: what renders when a picker is empty, in the **Theme Editor** (`request.design_mode` → onboarding placeholder) vs the **live storefront** (often: hide the section entirely rather than render a broken link/price/image).

---

## 11. Image and asset rules

- **Do not hardcode final Figma images into Liquid.** Prefer `image_picker` → product images → collection images → metaobjects/metafields → theme assets only when explicitly required.
- Where a design has separate desktop and mobile images: add both settings when appropriate, treat mobile as an **override**, and fall back to desktop when mobile is empty (`<picture>` with `<source media="(max-width: 767px)">`, or `image_mb | default: image` as the shipped `_slide-item` block does).
- Provide a placeholder path (`placeholder_svg_tag`) so a blank picker never renders a broken image.
- Inspect the Figma asset structure and export settings before adding assets. Do not export elements that can be created cleanly with CSS.
- Decorative shapes may use pseudo-elements when appropriate. Decorative elements must not block interaction — use `pointer-events: none`, and `aria-hidden="true"` where they carry no meaning.
- Do not use CSS backgrounds for meaningful content images that require alt text.
- Never commit a Figma MCP asset URL (see §3).

---

## 12. Slider and carousel rules

Before modifying or creating a slider, inspect: the project's existing slider library · its DOM contract · initialization · custom elements · data attributes · responsive settings · navigation · pagination · Theme Editor reinitialization · destroy/rebuild behavior.

Preserve: drag · swipe · keyboard behavior where supported · navigation · pagination · resize behavior · dynamic block changes · Theme Editor section reload.

- **Do not replace the native slider with a new library** unless there is a strong documented reason. There is no second slider library in this theme and there must not be one.
- Do not create fake static card widths that only match one viewport.
- Do not override internal slider variables without inspecting how the project uses them.
- If a **partial next card** ("peek") is required, achieve it through the existing slider system safely (precedent: a scoped `.hdt-slider__slide { flex: 0 0 43% }` under the section's own class on mobile, letting the native RTL-aware slider place the peek on the correct edge).
- **Do not convert a static Figma grid into a slider unless explicitly required. Do not convert a slider into a static grid unless explicitly required.**
- Do not globally restyle dots or arrows. Scope all slider appearance changes to the section.
- Reuse the native arrow/dot **elements** (semantics, `aria-*`, `disabled` at the ends, keyboard, RTL chevron flip) and change only their appearance.
- Dot and arrow colors (inactive, active, hover, disabled) follow §2.8: set the native `--pag-*` / `--nav-*` variables from scheme variables or AYUM color settings — never from color literals. Sizes/spacing come from native settings first (`pag_space`, `pag_mgt`, `nav_size`, …), per §5.2.
- Slide counts come from `col_dk` / `col_tb` / `col_mb` at the 768/1150 breakpoints — do not invent per-viewport widths.
- Sliders re-init on `shopify:section:load`; keep initialization idempotent and never double-initialize.

---

## 13. Product card rules

If the task involves product cards, inspect: all relevant existing product-card snippets · product-card style dispatchers · schema options · Theme Editor selectors · homepage card systems · collection card systems · search card systems · related-product cards · quick view · wishlist · compare · ratings · badges · swatches · price · compare-at price · sold-out state · choose-options behavior · add-to-cart behavior · AJAX/cart-drawer integration.

- **Never assume the next product card number.** Numbering is local to the specific dispatcher or selector. Before adding a new style: inspect all existing options in AYUM, find the next free value **in that exact system**, do not reuse an occupied value, do not infer the number from another card system, and do not hijack an existing style.
- Register a new style only in the AYUM dispatcher(s) that actually need to offer it. Register the `when` branch(es) **and** the `product_des` select option, and load any card-specific CSS conditionally.
- Choose the closest existing card based on **real markup and behavior**, not just appearance.
- Preserve all native card functionality.
- If the native add-to-cart location differs from Figma, **reuse and reposition the native behavior** (`snippets/btn-ultra.liquid` and its quick-add / choose-options / sold-out paths) rather than replacing it with a weaker custom button. Extend it with an **optional** additive param (e.g. an `add_label` defaulting to the native key) so existing call sites are unaffected.
- **Do not globally clamp all product titles.** Any title clamp must be scoped to the custom card/section and use selectors that match the real DOM.
- Keep all card variants composing the shared sub-snippets so badges/price/rating stay uniform. A change to a shared sub-snippet affects **every** card — verify each variant still composes.

---

## 14. Video rules

Inspect existing project video implementations before creating custom JavaScript. Preserve: native video settings · video poster · play-button behavior · pause behavior · accessibility · mobile behavior · Theme Editor behavior.

- **Do not autoplay unless explicitly required.**
- Do not call `video.play()` on page load unless explicitly requested.
- Do not create a decorative play button that has no functionality.
- Avoid adding a custom media player when the project already has a working implementation (`sections/product-video.liquid` and the native media components exist).

---

## 15. JavaScript rules

**Do not add JavaScript when HTML/CSS or the existing component system can handle the task.** AYUM sections should ship with **zero** new JS whenever HTML/CSS or the existing component system is sufficient.

When JavaScript is genuinely required:

- use existing project patterns (a small isolated Web Component in its own `assets/*.js`, loaded `defer`)
- avoid global listeners when section-scoped listeners are possible; no `document`-level state
- avoid duplicate initialization — guard `customElements.define`
- support Theme Editor section load/unload events; make `connectedCallback` resilient (rAF retry until children are parsed) and idempotent
- clean up event listeners, observers, timers, and rAF handles in `disconnectedCallback`; prevent memory leaks
- use progressive enhancement — the section must render sanely with JS disabled
- preserve keyboard accessibility
- avoid blocking rendering — **never load a component script with a parser-blocking `script_tag` immediately before its element** (verified failure: the element upgraded mid-parse, `connectedCallback` found no children, and the listener was never bound). Use `<script src="…" defer>`.
- avoid unnecessary dependencies; never introduce a library for one section
- **never edit minified JavaScript**
- do not create global variable collisions — check the element name is not already registered (`grep customElements.define` across `assets/*.js` and the minified bundles)
- import shared helpers from `@theme/utilities` rather than reimplementing them

**Do not rewrite working JavaScript for a visual-only change.**

---

## 16. Accessibility

Preserve or improve: semantic HTML · heading hierarchy · link/button semantics · alt text · keyboard interaction · focus states · visible focus · `aria-label`s where needed · slider controls · video controls · form labels · reduced-motion behavior where relevant · readable text contrast.

- Do not use a `div` as a button when a `button` is appropriate.
- Do not remove screen-reader text (`sr-only`, `aria-*`) from native functionality.
- Do not hide meaningful content only visually without considering accessibility.
- Decorative SVG/icons: `aria-hidden="true"`, empty `alt`, `pointer-events: none`.
- Duplicated visual content (e.g. a marquee's second track) must be `aria-hidden` and must **not** carry `block.shopify_attributes` — only the real, editor-selectable copy does.
- Respect `prefers-reduced-motion` for any animation, and provide a genuinely static fallback (not a scrollable one).
- Preserve focus management in dialog/drawer components (derived from `DialogComponent` / `DrawerComponent`).

---

## 17. Performance

Prefer: existing assets · responsive images · Shopify image filters · appropriate image widths · lazy loading below the fold · minimal JavaScript · minimal DOM duplication · scoped CSS · reusable snippets where justified. Reuse `fetchCache`, `debounce`, `throttle`, `requestIdleCallback` from `utilities.js`.

Avoid: huge hardcoded images · unnecessary duplicate mobile and desktop markup · layout-shifting images without dimensions/aspect ratio · loading new libraries for one section · large inline scripts · repeated Liquid loops over the same data without need · eagerly loading section CSS globally.

Do not sacrifice correctness for premature micro-optimization.

---

## 18. Page-specific isolation

Every task prompt must identify out-of-scope areas.

**Homepage task:** do not touch product pages · do not touch collection pages · do not touch unrelated homepage sections.

**Product-page task:** do not touch the main product form · variant selection · price · quantity · gallery behavior · add-to-cart — unless explicitly in scope.

**Collection-page task:** do not touch filters · sorting · search · pagination · grid/list controls · the collection heading — unless explicitly in scope.

Shared global areas (announcement bar, header, footer, cart drawer, mobile toolbar) appear on **all** pages — a change there is a cross-page change. Treat it as its own task, scope it with a custom class, and verify it did not alter other pages or other instances of the same section.

---

## 19. Manual changes and merchant data

If the user says manual changes have already been made:

- inspect them first
- preserve them
- do not reset the file to an older base
- do not overwrite JSON settings
- do not remove configured content
- refactor only when necessary
- explain the reason before broad structural changes

**Assume project files may contain important manual modifications even when they differ from the original theme.** Do not replace a modified file with a clean vendor version. Theme JSON is also round-tripped by `shopify theme pull` — the template you read may differ from what the plan's log describes; trust the current file and note the drift.

---

## 20. Follow-up and bugfix workflow

For a follow-up fix:

- **diagnose the root cause first** — do not patch symptoms
- do not rewrite the whole section
- preserve the current implementation
- make the smallest safe fix
- touch the fewest files and lines
- keep CSS under the existing scope
- preserve settings, IDs, blocks, and merchant data
- verify desktop and mobile
- verify that one breakpoint fix does not regress another
- do not touch unrelated sections
- do not run broad refactors
- do not introduce new breakpoints, hardcoded values, or new event systems

The follow-up report must include: **root cause · exact fix · files changed · behavior preserved · responsive checks · Theme Editor checks · any remaining limitation.** Append it to the section's existing entry in the project plan's implementation log rather than creating a new section entry.

---

## 21. Validation

There is **no build, unit test, or repo-scripted lint** in this project. Validate with lightweight targeted checks and report exactly what ran.

Before claiming completion, verify:

- correct Figma desktop node was inspected
- correct Figma mobile node was inspected
- Figma values came from node data where available
- correct template was edited
- correct section instance was targeted
- correct CSS file was used
- CSS is scoped
- custom class setting exists on an AYUM-owned customized section, or native Kalles is kept untouched and a stable instance-scoped hook is used
- color schemes were inspected; every rendered color comes from a scheme variable, a native setting, or an AYUM setting (no color literals added)
- native settings were reused for colors and other design properties wherever they could express the design; no duplicate settings were added
- each new AYUM setting defaults to the Figma value and, when changed, visibly changes the result (and the original Kalles section is unaffected)
- existing settings were preserved
- existing blocks were preserved
- existing IDs were preserved
- merchant data was preserved
- no unrelated sections changed
- no original native Kalles section/block/snippet source was changed for AYUM-specific implementation; any customized section uses an isolated AYUM copy
- desktop matches Figma
- mobile matches Figma
- tablet behavior is safe
- behavior at the wide end of the desktop tier is safe
- RTL/LTR behavior is safe
- slider behavior still works
- product behavior still works
- video behavior still works
- Theme Editor reload works
- optional empty settings do not break markup
- schema JSON is valid
- Liquid syntax is valid (`{% style %}` / `{% schema %}` / `{% content_for %}` tags balanced)
- JavaScript has no obvious syntax errors
- no minified files were edited
- no unnecessary new library was introduced
- no `figma.com` / `api/mcp/asset` URL appears in any production file
- `assets/base.css`, `assets/theme.css`, `assets/*.min.js`, and `config/settings_data.json` are unchanged
- the diff is limited to the intended files

Practical checks that work here: JSON parse of every edited `{% schema %}` and template JSON; brace/tag balance; `git diff --stat` to confirm scope; grep for physical `left`/`right` in new CSS; grep for `var(--color-` not wrapped in `rgb(`; grep for new `@media` values outside 768/1150; grep for the new scope class to confirm every rule is prefixed; **grep the new/changed CSS, Liquid, and JS for color literals** (`#[0-9a-fA-F]{3,8}\b`, `rgb(` / `rgba(` / `hsl(` with numeric arguments) — any hit outside a schema `default` or preset must be justified or replaced; where a browser is available, change a new color setting's value (or switch the scheme) in a test render and confirm the computed color follows it.

**Do not run destructive commands. Do not run broad formatting across unrelated files. Do not run `shopify theme check` unless the project explicitly requires it or the user asks for it** — and never report it as passed unless it actually ran.

Runtime, visual, responsive, RTL, slider, cart, and editor-lifecycle behavior generally **cannot** be verified in this environment. Report those as **Requires storefront QA (Not run)** — never as passed.

---

## 22. Final implementation report format

Report, in this order:

1. Files inspected
2. Figma nodes inspected
3. Existing architecture reused
4. Files changed
5. Files intentionally untouched
6. Liquid/HTML changes
7. Schema settings added
7a. **Color schemes & design settings** — explicitly confirm: (1) which color schemes / scheme variables were inspected; (2) which native settings were reused (colors and other design properties); (3) which new Theme Editor settings were added and why no native source fit, with their Figma defaults; (4) that no unnecessary hardcoded colors were introduced (state the color-literal grep result); (5) that the new controls live only in the isolated AYUM files and work independently of the original Kalles section.
8. Blocks/options added
9. CSS scope class
10. CSS changes
11. JavaScript changes
12. Theme Editor behavior
13. Responsive verification
14. RTL/LTR verification
15. Accessibility notes
16. Performance notes
17. Merchant-data preservation
18. Validation performed
19. Manual Theme Editor steps
20. Known limitations or QA notes
21. Project plan/log update, when applicable

**The report must not claim something was tested if it was only inspected statically.** Clearly distinguish:

- **inspected** — read the code/node, reasoned about it
- **validated** — a check actually ran and its result is stated
- **manually testable** — the exact steps a human should perform
- **not testable in the current environment** — say so plainly

Mark every validation item **Passed / Failed / Not run / Not available / Requires manual verification**.

---

## 23. Section task prompt structure

Use this structure for every future section task. Fill in the exact nodes; do not substitute a page-level node.

```
Implement ONE section of the AYUM design into this Shopify theme.

Project context: AYUM Shopify project (`ayum-store`). Verify Shopify/theme version and active locale/direction from the repository before relying on them.
Target page:      [Homepage | Product | Collection]
Target template:  [templates/index.json | product.json | collection.json | <suffix>.json]
Section name:     [NAME]
Figma desktop node: [EXACT NODE ID]
Figma mobile node:  [EXACT NODE ID]
Screenshots:        [links/attachments — visual confirmation only]
Dynamic content source: [settings / blocks / product / collection / metafield / menu / app]
Grid or carousel behavior: [desktop / tablet / mobile]
Related product-card requirements: [card style, badges, price, add-to-cart placement]
Correct CSS file: [section asset / inline {% style %} / custom-class-gated asset / custom-general.css]
Existing section/base to inspect: [file path(s)]

RULES (all mandatory):
- Source-of-truth priority: SKILL §1. Read values from Figma node data, not screenshots.
- Existing-first ladder: SKILL §5. Justify the chosen step. Do not default to a new section.
- Preservation rules: SKILL §7. Never rename/delete a setting id, block type, event, or token.
- Custom class setting rule: SKILL §6.
- Colors: SKILL §2.8 — color-scheme first, no hardcoded colors; Figma values only as setting defaults.
- Design properties: SKILL §5.2 — reuse native settings; add AYUM settings only where missing.
- Responsive: SKILL §2.5 — breakpoints 768 / 1150 only. Verify 767/768/1149/1150 + 1440 + 390 + 375 + 320.
- RTL/LTR: SKILL §2.6 — logical properties; verify both directions.
- Out of scope: [explicit list — everything not named here]
- Validation checklist: SKILL §21.
- Final report: SKILL §22.
- Produce the pre-implementation report (SKILL §4.1) BEFORE editing.
- Update AYUM_PROJECT_PLAN.md §22 status and append a §23 log entry after implementing.

Do not start the next section.
```

**Every section implementation prompt must end with: `Do not start the next section.`**

For a follow-up bugfix, use the same header (section, page, exact nodes, reported issue, where it appears) plus: re-read the section's project-plan log entry → reinspect the current active file → find the **root cause** → minimal scoped fix → regression-test the bug scenario + desktop/mobile + RTL + related states + editor reload → update the §23 log entry. `Do not rebuild the section. Do not start the next section.`

---

## 24. Project plan

The project plan already exists at **[AYUM_PROJECT_PLAN.md](../../../AYUM_PROJECT_PLAN.md)** (repository root). Use that real path — do not create a new plan file.

Division of responsibility:

- **SKILL.md (this file)** — permanent workflow rules: source-of-truth priority, inspection requirements, reuse ladder, preservation, custom-class rule, CSS/JS/RTL/a11y standards, validation, reporting.
- **AYUM_PROJECT_PLAN.md** — project-specific state: the Figma frame map (§5), per-page section breakdowns with node IDs and candidate bases (§10–§13), card/slider/data strategy (§14–§16), integrations (§19), open questions and blockers (§20), the **status tracker (§22)**, and the **implementation log (§23)**.

After every implementation or bugfix: update the §22 status and append/extend a §23 log entry with real evidence. Never mark a section `VERIFIED` without real desktop **and** mobile (**and** RTL) QA. Do not duplicate this skill's rules inside the plan; do not move plan state into this skill.

---

## 25. Permanent failure modes — explicitly prohibited

- implementing the full site in one task
- implementing unrelated sections
- creating a new section before inspecting existing options
- duplicating a section when scoped extension is enough
- deleting existing schema settings
- renaming setting IDs casually
- removing blocks
- resetting Customizer data
- resetting template JSON
- hardcoding merchant images
- hardcoding content that should be editable
- using screenshots to estimate values when Figma node data exists
- treating mobile as scaled desktop
- ignoring tablet behavior
- using broad CSS selectors
- styling global sliders
- replacing native functionality with weaker custom code
- inventing product-card style numbers
- hijacking an existing style option
- choosing a product-card base without inspection
- breaking swipe or drag
- converting a grid into a slider without instruction
- autoplaying video without instruction
- adding unnecessary JavaScript
- adding unnecessary libraries
- editing minified files
- running broad refactors
- overwriting manual changes
- modifying unrelated templates
- claiming unperformed testing
- running `shopify theme check` unless requested or explicitly required

Project-specific additions, each learned from a real failure or constraint in this repository:

- committing a short-lived Figma asset URL into Liquid/CSS/JS/JSON
- hand-editing `config/settings_data.json` (including color schemes) or `assets/base.css` / `assets/theme.css`
- stripping, regenerating, relocating, or logging the The4 `purchase_code` / activation block
- putting a layout-affecting box property (border/padding/margin) on the height-observed `<hdt-sticky-header>` element
- loading a Web Component's script with a parser-blocking `script_tag` right before its element
- leaving a custom element with the default `display: inline` when it must clip (`overflow: hidden` does not clip an inline box, and `clientWidth` reads `0`)
- adding `overflow-x` to `html` / `body` to hide a section's overflow instead of containing it in the section
- introducing a third layout breakpoint (only 768 and 1150 exist)
- hardcoding `font-family` instead of using the theme font tokens (El Messiri is already global)
- hardcoding design colors (hex / `rgb()` / `rgba()` literals) in CSS, Liquid, or JS instead of color-scheme variables or Theme Editor settings
- adding a color or design setting that duplicates an existing native Kalles setting
- changing global color schemes or `css-variables.liquid` to make one section match Figma
- modifying an original Kalles section or shared dependency for AYUM-specific requirements, even when the change appears additive or inert
- putting Liquid inside a plain static `.css` asset
- registering a custom element name that collides with a native `hdt-` component
- copying `block.shopify_attributes` onto a duplicated/decorative DOM copy
- inventing testimonial/review/marketing content that does not exist — seed only verified copy and leave the rest for the merchant

---

## 25b. Additional inherited standards

**Liquid partials.** Partials are shared with `{% render 'name', param: value %}`, passing every dependency explicitly — `render` is an **isolated scope**, and a missing required param renders **blank or a placeholder, not an error** (this looks exactly like data loss). Shared snippets document their contract in a leading `{%- comment -%}` header (`Renders / Accepts / Usage`, e.g. `snippets/price.liquid`) — match the documented params exactly and copy an existing call site. `{% include %}` is not used anywhere in the product/cart/money paths; do not introduce it. Start new section files with a `<!-- name.liquid -->` header comment, as existing files do.

**Dates.** Use the `@theme/dayjs` alias (`day.min.js`), not raw `Date`. Countdown timezone comes from `themeHDN.settings.shopTimezone` (emitted only when `countdown_timezone == 'shop'`).

**Mixed RTL text + numeric values (permanent — learned from the discount-badge bug).** For UI labels combining Arabic text with numeric/LTR content (discount percentages, ratings, quantities, measurements): never rely on the inherited page direction — it is locale-driven and LTR by default, which visually reorders the runs (e.g. `70%وفري`). Keep the semantic DOM/translation order (label first), give the element an explicit `direction: rtl; unicode-bidi: isolate` (or wrap the numeric part in `<bdi>`), and never use `row-reverse` or content reordering as a bidi fix. Geometry positioning stays a separate decision from text direction.

**Storefront money-format consistency (permanent).** AYUM's storefront money display strips unnecessary trailing zeros from the decimal part (1.500 → 1.5, 15.000 → 15; a significant decimal like 12.345 is untouched). The single source of truth is `snippets/ayum-money.liquid`, already wired into the three canonical price snippets (`card-price`, `price`, `line-item-price`), with the same rule mirrored in `formatMoney` (`assets/utilities.js`) for client-rendered money. Reuse that formatter for any new price context — never format prices independently per section/card, never hardcode currency strings, and never mutate numeric Shopify price values (presentation only). When touching prices, verify: current price, compare-at, ranges, dynamically updated variant prices, and the major card contexts.

**Native media-commerce sections (permanent — established by H8 Product Videos).** When Kalles already provides a specialized commerce component (e.g. the "Shoppable Video" section: `<hdt-video-player>` + product picker + `<hdt-slider>` + native dots), reuse its media lifecycle, native product connection, native add-to-cart path (`btn-ultra`), and native slider — and preserve its full schema. Add project-specific presentation and settings additively (instance-gated markup, blank-default settings, scoped CSS). Useful verified facts: the `<hdt-slider>` `config` attribute passes **any** Embla option through (`Object.assign(defaults, JSON.parse(config))` — including per-viewport `breakpoints` such as a mobile-only `align: "center"`); the ClassNames plugin puts `.is-selected` on snapped slides (native active-slide hook); `<hdt-video-player>` without the `autoplay` attribute binds its own click-to-play — but with `{ once: true }`, so it is play-only and dies after the first click; a play↔pause toggle needs one delegated listener (custom.js) calling the element's own `play()`/`pause()` gated on its `[playing]` attribute, which it reflects for every source (Shopify video / YouTube / Vimeo). **`.hdt-media-overlap-content` is a CSS GRID with two traps (verified, H8 corrective): its media children — `hdt-video-player` included — get `pointer-events: none` (re-enable them scoped when the design needs click-to-play), and its non-media children are force-placed into the inset CENTER content cell (`grid-area: content-r/content-c; width: 100%`) — an absolutely-positioned grid item resolves inset offsets against its grid AREA, so any edge-anchored overlay must re-span the full grid (`grid-area: full-r-start/full-c-start/full-r-end/full-c-end`) or its top/right will silently center.** Shopify Liquid `video.duration` is in MILLISECONDS — derive durations from it in Liquid instead of merchant-entered text or JS metadata listeners. When restyling a native media section, never trade a functional player for a static wrapper, and verify actual runtime playback (a headless-browser click test against `shopify theme dev` works) — CSS alone can silently kill interaction. Store pulls can revert uncommitted corrective files: after any `shopify theme pull`/"theme editor" commit, re-verify recent fixes still exist on disk before diagnosing deeper. Do not rebuild specialized media-commerce behavior from generic cards or third-party slider/player libraries.

**Currency display is presentation only** (`assets/hdt-currencies.js`, `localStorage['hdt_currency_iso']`). Shopify Markets/checkout owns the charged amount — never treat a converted display value as authoritative, and never hardcode a currency symbol from the design (the Figma "KD" figures are placeholders).

**Security and privacy.** Never expose secrets, tokens, customer/personal data, private URLs, or environment values in code, output, or commits. Treat `.shopify/` as local, non-shared state — never reference its paths from theme code or surface its values.

**Git.** Do not run destructive git operations without explicit instruction. Commit or push only when explicitly asked. Prefer `shopify theme push --only <path>` to avoid overwriting merchant-edited JSON.

**Do not present a project-specific convention as a universal industry rule.** Keep universal engineering practice, Shopify/Kalles platform behavior, and AYUM project conventions distinguishable in your explanations.

**When not to implement:**

- the request is audit/plan/report only — inspect and report, do not edit
- the change requires renaming or removing a persisted identifier without an approved migration
- the change would edit generated/minified vendor output where editable source exists
- the change would strip or alter the license/activation code, or expose secrets
- the active code path cannot be confirmed and editing the wrong file risks a silent no-op or data loss
- the section depends on a blocked decision (e.g. the unresolved reviews app) — implement everything else and report the blocked part

---

## 26. Decision matrices

### Reuse vs extend vs duplicate vs rebuild

| Situation | Action |
| --- | --- |
| Original native Kalles section already does it, including with instance-scoped CSS | Use original type as-is; no duplicate and no vendor-source change |
| Needs CSS styling only with a stable instance hook | Keep original native Kalles section; scope CSS without changing the source |
| Needs an unavoidable source edit to a native Kalles section | Use ONE isolated AYUM copy; apply settings and styles to the copy, leave original untouched |
| New AYUM option or behavior (even if potentially useful to all) | Add it to the isolated AYUM section/block; leave native originals unchanged |
| AYUM change to a native shared snippet/block | Duplicate only that dependency, preserve behavior, and wire the AYUM copy to it |
| Existing isolated AYUM section needs a fix | Modify that AYUM section in place; do not rebuild or duplicate again |
| Reviewing completed AYUM homepage duplicates | Read-only inventory and safe mapping first; require approval before any one-section migration |
| No suitable native section exists | Build a new AYUM section as a last resort, following native patterns |

### Text/content source

| Content | Source |
| --- | --- |
| Fixed UI copy the theme owns | translation key (`\| t` / `t:`) |
| Merchant-configurable per section | schema setting or repeatable block |
| Per-product/collection data | `metafields.<ns>.<key>` (verify it exists; guard the absent case) |
| Title/URL of a picked resource | the resource object (`collection.title`, `product.url`) — never a parallel manual setting |

### Color / design-property source (§2.8, §5.2)

| Situation | Source |
| --- | --- |
| A scheme variable can express the Figma color role | Native `colors_by_section` + `color_scheme`; consume `--color-*` / `--hdt-btn-*` |
| The scheme has the right color role but not the current Figma value | Reuse the scheme variable; report the field/value for merchant configuration — do **not** add a redundant picker |
| The base section/block already has a matching color or design setting | Reuse it; set the Figma value in the instance or preset |
| No native source fits (scheme structurally lacks the role and no native setting fits) | New setting on the isolated AYUM file, Figma value as `default`, exposed as a scoped custom property |
| Internal geometry with no merchant meaning | Scoped CSS constant, commented with its Figma source |
| Tempted to edit a global scheme or `settings_data.json` | Never — scope the control to the section instead |

### Direct change vs needs verification

| Signal | Action |
| --- | --- |
| Convention confirmed across several files, current | Implement following it |
| Appears once, or in a legacy/duplicate/experimental file | Confirm the active path first; mark **Needs verification** |
| Behavior owned by an app or by Shopify | Preserve the boundary; do not reimplement |

---

## 27. Final agent checklist

**Before implementing:**

- [ ] Restated the outcome and acceptance criteria, and what must not change.
- [ ] Inspected the **exact** desktop and mobile Figma nodes via MCP; read values from node data.
- [ ] Confirmed the active code path (right template / section instance / block / card variant / asset).
- [ ] Read complete relevant files, including schema, stylesheet, and any JS component.
- [ ] Identified the closest existing implementation and the reuse-ladder step, with justification.
- [ ] Inspected the color schemes and the base section's color/design settings; mapped every Figma color role and design property to a scheme variable, native setting, or proposed AYUM setting (§2.8, §5.2).
- [ ] Checked saved-data impact (setting `id`s, block `type`s, template instances, merchant content).
- [ ] Listed out-of-scope areas explicitly.
- [ ] Produced the pre-implementation report (§4.1).

**Before claiming completion:**

- [ ] Edited only editable source — no `*.min.js`, `base.css`, `theme.css`, or `settings_data.json` hand-edits.
- [ ] Preserved identifiers, presets, merchant data, native behavior, app boundaries, and the The4 license code.
- [ ] For AYUM-owned customized sections, custom class setting present (or equivalent); untouched native sections use existing setting or stable instance hook; all CSS scoped.
- [ ] Used tokens, logical properties, `ThemeEvents`, shared snippets — no hardcoded colors/fonts/spacing, no invented events, no DOM-parsed money, no Figma URLs.
- [ ] Color-literal grep is clean (Figma values only as setting defaults/presets); new settings default to Figma, change the render when edited, and exist only in the isolated AYUM files; no duplicate of a native setting.
- [ ] Blank/empty states, mobile media fallback, and preset all handled.
- [ ] Ran the validation checks in §21 and recorded each as Passed / Failed / Not run / Not available / Requires manual verification.
- [ ] Wrote the final report in the §22 format, honestly distinguishing inspected vs validated vs not testable.
- [ ] Updated `AYUM_PROJECT_PLAN.md` §22 status and §23 log.
- [ ] **Did not start the next section.**