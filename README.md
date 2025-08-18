This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Changelog

- 2025-08-13: Animated SVG draw-on-scroll in `components/AnimatedSection.tsx` with GSAP ScrollTrigger. Paths `Vector_1` → `Vector_5` reveal sequentially, direction chosen top-to-bottom with tie-breaks. Delayed start at `start: "top 30%"`, extended `end: "+=200%"` for slower reveal. Added momentum by setting `scrub: 1.2` so the animation eases briefly after scroll stops.
- 2025-08-14: Testimonials slider custom navigation added in `components/Testimonials.tsx` using `public/long-arrow-r.svg`.
  - Placed two buttons at the top-right of `testimonials-container` (`absolute top-0 right-0 z-10`).
  - Reused the same SVG; previous button uses a `rotate-180` class.
  - Wired to Swiper via `navigation={{ nextEl: '.testimonials-next', prevEl: '.testimonials-prev' }}`.
 - 2025-08-14: Contact `#violin` SVG now draws its path top-to-bottom on viewport enter (and re-enter) using GSAP `ScrollTrigger` in `components/ContactSection.tsx`. Direction auto-detected by comparing path endpoints; animation resets before each replay.
 - 2025-08-15: Footer columns equal-height. In `components/Footer.tsx`, changed the columns wrapper to `items-stretch` and removed `h-full` from each of the four `md:basis-1/4` columns so they all match the tallest column.
 - 2025-08-15: Tuned main illustration draw timing in `components/AnimatedSection.tsx` — now starts at `start: "top 75%"` (after slight entry) and completes over `end: "+=140%"` so it finishes within the section while still feeling deliberate.
 - 2025-08-18: Tablet/Mobile SVG draw animation added in `components/TabletMobileView.tsx`.
   - Added GSAP + ScrollTrigger setup to draw all stroked paths in one smooth pass when the SVG enters the viewport.
   - Fixed React SVG attribute names: `xmlnsXlink`, `xlinkHref` for `<use>` and `<image>` to satisfy TypeScript/JSX.
   - Kept animation lightweight: single timeline, `start: "top 85%"`, duration 1.6s.
