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
              <Image src="/logo.svg" alt="Musync" width={138} height={51} />
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
                <Link href="/help/tutorial-videos" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">Tutorial Videos</Link>
                <Link href="/help/wiki" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">Wiki</Link>
                <Link href="/help/faq" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">FAQ</Link>
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
                <Link href="/company/about" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">About</Link>
                <Link href="/company/why-musyncs" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">Why Musyncs</Link>
                <Link href="/company/contact" className="block px-4 py-2 text-sm hover:bg-[#DACAB8]">Contact</Link>
              </div>
            </div>

            {/* Login Button */}
            <div className="flex pl-4">
              <ButtonLink href="#" className="ml-4 my-3">
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


