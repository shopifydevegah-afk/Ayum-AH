# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## What this is

A Shopify Online Store 2.0 theme for the "Ayum" store, built on the commercial **Kalles 5.3.0** theme by The4 (see `config/settings_schema.json` → `theme_info`). There is no build step, package.json, linter config, or test suite — files are edited directly and uploaded as-is.

## Commands

Development uses the Shopify CLI (not checked into the repo):

- `shopify theme dev --store <store>` — local preview with hot reload
- `shopify theme check` — Liquid/JSON linting (Theme Check)
- `shopify theme push` / `shopify theme pull` — sync with the store

Be careful with `theme pull`: `config/settings_data.json` and `templates/*.json` are edited by merchants in the theme editor and are the source of truth for store content/configuration.

## Architecture

**Rendering entry point.** `layout/theme.liquid` renders `snippets/css-variables.liquid` (which emits the theme-settings CSS variables and loads `base.css` + `theme.css`), `snippets/js-variables.liquid`, and `snippets/scripts.liquid`, then the section groups `header-group`, `footer-group`, and `system-group` (`sections/*-group.json`) around `content_for_layout`. RTL is decided in `theme.liquid` from `settings.right_to_left` and the current locale's ISO code, and is passed into `css-variables` as `is_rtl`.

**Sections and theme blocks.** Most sections render nested theme blocks with `{% content_for 'blocks' %}`. Files in `blocks/` that start with `_` (e.g. `_product-price.liquid`, `_article-title.liquid`) are private blocks that only show up inside their parent sections, not in the editor's general block picker. Page layouts are put together in JSON templates out of sections and blocks. For example, `templates/product.custom-ayum.json` builds the product page from `main-product` with `_product-*` blocks. To change what appears on a page, edit the JSON template. To change how something renders, edit the section, block, or snippet.

**Store-specific templates.** `templates/product.custom-ayum.json` and `templates/collection.custom-ayum.json` are the Ayum customizations. The other alternate templates (`product.left-sidebar`, `collection.infinite`, `page.men`, …) are Kalles demo variants.

**JavaScript.** It runs as native ES modules with no bundler. `snippets/scripts.liquid` defines an import map with aliases (`@theme/utilities`, `@theme/global`, `@theme/events`, `@theme/libs`, `@theme/psw`, `@theme/dayjs`, …), and modules import through those aliases, for example `import { $4, debounce } from '@theme/utilities'`. Cross-component communication goes through `ThemeEvents` from `@theme/events`. `assets/custom.js` is loaded as a module from `snippets/system-bottom.liquid` and holds the wishlist/compare logic, among other things. Settings from Liquid reach JS through the global `themeHDN` object, which `js-variables.liquid` sets up.

**Minified vendor files.** `*.min.js` / `*.min.css` assets (`global.min.js`, `libs.min.js`, `facets.min.js`, …) are shipped minified by the vendor. Don't edit them. Put overrides in unminified files (`custom.js`, the section CSS files).

**CSS.** Global styles live in `assets/base.css` and `assets/theme.css`. Feature- or section-specific styles live in their own files (`hdt-*.css`, `product-card.css`, …), which the relevant section loads itself. Many style values come from theme settings through the CSS variables in `css-variables.liquid`.

**Localization.** Storefront strings are in `locales/<lang>.json`, and the theme-editor/schema strings are in `locales/<lang>.schema.json`. `en.default` is the source. Schema labels use `t:` keys, so a new setting needs its key added to `en.default.schema.json`.
