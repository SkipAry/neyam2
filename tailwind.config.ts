import type { Config } from "tailwindcss";

/**
 * NEYAM design tokens.
 *
 * Palette is built from the brand's own Instagram artwork:
 *   parchment  #F5EDDC  cream paper ground
 *   maroon     #71301F  deep maroon — stamp frames, display type
 *   terracotta #9A3714  rust — the painted counter wall
 *
 * `maroon.deep` and `terracotta.ink` exist purely to pass WCAG AA where the
 * base hues are too light against parchment. Check with the contrast script
 * before introducing a new pairing.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        /**
         * Height-based variant. Width breakpoints alone can't handle a
         * laptop or a tablet in landscape: 1024×768 gets the full desktop
         * treatment horizontally but has less vertical room than a phone,
         * and the hero's padding pushed content below the fold.
         */
        short: { raw: "(max-height: 820px)" },
      },
      colors: {
        parchment: {
          DEFAULT: "#F5EDDC",
          light: "#FBF6EC",
          deep: "#EBDFC7",
        },
        maroon: {
          DEFAULT: "#71301F",
          deep: "#521F12",
          light: "#8E4630",
        },
        terracotta: {
          DEFAULT: "#9A3714",
          ink: "#7C2C0F",
          light: "#C05A32",
        },
        leaf: "#3F6B3A",
        /**
         * Brass. The original brand gold (#B8860B) only reaches 3.01:1 on
         * maroon and 2.20:1 on terracotta, so it failed AA for the small
         * caps labels it was being used for. These are lightened to the
         * measured minimums and still read as gold:
         *   DEFAULT 4.88:1 on maroon, 6.69:1 on maroon-deep
         *   light   4.53:1 on terracotta (the lightest ground brass sits on)
         *   deep    kept for large display type only
         */
        brass: {
          DEFAULT: "#DEB13A",
          light: "#EACB70",
          deep: "#B8860B",
        },
        ink: "#2B1710",
      },
      fontFamily: {
        display: ['"Cormorant Garamond Variable"', "Georgia", "serif"],
        sans: ['"Google Sans Variable"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "80rem",
      },
      letterSpacing: {
        caps: "0.18em",
      },
      transitionTimingFunction: {
        settle: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        steam: {
          "0%": { opacity: "0", transform: "translateY(0) scaleX(1)" },
          "35%": { opacity: "0.55" },
          "100%": { opacity: "0", transform: "translateY(-2.5rem) scaleX(1.7)" },
        },
        drawIn: {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        steam: "steam 4.5s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
