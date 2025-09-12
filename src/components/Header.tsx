"use client"
import { useState } from 'react'
import Link from 'next/link'
// import { UserCircleIcon, UserIcon, XMarkIcon, HomeIcon, 
//   Bars3CenterLeftIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/solid'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2E2B59] bg-opacity-80 backdrop-blur-sm shadow-md text-[#FDF5E6] p-4 font-sans">
      <nav className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-3xl font-bold text-cyan-400 tracking-wide hover:text-fuchsia-500 transition-colors">
        <div className="flex items-center space-x-2">Lore Forge</div>
      </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <div className="group relative">
            <Link href="/">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              Forges
            </span>
            </Link>
            <div className="hidden group-hover:block absolute top-full mt-1 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10">
              <Link href="/lore-forge">
                <span className="block px-4 py-2 hover:bg-gray-700 transition-colors cursor-pointer">
                  Starter
                </span>
              </Link>
              <Link href="/lore-forge-demo">
                <span className="block px-4 py-2 hover:bg-gray-700 transition-colors cursor-pointer">
                  Demo
                </span>
              </Link>
            </div>
          </div>
          <Link href="/blog">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              Blog
            </span>
          </Link>
          <Link href="/project-log">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              Project Log
            </span>
          </Link>
          <Link href="/coming-soon">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              Coming Soon
            </span>
          </Link>
        </div>

        {/* User Status and Auth Buttons (Desktop) */}
        {!isMobileMenuOpen && (
        <div className=" flex items-center space-x-4 ml-6 pl-6 border-l border-border-default"> {/* Separator */}
          Sign in area
        </div>
        )}
      

      {/* Mobile Hamburger Menu Button */}
        {!isMobileMenuOpen && (
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Side Menu (Overlay) */}
      {isMobileMenuOpen && (
        <div className=" inset-0 bg-[#2E2B59] z-40 p-8 pt-0 flex flex-col items-center space-y-8">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            &times;
          </button>
          {/* Mobile Menu Links */}
          <Link href="/lore-forge">
            <span className="text-2xl font-semibold hover:text-gray-300 transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
              Starter Forge
            </span>
          </Link>
          <Link href="/lore-forge-demo">
            <span className="text-2xl font-semibold hover:text-gray-300 transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
              Demo Forge
            </span>
          </Link>
          <Link href="/blog">
            <span className="text-2xl font-semibold hover:text-gray-300 transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </span>
          </Link>
          <Link href="/project-log">
            <span className="text-2xl font-semibold hover:text-gray-300 transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
              Project Log
            </span>
          </Link>
          <Link href="/coming-soon">
            <span className="text-2xl font-semibold hover:text-gray-300 transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
              Coming Soon
            </span>
          </Link>

          {/* Mobile Auth Status (if not already displayed by the trigger) */}
          <p>Mobile sign in area</p>
        </div>
      )}
      
    </header>
  );
};
