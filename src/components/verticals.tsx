/** Parent-house explainer: Gedhe Couture and its three verticals. */
import { Instagram, MessageCircle } from "lucide-react";
import { BRAND, VERTICALS } from "@/data/catalog";
import { useStore } from "@/lib/store";

export function Verticals() {
  const { setFilter } = useStore();

  return (
    <section id="house" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-eyebrow text-clay">The House</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-5xl">
          Three verticals, one standard of finish.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {BRAND.positioning} Each vertical runs its own edit and its own audience, while sourcing,
          quality control, payment and dispatch are handled centrally by {BRAND.name}.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {VERTICALS.map((vertical, index) => (
            <article
              key={vertical.key}
              className="flex flex-col border border-border bg-card p-6 transition-colors hover:border-gold"
            >
              <p className="font-display text-4xl tracking-tight text-clay">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-display text-xl leading-tight tracking-tight">
                {vertical.label}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {vertical.blurb}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFilter(vertical.key);
                    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full border border-foreground/20 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-gold"
                >
                  Shop this edit
                </button>
                {vertical.instagram ? (
                  <a
                    href={vertical.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Instagram className="h-3.5 w-3.5" /> @{vertical.handle}
                  </a>
                ) : (
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp desk
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
