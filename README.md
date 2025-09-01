# Musync - Next.js Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Getting Started

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

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📋 Changelog

> **Note**: Newest changes are listed first. Add new entries at the top of this section.

---

### 🆕 2025-09-01 - Recent UI/UX Improvements

#### **Persistent Premium Plan Selection** (`components/PricingSection.tsx`)
- **Page refresh**: Always defaults to "premium" plan on component mount
- **Screen resize**: Resets to "premium" when window size changes (any device)
- **Scroll behavior**: Added ScrollTrigger to reset to "premium" when section comes into view or returns
- **Consistent UX**: Users can interact during viewing, but selection resets to premium on any navigation away and back
- Ensures premium plan is always highlighted as the recommended option

#### **Enhanced Mobile Navigation** (`components/NavBar.tsx`)
- Increased all mobile navigation links by 30% (`text-sm` → `text-lg`: 14px → 18px)
- Enhanced dropdown arrows by 25% (`h-2 w-2` → `h-[10px] w-[10px]`: 8px → 10px)
- Added `isMobile` prop to Arrow component for conditional sizing
- Improved mobile accessibility with larger, easier-to-tap navigation elements

#### **Compacted "Why Musync" Tiles** (`components/WhySection.tsx`)
- Removed fixed `min-h-[330px]` height constraint for content-adjusted sizing
- Reduced padding from `p-5` to `p-4 pb-20` and tightened spacing (`mb-4` → `mb-3`)
- Smaller text size (`text-sm`) with `leading-relaxed` for better readability
- Repositioned icons closer to content (`bottom-5 right-5` → `bottom-3 right-3`)
- **Result**: More efficient use of space while maintaining visual appeal

#### **Improved Mobile Animation Performance** (`components/AnimatedSection.tsx`)
- Added mobile device detection utility (`isMobile()`) based on screen width and user agent
- **Desktop animations**: Faster scrub response (1.3 → 0.6) for more responsive scroll-stop behavior
- **Mobile animations**: Slower, smoother animations - increased scrub to 2.5, path durations by 80%, and fade-ins by 67%
- Enhanced mobile experience with performance-optimized, less demanding animations

#### **Optimized App Store Buttons Layout** (`components/Hero.tsx`)
- Changed mobile layout from vertical (`flex-col`) to horizontal (`flex-row`) stacking
- Increased button size by 40% (width: 144px → 208px) and height by 50% (62px → 93px)
- Added vertical centering with `transform="translate(0, 15.5)"` for SVG content within taller containers
- Improved mobile user experience with larger, side-by-side download buttons

#### **Enhanced Pricing Section Icons** (`public/check-icon.svg` & `public/uncheck-icon.svg`)
- **Check icons**: Changed to bright green (#22C55E background, #16A34A checkmark) with circle stroke for positive indication
- **Uncheck icons**: Changed to brown (#543f3a) with 80% opacity for subtle but visible negative indication
- Improved accessibility and visual hierarchy between included vs excluded features

---

### 📅 Previous Updates

#### **2025-08-18** - Tablet/Mobile SVG Animation (`components/TabletMobileView.tsx`)
- Added GSAP + ScrollTrigger setup to draw all stroked paths in one smooth pass when the SVG enters the viewport
- Fixed React SVG attribute names: `xmlnsXlink`, `xlinkHref` for `<use>` and `<image>` to satisfy TypeScript/JSX
- Kept animation lightweight: single timeline, `start: "top 85%"`, duration 1.6s

#### **2025-08-15** - Animation & Layout Improvements
- **Main illustration timing** (`components/AnimatedSection.tsx`): Now starts at `start: "top 75%"` and completes over `end: "+=140%"`
- **Footer equal-height columns** (`components/Footer.tsx`): Changed wrapper to `items-stretch`, removed `h-full` from columns

#### **2025-08-14** - Interactive Elements
- **Testimonials slider navigation** (`components/Testimonials.tsx`): Added custom navigation using `public/long-arrow-r.svg`
  - Placed buttons at top-right (`absolute top-0 right-0 z-10`)
  - Previous button uses `rotate-180` class
  - Wired to Swiper via `navigation` prop
- **Contact violin SVG** (`components/ContactSection.tsx`): Path draws top-to-bottom on viewport enter with GSAP ScrollTrigger

#### **2025-08-13** - Initial SVG Animations (`components/AnimatedSection.tsx`)
- Animated SVG draw-on-scroll with GSAP ScrollTrigger
- Paths `Vector_1` → `Vector_5` reveal sequentially, direction chosen top-to-bottom with tie-breaks
- Delayed start at `start: "top 30%"`, extended `end: "+=200%"` for slower reveal
- Added momentum with `scrub: 1.2` for smooth animation easing after scroll stops
