/** Premium editorial hero with value-proposition matrix + magnetic CTA. */
import { ArrowDownRight } from "lucide-react";
import heroImg from "@/assets/hero-ankara.jpg";

const VALUE_MATRIX = [
  { title: "The Edit Co. RTW.", detail: "Ankara fabrics & ready-to-wear" },
  { title: "The Edit Co.", detail: "Curated thrift & vintage fashion" },
  { title: "Asoebi Bulk Supply", detail: "Event coordination specials" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden surface-dark">
      <img
        src={heroImg}
        alt="Model wearing a vibrant Ankara bubu gown from the Gedhe Couture collection"
        width={1280}
        height={1600}
        className="absolute inset-0 h-full w-full object-cover object-[50%_28%] opacity-55"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-editorial)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-16 sm:pt-40 lg:min-h-[88vh]">
        <p className="animate-rise text-eyebrow text-gold">
          Gedhe Couture · Lagos · Three verticals, one standard of finish
        </p>
        <h1 className="animate-rise mt-5 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight text-linen sm:text-6xl lg:text-7xl">
          Stylish pieces for the
          <span className="block italic text-gold-soft">modern woman.</span>
        </h1>
        <p className="animate-rise mt-5 max-w-xl text-sm leading-relaxed text-linen/75 sm:text-base">
          One house, three verticals: Ankara fabrics and ready-to-wear, curated thrift and
          vintage, and affordable asoebi bulk supply — created and curated to the same
          standard of finish.
        </p>

        <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#catalog"
            className="magnetic inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-charcoal"
          >
            Explore the Catalog
            <ArrowDownRight className="h-4 w-4" />
          </a>
          <span className="text-[11px] uppercase tracking-[0.2em] text-linen/55">
            Nationwide delivery · Pay on WhatsApp
          </span>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-sm border border-linen/15 bg-linen/10 sm:grid-cols-3">
          {VALUE_MATRIX.map((item) => (
            <div key={item.title} className="bg-charcoal-deep/70 px-5 py-5 backdrop-blur-sm">
              <dt className="font-display text-base text-linen">{item.title}</dt>
              <dd className="mt-1.5 text-xs leading-relaxed text-linen/60">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}