"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/Buttons";

export default function NavBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [hoverFeatures, setHoverFeatures] = useState(false);
  const [hoverHelp, setHoverHelp] = useState(false);
  const [hoverCompany, setHoverCompany] = useState(false);

  const featuresTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const helpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const companyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelTimer = (ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (ref.current) {
      clearTimeout(ref.current);
      ref.current = null;
    }
  };

  const leaveWithDelay = (
    ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
    setOpen: (open: boolean) => void,
    delayMs = 200
  ) => {
    cancelTimer(ref);
    ref.current = setTimeout(() => setOpen(false), delayMs);
  };

  const toggleMobile = () => setIsMobileOpen((v) => !v);
  const closeMobile = () => setIsMobileOpen(false);

  const Arrow = ({ rotated = false, className = "" }: { rotated?: boolean; className?: string }) => (
    <svg
      className={`ml-2 h-2 w-2 transition-transform duration-200 ${rotated ? "rotate-180" : "rotate-0"} ${className}`}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10.59 0.589844L6 5.16984L1.41 0.589844L0 1.99984L6 7.99984L12 1.99984L10.59 0.589844Z" fill="currentColor" />
    </svg>
  );

  return (
    <header
      className={
        `sticky top-0 z-50 ` +
        (isMobileOpen
          ? `bg-[#ECE3E0] border-b-0`
          : `bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-b border-[#543F3A]/[.07]`)
      }
    >
      <nav
        className={
          `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ` +
          (isMobileOpen ? `border-b border-[#543F3A]/[.07]` : `border-b-0`)
        }
      >
        <div className="flex items-stretch h-19">
          {/* Left: Logo */}
          <div className="flex items-center px-4 mr-4 border-r border-l border-[#543F3A]/[0] md:border-[#543F3A]/[.07]">
            <Link href="/" className="text-base font-semibold tracking-tight">
              {/* <Image src="/logo.svg" alt="Musync" width={138} height={51} /> */}
              <svg width="139" height="51" viewBox="0 0 139 51" fill="none">
                <rect width="138.587" height="51" fill="url(#pattern0_288_2835)"/>
                <defs>
                <pattern id="pattern0_288_2835" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use href="#image0_288_2835" transform="scale(0.004 0.0108696)"/>
                </pattern>
                <image id="image0_288_2835" width="250" height="92" preserveAspectRatio="none" href="data:image/png;base64,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"/>
                </defs>
              </svg>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="ml-auto hidden md:flex items-stretch divide-x divide-[#543F3A]/[.07] border-l border-[#543F3A]/[.07]">
            {/* Product Features */}
            <div className="relative flex">
              <Link
                href="/product-features"
                className="px-4 flex items-center text-sm font-medium hover:bg-[#DACAB8] focus:bg-[#DACAB8]"
                onMouseEnter={() => {
                  cancelTimer(featuresTimer);
                  setHoverFeatures(true);
                }}
                onMouseLeave={() => leaveWithDelay(featuresTimer, setHoverFeatures)}
              >
                Product Features
                <Arrow rotated={hoverFeatures} />
              </Link>
              <div
                className={`absolute left-0 top-full hidden ${
                  hoverFeatures ? "md:block" : "md:hidden"
                } min-w-56 bg-background shadow-lg border border-[#543F3A]/[.07] rounded-[19px] mt-2`}
                onMouseEnter={() => {
                  cancelTimer(featuresTimer);
                  setHoverFeatures(true);
                }}
                onMouseLeave={() => leaveWithDelay(featuresTimer, setHoverFeatures)}
              >
                <Link href="/product-features/music-on-the-go" className="block px-4 py-2 text-sm hover:bg-[#DACAB8] rounded-t-[19px]">Music On The Go</Link>
                <Link href="/product-features/collaborate" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">Collaborate</Link>
                <Link href="/product-features/unsheet-music" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">(Un)sheet Music</Link>
                <Link href="/product-features/practice-and-perform" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">Practice and Perform</Link>
                <Link href="/product-features/musync-intelligence" className="block px-4 py-2 text-sm hover:bg-[#DACAB8] rounded-b-[19px]">Musync Intelligence</Link>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex">
              <Link
                href="/pricing"
                className="px-4 flex items-center text-sm font-medium hover:bg-[#DACAB8] focus:bg-[#DACAB8]"
              >
                Pricing
              </Link>
            </div>

            {/* Help */}
            <div className="relative flex">
              <Link
                href="/help"
                className="px-4 flex items-center text-sm font-medium hover:bg-[#DACAB8] focus:bg-[#DACAB8]"
                onMouseEnter={() => {
                  cancelTimer(helpTimer);
                  setHoverHelp(true);
                }}
                onMouseLeave={() => leaveWithDelay(helpTimer, setHoverHelp)}
              >
                Help
                <Arrow rotated={hoverHelp} />
              </Link>
              <div
                className={`absolute left-0 top-full hidden ${
                  hoverHelp ? "md:block" : "md:hidden"
                } min-w-56 bg-background shadow-lg border border-[#543F3A]/[.07] rounded-[19px] mt-2`}
                onMouseEnter={() => {
                  cancelTimer(helpTimer);
                  setHoverHelp(true);
                }}
                onMouseLeave={() => leaveWithDelay(helpTimer, setHoverHelp)}
              >
                <Link href="/help/tutorial-videos" className="block px-4 py-2 text-sm hover:bg-[#DACAB8] rounded-t-[19px]">Tutorial Videos</Link>
                <Link href="/help/wiki" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">Wiki</Link>
                <Link href="/help/faq" className="block px-4 py-2 text-sm hover:bg-[#DACAB8] rounded-b-[19px]">FAQ</Link>
              </div>
            </div>

            {/* Company */}
            <div className="relative flex">
              <Link
                href="/company"
                className="px-4 flex items-center text-sm font-medium hover:bg-[#DACAB8] focus:bg-[#DACAB8]"
                onMouseEnter={() => {
                  cancelTimer(companyTimer);
                  setHoverCompany(true);
                }}
                onMouseLeave={() => leaveWithDelay(companyTimer, setHoverCompany)}
              >
                Company
                <Arrow rotated={hoverCompany} />
              </Link>
              <div
                className={`absolute left-0 top-full hidden ${
                  hoverCompany ? "md:block" : "md:hidden"
                } min-w-56 bg-background shadow-lg border border-[#543F3A]/[.07] rounded-[19px] mt-2`}
                onMouseEnter={() => {
                  cancelTimer(companyTimer);
                  setHoverCompany(true);
                }}
                onMouseLeave={() => leaveWithDelay(companyTimer, setHoverCompany)}
              >
                <Link href="/company/about" className="block px-4 py-2 text-sm hover:bg-[#DACAB8] rounded-t-[19px]">About</Link>
                <Link href="/company/why-musyncs" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">Why Musyncs</Link>
                <Link href="/company/contact" className="block px-4 py-2 text-sm hover:bg-[#DACAB8] rounded-b-[19px]">Contact</Link>
              </div>
            </div>

            {/* Login Button */}
            <div className="flex pl-4">
              <ButtonLink href="#" className="ml-4 my-3 !px-[20px]">
                Login to Catalog
              </ButtonLink>
            </div>
          </div>

          {/* Mobile: Hamburger on the right */}
          <div className="ml-auto flex items-center md:hidden">
            <button
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              onClick={toggleMobile}
              className="p-2 hover:cursor-pointer"
            >
              {/* Animated hamburger → X */}
              <div className="relative h-[14px] w-6">
                <span
                  className={`absolute right-0 block h-[2px] bg-current transition-all duration-200 ${
                    isMobileOpen ? "top-1/2 w-6 rotate-45" : "top-0 w-6 rotate-0"
                  }`}
                />
                <span
                  className={`absolute right-0 block h-[2px] bg-current transition-all duration-200 ${
                    isMobileOpen ? "top-1/2 w-0 opacity-0" : "top-[6px] w-[70%] opacity-100"
                  }`}
                />
                <span
                  className={`absolute right-0 block h-[2px] bg-current transition-all duration-200 ${
                    isMobileOpen ? "top-1/2 w-6 -rotate-45" : "top-[12px] w-6 rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel (absolute, does not push content) */}
      <div
        aria-hidden={!isMobileOpen}
        className={`md:hidden absolute left-0 right-0 top-full z-40 bg-[#ECE3E0] pt-10 overflow-hidden transition-all duration-300 ease-in-out 
          ${isMobileOpen ? "opacity-100 translate-y-0 max-h-[85vh] pointer-events-auto" : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"}
        `}
      >
        <div className="px-4 border-b border-[#E1D8D4]">
          {/* Product Features (mobile) */}
          <div
            className={`w-full flex items-center justify-between py-7 text-sm font-medium border-b border-[#E1D8D4] ${
              isFeaturesOpen ? "bg-[#DACAB8]" : "bg-[#ECE3E0]"
            } px-4`}
          >
            <Link href="/product-features" onClick={closeMobile} className="flex-1">
              Product Features
            </Link>
            <button
              aria-label={isFeaturesOpen ? "Collapse Product Features" : "Expand Product Features"}
              className="p-2 -mr-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsFeaturesOpen((v) => !v);
              }}
            >
              <Arrow rotated={isFeaturesOpen} />
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isFeaturesOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"
            }`}
          >
            <Link href="/product-features/music-on-the-go" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">Music On The Go</Link>
            <Link href="/product-features/collaborate" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">Collaborate</Link>
            <Link href="/product-features/unsheet-music" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">(Un)sheet Music</Link>
            <Link href="/product-features/practice-and-perform" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">Practice and Perform</Link>
            <Link href="/product-features/musync-intelligence" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">Musync Intelligence</Link>
          </div>

          {/* Pricing (mobile) */}
          <Link
            href="/pricing"
            onClick={closeMobile}
            className="block py-7 px-4 text-sm font-medium border-b border-[#E1D8D4]"
          >
            Pricing
          </Link>

          {/* Help (mobile) */}
          <div
            className={`w-full flex items-center justify-between py-7 text-sm font-medium border-b border-[#E1D8D4] ${
              isHelpOpen ? "bg-[#DACAB8]" : "bg-[#ECE3E0]"
            } px-4`}
          >
            <Link href="/help" onClick={closeMobile} className="flex-1">
              Help
            </Link>
            <button
              aria-label={isHelpOpen ? "Collapse Help" : "Expand Help"}
              className="p-2 -mr-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsHelpOpen((v) => !v);
              }}
            >
              <Arrow rotated={isHelpOpen} />
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isHelpOpen ? "max-h-60 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"
            }`}
          >
            <Link href="/help/tutorial-videos" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">Tutorial Videos</Link>
            <Link href="/help/wiki" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">Wiki</Link>
            <Link href="/help/faq" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">FAQ</Link>
          </div>

          {/* Company (mobile) */}
          <div
            className={`w-full flex items-center justify-between py-7 text-sm font-medium border-b border-[#E1D8D4] ${
              isCompanyOpen ? "bg-[#DACAB8]" : "bg-[#ECE3E0]"
            } px-4`}
          >
            <Link href="/company" onClick={closeMobile} className="flex-1">
              Company
            </Link>
            <button
              aria-label={isCompanyOpen ? "Collapse Company" : "Expand Company"}
              className="p-2 -mr-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsCompanyOpen((v) => !v);
              }}
            >
              <Arrow rotated={isCompanyOpen} />
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isCompanyOpen ? "max-h-60 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"
            }`}
          >
            <Link href="/company/about" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">About</Link>
            <Link href="/company/why-musyncs" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">Why Musyncs</Link>
            <Link href="/company/contact" onClick={closeMobile} className="block px-4 py-4 text-sm border-b border-[#E1D8D4] bg-[#F3EFEE]">Contact</Link>
          </div>

          {/* Login (mobile) */}
          <div className="py-7 px-4">
            <ButtonLink href="#" onClick={closeMobile} className="w-full">
              Login to Catalog
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}


