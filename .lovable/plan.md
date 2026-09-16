# Gedhe Couture: Stripe payments, admin verification, brand structure

Continues the two archived plans. Everything already built stays: the catalog, cart, secure order tokens, order status page, admin dashboard shell, and admin sign-in. Three gaps remain, plus the brand restructure.

## 1. Automatic payment confirmation (Stripe only)

Today a card order is created as "pending" and never becomes "paid" on its own. Add a verified Stripe callback endpoint so completed payments update the order automatically:

- Verify Stripe's signature on the raw request before reading anything; unsigned or tampered calls are rejected.
- Ignore duplicate or repeated notifications so an order can never be double-counted.
- Match the notification to the order by its reference and confirm the amount and currency agree with what the server calculated; mismatches are recorded as exceptions rather than marked paid.
- On a genuine success, set payment to paid, stamp the payment time, and record an audit entry visible in the admin dashboard.
- Handle failed and expired payments by recording the failure and keeping the order visible for follow-up.

Paystack is deliberately left out for now. Naira orders continue through the WhatsApp route, and the checkout copy will say so instead of offering a card option that cannot complete. The Paystack code path stays dormant and ready.

After the endpoint exists I will ask you for the Stripe test key and the callback signing value through the secure secrets form, and give you the exact callback address to paste into Stripe.

## 2. Order return page linking and finish

- Keep `/order-return`, where a customer pastes the token from checkout, and the token page it opens.
- Add the same link to the order confirmation on screen and make the token easy to copy.
- Make the states explicit: awaiting payment, paid, failed, cancelled, WhatsApp order, and unknown or expired token — without revealing whether someone else's order exists.
- Add a retry-payment action for unpaid card orders that reuses the same order instead of creating a second one.

## 3. Admin walkthrough and gaps

- Create your admin sign-in account and grant it the admin role.
- Walk the dashboard end to end in the live preview: sign in, find an order, open it, move it through Confirmed, Packed, Dispatched, Delivered, add an internal note, and check the audit trail.
- Verify product editing saves correctly, including prices, options, minimum quantity, volume tiers and publish state.
- Add the payment exceptions view listed in the archived plan: amount mismatches, failed callbacks and abandoned checkouts.
- Confirm signed-out visitors are redirected and non-admin accounts are refused.

## 4. Brand structure: Gedhe Couture and its three verticals

Gedhe Couture becomes the parent name across the site, with three clearly separated verticals under one standard of finish:

| Vertical | Public label | Instagram |
| --- | --- | --- |
| Ankara fabrics and ready-to-wear | The Edit Co. RTW. | @theeditco.rtw |
| Curated thrift and vintage | The Edit Co. | @theeditco.ng |
| Asoebi bulk supply | Affordable Asoebi Bulk Supply | none |

Changes:

- Site name, page titles, descriptions, social preview text and footer read Gedhe Couture, described as a fashion company creating and curating stylish pieces for the modern woman.
- The catalog sections and category filters carry the three vertical labels, each with its own short positioning line and its Instagram link where one exists.
- The Asoebi vertical points to WhatsApp for event coordination since it has no Instagram.
- WhatsApp across the site uses +234 803 222 7986, replacing the placeholder number.
- The "Three verticals, one standard of finish" idea becomes a real section explaining the parent-and-verticals structure.
- Current products are retained temporarily and reassigned to the correct vertical, ready for your real inventory later.

## 5. Verification before I report done

- Live preview run of: storefront, a Stripe test checkout, the automatic paid update, the order return page, and the admin order and product flows.
- Replayed and tampered payment notifications rejected safely.
- Build clean and a security scan run at the end.

## Technical notes

- Stripe callback as a TanStack server route under `src/routes/api/public/stripe-webhook`, verifying `Stripe-Signature` against the raw body with a timing-safe comparison before parsing.
- Idempotency through the existing unique `(provider, event_id)` rule on `payment_events`; insert the event first, then update the order.
- Order and payment writes remain service-role only; admin reads and updates go through the authenticated admin server functions with the `user_roles` role check.
- Brand values centralised in `src/data/catalog.ts` (`BRAND`, `CATEGORIES`) so copy is not duplicated across components.
- A small migration adds the payment-exception fields and any vertical labelling needed on products, with grants and row-level security for anything new.

## Open item

Real inventory, photos and prices for the three verticals — the catalog stays on the temporary items until you send them.
