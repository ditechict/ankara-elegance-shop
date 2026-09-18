# Handoff prompt for a Codex takeover agent

Approve this and I will save the prompt below as `AGENT_HANDOFF.md` in the project root (plus a short pointer in `AGENTS.md`) so the Codex agent has it in-repo. The prompt text is the deliverable.

---

## The prompt to give Codex

You are taking over an in-flight build of **Gedhe Couture**, a production storefront originally built by a Lovable agent. Continue in exactly the same pattern. Read `AGENTS.md`, `.lovable/plan/` (all archived plans, newest first), and this file before touching code.

### 1. Stack rules (non-negotiable)

- TanStack Start v1 + React 19 + Vite 7, Tailwind v4 via `src/styles.css`. No React Router, no `src/pages`, no `App.tsx` page switcher. Never edit `src/routeTree.gen.ts`.
- Backend is Supabase-behind-Lovable-Cloud. Client import is always `@/integrations/supabase/client`. Never edit auto-generated files: `client.ts`, `client.server.ts`, `previewAuthStorage.ts`, `auth-middleware.ts`, `auth-attacher.ts`, `types.ts`, `.env`, `supabase/config.toml`.
- App-internal server logic uses `createServerFn` from `@tanstack/react-start` in `*.functions.ts` under `src/lib/`. Server-only helpers live in `*.server.ts`. Never place client-imported server functions under `src/server/`.
- External callers (webhooks) use file routes under `src/routes/api/public/*`, and must authenticate the caller inside the handler.
- Read `process.env` only inside `.handler()`. Browser config uses `import.meta.env.VITE_*`.
- Runtime is a Cloudflare-style Worker: no `child_process`, `sharp`, `puppeteer`, native addons. Never set `ssr.external` in `vite.config.ts`.
- Every route file needs its own `head()` with a unique title, description, og:title, og:description. Never "Lovable App".

### 2. Security rules that already passed review — do not regress

- **Order lookup**: public access is by a cryptographically random token only. Only the SHA-256 hash is stored (`orders.lookup_token_hash`), with `lookup_expires_at` (30 days) and `lookup_revoked_at`. The display reference (`3KB-XXXXXXXXXX`) is never a credential.
- **Public order DTO** returns: display reference, item summary, totals, currency, payment state, fulfilment state, masked contact hint. It must never return phone, address, notes, or admin notes.
- **Writes to `orders` and `payment_events` are service-role only.** There is intentionally no customer INSERT policy. Two scanner findings asking for one were closed as not applicable. Do not "fix" them.
- **Roles live in `public.user_roles` only** (enum `app_role`: admin, staff), checked via the security-definer `private.has_role(uuid, app_role)`. Never a profile column, never localStorage.
- Every admin server function verifies the role server-side, in addition to the route guard.
- Every new `public` table needs, in this order: CREATE TABLE → GRANTs → ENABLE RLS → policies.
- Never expose Supabase project IDs/URLs/dashboard links to the user; call it "the backend".

### 3. Payments — current contract

- **Stripe only is live.** GBP orders go through Stripe hosted checkout. NGN orders route to WhatsApp. Paystack code paths exist but are dormant and deliberately unfinished.
- Webhook is `src/routes/api/public/stripe-webhook.ts`. Order of operations is load-bearing:
  1. Read the **raw** body; verify `Stripe-Signature` as HMAC-SHA-256 of `` `${timestamp}.${rawBody}` `` against `STRIPE_WEBHOOK_SECRET`, 300s tolerance, timing-safe compare. 401 on failure, before any parsing.
  2. Insert into `payment_events` first; a unique violation on `(provider, event_id)` means duplicate → return 200 and stop. That is the idempotency mechanism.
  3. Match the order via `client_reference_id ?? metadata.reference`.
  4. Compare minor-unit amount and currency to the server-calculated `orders.total`. Mismatch → write `last_payment_error = 'amount_or_currency_mismatch'`, log a `payment_exception` audit event, and do **not** mark paid.
  5. Only then set `payment_status`, `provider_reference`, `paid_at`.
  - PAID: `checkout.session.completed`, `checkout.session.async_payment_succeeded`. FAILED: `checkout.session.expired`, `checkout.session.async_payment_failed`, `payment_intent.payment_failed`.
- Always return provider-compatible 200s for handled-but-ignored events; keep detail in server logs, never in customer-facing text.
- `retryOrderPayment` reuses the same order and reference, increments `payment_attempts`, caps at 5. Never create a duplicate order.
- Verified constraints: `payment_status` in pending/paid/failed/cancelled/refunded; `fulfilment_status` in new/confirmed/packed/dispatched/delivered/cancelled; `payment_provider` in stripe/paystack/whatsapp.

### 4. Brand and UI/UX standard (this is the bar — hold it)

- **Gedhe Couture** is the parent brand: "a fashion company creating and curating stylish pieces for the modern woman." Three verticals under one line, "Three verticals, one standard of finish":
  - The Edit Co. RTW. — @theeditco.rtw — Ankara fabrics and ready-to-wear
  - The Edit Co. — @theeditco.ng — curated thrift and vintage
  - Affordable Asoebi Bulk Supply — no Instagram
- WhatsApp everywhere: +234 803 222 7986. All brand constants live in `src/data/catalog.ts` (`BRAND`, `VERTICALS`, `CATEGORIES`) — never hardcode them in components.
- Visual language: editorial, high-contrast, serif headings over clean sans body; deep charcoal / soft linen with burnished gold and clay terracotta accents. Edge-to-edge product imagery, restrained motion.
- **All colours, gradients, shadows are semantic tokens in `src/styles.css`** consumed via shadcn variants. Never `text-white`, `bg-black`, or `bg-[#hex]` in components.
- Reject generic AI aesthetics: no Inter/Poppins default look, no purple-indigo-on-white gradients, no interchangeable hero/nav/footer.
- Mobile-first: Instagram is the traffic source. Every screen must be verified at a phone width.
- Every route ships real loading, empty, error, and not-found states. No bare spinners standing in for design.
- Product images stored as `asset:<file>` must be rendered through `resolveImage()` from `@/data/catalog`, including in admin screens.

### 5. Working practice expected of you

- Batch independent reads and edits as parallel tool calls; don't end a turn on a single small write.
- After edits, read the newest entry in `/tmp/observability/build-errors.log` in a *later* message. Never claim completion while it shows errors, including pre-existing ones.
- Verify UI claims with Playwright against `http://localhost:8080` (never restart the dev server; it is supervised). Viewport `1280x1800`, no `full_page=True`. Scripts under `/tmp/browser/<slug>/`.
- Never run stateful git commands. Use `bun` for JS/TS, `tsgo` for type-only checks, `rg` for search.
- Keep `js-yaml` **transitive** (lockfile resolves 4.3.2); `bun.lock` is the text lockfile and must stay text.
- Talk to the user in plain, non-technical language. Never say "Supabase", "RLS", "component", "route", "build". One or two sentences.
- Do not re-propose things already rejected: no profile table, no customer-side insert policies, no Paystack completion until asked.

### 6. Known state at handoff

- Storefront, verticals section, cart panel, order-return page, token order page, admin dashboard (orders, payment exceptions, products editor), and admin login are all implemented and building clean.
- A real Stripe test-card order was verified end to end: hosted checkout → signed webhook → order flipped to `paid`; tampered signature rejected 401; replayed event idempotent; wrong-amount event refused to mark paid.
- Admin account exists: `admin@gedhecouture.com`, with an `admin` row in `user_roles`. No profile data by design.
- Four temporary catalog products remain in the database, awaiting real inventory from the owner.

### 7. Open work — task list, in order

1. **Fix the type-check failure in `src/routes/api/public/stripe-webhook.ts`.** Two `TS7031` errors on the `request` binding. Root cause is a version mismatch: `@tanstack/react-router@1.170.36` vs `@tanstack/react-start@1.168.52`, where `start-client-core` bundles its own `router-core@1.171.29`, so route type augmentation never reaches the instance in use. Fix by aligning the packages in one coordinated update, then re-running the type check and a full build. Do not paper over it with `any` or `@ts-ignore`. Runtime behaviour must stay byte-identical — re-verify the webhook with a signed, a tampered, and a replayed event afterwards.
2. **Run the security scan** and report results. Fix only what is genuinely actionable; leave the two closed order/payment insert-policy findings closed.
3. **Ask the owner for real inventory** — per vertical: names, prices in NGN and GBP, options and option label, minimum quantity, Asoebi volume tiers, stock status, and photos. Then replace the four temporary products through the admin products editor path (schema already supports everything). Do not invent product data.
4. **Fulfilment workflow hardening**: enforce the New → Confirmed → Packed → Dispatched → Delivered (+ Cancelled) transitions server-side and reject invalid jumps; record every change in `order_audit_events` with the acting admin.
5. **Order export** for fulfilment and accounting, admin-authenticated only.
6. **Revenue reporting split by NGN and GBP** — never a blended total.
7. **Customer notification hooks** on payment confirmation and fulfilment milestones, designed so email/WhatsApp can be switched on later without exposing private data.
8. **Asoebi event-date and quantity capture** at checkout, with an urgency indicator in the dashboard for production timelines.
9. **Catalogue change history** for price and volume-tier edits, to prevent silent pricing disputes.
10. **Low-stock and "inquire for timeline" alerts** surfaced in the operations dashboard.
11. **Paystack**, only when the owner asks: mirror the Stripe webhook contract exactly (raw-body `x-paystack-signature` verification, same idempotency, same amount/currency gate).

### 8. Definition of done for each task

- Build log clean, type check clean.
- Behaviour verified in the running preview with Playwright, and the observation reported (final URL, page state, console errors).
- No hardcoded colours; tokens only. Mobile width checked.
- Every new table has GRANTs, RLS, and policies. Every new admin function verifies the role server-side.
- No PII added to any public response.
- Closing message to the owner: one or two plain sentences about what they can now do.
