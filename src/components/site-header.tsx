/** Sticky brand bar with live cart volume badge. */
import { ShoppingBag, Instagram } from "lucide-react";
import { VERTICALS } from "@/data/catalog";
import { useStore } from "@/lib/store";

const PRIMARY_SOCIAL = VERTICALS.find((v) => v.instagram);

export function SiteHeader() {
  const { volume, openCart } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8">
        <a href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 font-display text-sm text-gold">
            GC
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none tracking-tight">
              Gedhe <span className="text-clay">Couture</span>
            </span>
            <span className="mt-1 block text-eyebrow text-muted-foreground">
              Three verticals, one standard of finish
            </span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-1.5">
          {PRIMARY_SOCIAL?.instagram && (
            <a
              href={PRIMARY_SOCIAL.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit ${PRIMARY_SOCIAL.label} on Instagram`}
              className="grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
          )}
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open bag, ${volume} items`}
            className="relative flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-xs font-semibold tracking-wide transition-colors hover:border-gold hover:bg-secondary"
          >
            <ShoppingBag className="h-[17px] w-[17px]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-charcoal px-1.5 text-[11px] font-bold text-linen">
              {volume}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
