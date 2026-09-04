# Global Simulation Conference — Design System

## Overview
Brand for the Global Simulation Conference, a Model-UN-style multilateral negotiation event. Positioning: "Academic Authority meets Editorial Restraint" — the UI reads closer to a policy journal or research consortium's annual report than a marketing site.

## Sources
- `uploads/Design.md` — the only source provided: brand frontmatter (colors, type scale, radii, spacing) plus prose on color usage and tone. No codebase, no Figma file, and no logo were attached.
- Everything else in this design system (components, UI kit, illustration pattern) is an original composition built to fit that brief, not a recreation of an existing product. If a codebase or Figma file exists for this brand, re-attach it via Import so this system can be corrected against real screens.

## Content fundamentals
- **Register:** formal, institutional, third-person. Copy describes delegates, tracks, and sessions rather than addressing the reader casually — "Delegates convene across three tracks," not "You'll join three tracks."
- **Casing:** sentence case for body copy and headlines; small caps-style uppercase (via `--text-label-caps` + `--tracking-caps`) reserved for eyebrows, section labels, and metadata only (e.g. "PANEL · SESSION 4B").
- **Punctuation as structure:** middle dots (·) separate metadata clusters (time · location, date · city) instead of commas or pipes.
- **No emoji, no exclamation points.** The tone is calm and declarative even in CTAs ("Register as Delegate," "View Agenda").
- **Numbers and time:** written plainly and specifically (72 hours, 140 institutions, 14:00–15:30) — precision signals institutional credibility.

## Visual foundations
- **Color:** near-black ink (`--ink-900`) for text, "Symposium Blue" (`--symposium-blue`) as the sole interactive/accent color (links, primary buttons, active tab underlines), lightening to `--symposium-blue-hover` on hover. Warm accent (`--warm-accent`) is reserved for rare highlight moments (featured badges) — Design.md's palette had no warm color, so this is an intentional addition; see below. Neutral surfaces use limestone-gray (`--limestone`), never pure white for section backgrounds.
- **Type:** Inter throughout (display, body, and UI) — one typeface, weight does the differentiating work (400 body, 600 semibold labels/buttons, 800 for display headlines). A monospace (JetBrains Mono) is used only for timestamps/session codes, echoing a program-schedule feel.
- **Backgrounds:** flat color fields, no gradients. One custom illustration motif — a sparse line-and-node network graphic (`assets/patterns/network-lines.svg`) — appears at low opacity behind hero sections only, evoking delegate/negotiation networks and world-map connectivity without a literal map or photography.
- **Imagery:** none specified in Design.md; this system uses the abstract network-line motif in place of photography. No photographic imagery is included — if real event/delegate photography exists, add it under `assets/photography/`.
- **Animation:** minimal. Hover/focus transitions only (`--duration-fast` 120ms, `--duration-standard` 200ms, standard ease), no entrance animations, no bounce — consistent with the restrained, institutional tone.
- **Hover states:** primary buttons and links darken/shift to `--symposium-blue-hover`; secondary buttons and ghost buttons pick up a tinted background (`--symposium-blue-tint` / `--limestone`). No opacity-fade hover.
- **Focus states:** inputs get a Symposium Blue border plus a soft 3px blue ring (`--symposium-blue-tint`), no color change on the label.
- **Borders & shadows:** 1px slate borders (`--border-default`) on cards and inputs; a soft, low-contrast card shadow (`--shadow-card`) for resting elevation and a slightly deeper `--shadow-raised` for modals/drawers. No inner shadows.
- **Radii:** small and consistent — 4px (buttons, inputs, tags-square), 8px (cards), pill (999px) for badges only. Nothing sharp-cornered or heavily rounded.
- **Cards:** white surface, 1px slate border, `--shadow-card`, 8px radius. No colored left-border accent.
- **Layout:** centered content columns capped at `--container-max` (1200px), generous section padding (`--space-2xl`/`--space-3xl`), no sticky/fixed chrome beyond the site header.
- **Transparency/blur:** used once, deliberately — the Register drawer's scrim (`rgba(10,10,10,0.45)`) — no backdrop-blur anywhere else.

## Iconography
Design.md defines no icon system. This system substitutes **Lucide** icons (lucide.dev, CDN) as the closest match to an editorial/restrained line-icon style — consistent stroke weight, no fill, no rounded "friendly" glyphs. **This is a substitution, not a source-confirmed choice** — flag for correction if the brand has its own icon set. No icon font, no PNG icons, no emoji, and no unicode-as-icon usage except the plain "×" close glyph in the Register drawer.

## Intentional additions
Design.md's `colors` frontmatter defines only primary/secondary/tertiary/neutral. The following were added to make a working system and are not confirmed brand colors:
- `--warm-accent` (#B5652E) — a warm terracotta used sparingly for "featured" highlights, per the user's request for warm-accent highlights alongside the geometric illustration motif.
- Full spacing/radius scales (Design.md gave only `sm`/`md`) extended to a consistent 4px-based scale (`2xs`→`4xl`).
- JetBrains Mono for timestamps/metadata (Design.md specifies Inter only).
- The network-line illustration pattern (`assets/patterns/network-lines.svg`) — no illustration asset was provided; this was created to match the user's requested "line-art network/map" direction.
- Component inventory (Button, Input, Select, Checkbox, Card, Badge, Tabs) — Design.md defines tokens only, no component library, so this is the standard from-scratch set sized to the conference website's needs.

## Index
- `styles.css` — root stylesheet, imports everything below.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css` (radii/shadows/motion), `fonts.css` (Inter, JetBrains Mono).
- `assets/patterns/network-lines.svg` — brand illustration motif.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/forms/` — Button, Input, Select, Checkbox.
- `components/data-display/` — Card, Badge.
- `components/navigation/` — Tabs.
- `ui_kits/conference-website/` — Home, Agenda, Speakers screens with shared Header/Footer and a Register drawer.
- `SKILL.md` — portable skill file for use in Claude Code.
