import { gallery, site } from "@/data/site";
import { Separator } from "./Ornaments";
import Reveal from "./Reveal";
import ScrollStage from "./ScrollStage";
import Stamp from "./Stamp";

/**
 * POSTS — a sheet of stamps, mixing portrait and landscape photographs.
 *
 * These are real stills from Neyam's footage. An earlier pass used the
 * brand's Instagram artwork here, but that artwork already has its own
 * scalloped frame and headline, so it produced a frame inside a frame and
 * repeated copy already on the page.
 *
 * The Stamp component centre-crops via preserveAspectRatio, so the mixed
 * source ratios all sit in an identical 3:4 stamp.
 */
export default function Posts() {
  return (
    <ScrollStage className="relative overflow-hidden bg-parchment py-20 md:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">A few glimpses</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold text-maroon-deep">
            Postcards from the counter
          </h2>
          <Separator className="mx-auto mt-6 text-terracotta/50" />
        </Reveal>

        {/* A sheet of four stamps, each drifting slightly differently */}
        <ul className="mt-16 grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
          {gallery.map((shot, i) => (
            <Reveal
              as="li"
              key={shot.src}
              variant="stamp"
              tilt={[-3, 2, -2, 3][i % 4]}
              delay={i * 0.09}
              className={i % 2 === 0 ? "stage-drift-left" : "stage-drift-right"}
            >
              <Stamp src={shot.src} alt={shot.alt} scallop={8} gap={11} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 text-center">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-maroon/30 px-8 text-sm font-semibold text-maroon transition-colors hover:border-maroon hover:bg-maroon hover:text-parchment-light"
          >
            Follow {site.instagramHandle}
          </a>
        </Reveal>
      </div>
    </ScrollStage>
  );
}
