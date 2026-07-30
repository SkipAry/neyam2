import { faqs } from "@/data/site";
import { Separator } from "./Ornaments";
import Reveal from "./Reveal";

/**
 * FAQ — native <details>, so it works with no JavaScript at all and
 * gets correct keyboard and screen-reader behaviour for free.
 */
export default function FAQ() {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">Before you come</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold text-maroon-deep">
            Questions
          </h2>
          <Separator className="mx-auto mt-6 text-terracotta/50" />
        </Reveal>

        <div className="mt-12 divide-y divide-maroon/15 border-y border-maroon/15">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={Math.min(i * 0.05, 0.25)}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-lg text-maroon-deep marker:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-maroon/30 text-maroon transition-transform duration-300 group-open:rotate-45"
                  >
                    <span className="absolute h-[1.5px] w-3 bg-current" />
                    <span className="absolute h-3 w-[1.5px] bg-current" />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-base leading-relaxed text-ink/75">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
