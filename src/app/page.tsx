// app/page.tsx
import Link from 'next/link';

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 font-sans">

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#2E2B59] text-[#FDF5E6] p-4 font-sans">
      <div className="flex flex-col items-center max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-[#B8860B] mb-4">
          The Lore Forge
        </h1>
        <p className="text-lg md:text-xl text-center mb-10">
          Craft personalized lore.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/lore-forge">
            <div className="px-8 py-4 bg-[#356859] hover:bg-[#2e564d] rounded-full text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
              Lore Forge Generator
            </div>
          </Link>
          <Link href="/lore-forge-demo">
            <div className="px-8 py-4 bg-[#8a91ac] hover:bg-[#7b8196] rounded-full text-[#2E2B59] font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
              Full Lore Forge Demo
            </div>
          </Link>
        </div>
      </div>
    </div>
      
    </div>
  )
}
