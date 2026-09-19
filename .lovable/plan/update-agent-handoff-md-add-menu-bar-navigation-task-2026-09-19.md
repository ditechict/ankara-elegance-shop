# Update AGENT_HANDOFF.md + add menu-bar navigation task

## Why the handoff needs updates

Verified against the live code and a clean type check (`tsgo --noEmit` passes, exit 0):

1. **Vertical labels changed.** Recent text edits replaced the old vertical names. `src/data/catalog.ts` now reads:
   - "Ankara Fabrics and ready-to-wear" (was "The Edit Co. RTW.")
   - "Curated Thrift & Vintage fashion" (was "The Edit Co.")
   - "Affordable Asoebi Bulk Supply" (unchanged)
   Handoff §4 still lists the old labels.
2. **The type-check failure is fixed.** Handoff §7 task 1 describes the `stripe-webhook.ts` type errors as open. The coordinated TanStack update (`@tanstack/react-start@1.168.56`, `@tanstack/react-router@1.170.38`, `@tanstack/router-plugin@1.168.40`) resolved them — a fresh type check now passes. The task must be closed, with one caveat kept: the webhook's runtime behaviour (signed / tampered / replayed event) has not been re-verified since the package update.
3. **New task from the owner:** a menu bar for navigating the catalogs and back home.

## Changes to AGENT_HANDOFF.md

### §4 — Brand and UI/UX standard

Update the three-vertical list to the current labels (handles unchanged: `@theeditco.rtw`, `@theeditco.ng`, Asoebi has no Instagram).

### §6 — State at handoff

- Add: hero summary strip and verticals intro copy were removed on owner request; vertical cards retain their actions.
- Add: the TanStack package alignment is complete and the type check is clean.
- Add: the earlier "useStore must be used inside <StoreProvider>" report was a stale hot-reload snapshot, not a code fault — page already wraps cart consumers in the provider.

### §7 — Open work, reordered

- Close task 1, replacing it with a narrower task: **re-verify the Stripe webhook at runtime** after the package update — signed event marks paid, tampered signature returns 401, replayed event is idempotent, wrong-amount event is refused.
- **Insert new task near the top:**
  > **Add a menu bar** to `src/components/site-header.tsx` (the sticky brand bar) for navigating between catalogs and back home: Home, plus the three vertical/catalog entries from `VERTICALS` in `src/data/catalog.ts` (Ankara Fabrics and ready-to-wear, Curated Thrift & Vintage fashion, Affordable Asoebi Bulk Supply). Selecting a catalog entry applies that category filter and scrolls to the catalog section (same behaviour as the existing "Shop this edit" buttons); Home scrolls to top. Must collapse gracefully on phone widths (Instagram is the traffic source) — e.g. a hamburger revealing the same entries — and use semantic design tokens only. Existing Instagram and Bag controls stay.

## Verification

- Re-read the edited handoff sections to confirm accuracy.
- This turn changes only `AGENT_HANDOFF.md` — no app code, no build impact. The menu bar itself is built as the follow-up task, not in this turn.
