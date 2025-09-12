"use client"
import Link from 'next/link'

export default function Footer() {

  return (

<footer className="mt-auto py-4 px-6 text-center text-sm text-gray-400 bg-gray-900 shadow-inner border-t border-gray-700">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Lore Forge. All Rights Reserved.
        </p>
        <span>Powered by ChatGPT</span>
        <span>Developed by Connor Reed</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy-policy">
            <span className="text-sm hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
          </Link> 
          <Link href="/terms-of-service">
            <span className="text-sm hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </span>
          </Link>
        </div>
      </div>
</footer>
    
  )
}
