'use client'

import { useState } from 'react'
import LoreCard from '@/components/LoreCard'
import Layout from '@/components/Layout';
import { testLoreEntries } from '@/lib/mocks';
import Link from 'next/link';

// Type definition for the current page's internal state for Lore Type
type LoreType = 'character' | 'faction' | 'world' | 'quest';
type LoreGenre = "general" | "fantasy" | "sci-fi" | "cyberpunk" | "historical" | "horror";

export default function LoreForgeStarter() {
  const [prompt, setPrompt] = useState('')
  const [type, setType] = useState<LoreType>('character')
  const [genre, setGenre] = useState<LoreGenre>('general')
  const [title, setTitle] = useState('Title')
  const [result, setResult] = useState('')
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);



  const handleGenerateStarter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');
    setError(null);

    const fullPrompt = `${type} lore in the ${genre} genre: ${prompt}`;
    setSubmittedPrompt(fullPrompt);

    try {
      const response = await fetch('/api/generate-starter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt, type, genre }),
      });

      if (!response.ok) {
        throw new Error('Network response was not okay');
      }

      const data = await response.json();
      if (data.success) {
        const fullContent = data.lore;
        // The title is in the h2 tag, we can extract it for the LoreCard prop
        const titleMatch = fullContent.match(/<h2>(.*?)<\/h2>/);
        setTitle(titleMatch ? titleMatch[1] : 'Lore Sample');
        setResult(fullContent.match(/<p>(.*?)<\/p>/));
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch lore from the AI. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 lg:p-8">
        {/* Left Column: Generator Controls */}
        <section className="lg:col-span-1 space-y-6 p-6 bg-gray-900 rounded-xl shadow-xl ring-1 ring-cyan-500/20 border border-gray-700">
          <h1 className="flex justify-center text-center text-3xl font-bold text-cyan-400 tracking-wide mb-4">
            The Lore Forge (Starter)
          </h1>
          {/* Prompt Input */}
          <form onSubmit={handleGenerateStarter}>
            <div className="space-y-3">
              <label htmlFor="prompt" className="block font-medium text-gray-50 text-lg mb-1">
                Craft Your Lore Prompt:
              </label>
              <textarea
                id="prompt"
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-950 text-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200 resize-y"
                placeholder="Describe your character, faction, world, or quest..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={8}
                disabled={isLoading}
              />
            </div>
            {/* Type and Genre Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lore-type" className="block font-medium text-gray-50 mb-1">
                  Lore Type:
                </label>
                <select
                  id="lore-type"
                  className="cursor-pointer w-full p-3 rounded-lg bg-gray-950 text-gray-50 border border-gray-700 focus:ring-2 focus:ring-cyan-400 appearance-none bg-no-repeat bg-right-center pr-8 custom-select-arrow"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%2322D3EE' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3E%3C/svg%3E")`, backgroundSize: '1.25em', backgroundPosition: 'right 0.75em center' }}
                  value={type}
                  onChange={(e) => setType(e.target.value as LoreType)}
                >
                  <option value="character">Character Lore</option>
                  <option value="faction">Faction Lore</option>
                  <option value="world">World Lore</option>
                  <option value="quest">Quest Lore</option>
                </select>
              </div>
              <div>
                <label htmlFor="lore-genre" className="block font-medium text-gray-50 mb-1">
                  Genre:
                </label>
                <select
                  id="lore-genre"
                  className="cursor-pointer w-full p-3 rounded-lg bg-gray-950 text-gray-50 border border-gray-700 focus:ring-2 focus:ring-cyan-400 appearance-none bg-no-repeat bg-right-center pr-8 custom-select-arrow"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%2322D3EE' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3E%3C/svg%3E")`, backgroundSize: '1.25em', backgroundPosition: 'right 0.75em center' }}
                  value={genre}
                  onChange={(e) => setGenre(e.target.value as LoreGenre)}
                >
                  <option value="general">General</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="sci-fi">Sci-Fi</option>
                  <option value="cyberpunk">Cyberpunk</option>
                  <option value="historical">Historical</option>
                  <option value="horror">Horror</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-semibold transition-colors duration-300 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? 'Forging...' : 'Forge Lore'}
            </button>
          </form>
        </section>

       {/* --- Lore Result Section --- */}
        <section className="lg:col-span-2 p-6 bg-gray-900 rounded-xl shadow-xl ring-1 ring-cyan-500/20 border border-gray-700 flex flex-col">
          {error && (
            <div className="text-lg text-red-500 font-medium text-center mb-4">{error}</div>
          )}
          {result ? (
            <div className="flex-grow overflow-hidden">
              <LoreCard title={title} content={result} prompt={submittedPrompt} genre={genre} type={type} />
              <div className="mt-8 text-center mb-4">
                <Link href="https://6801801549663.gumroad.com/l/nayuj" target="_blank" rel="noopener noreferrer">
                  <span className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 rounded-full text-white font-semibold transition-colors duration-300">
                    Unlock the Full Forge
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-400 text-center p-4 text-xl tracking-wide">
              <p className="mb-4">Welcome User!</p>
              <p>Enter your prompt on the left to get a sample of how The Lore Forge works!</p>
            </div>
          )}
        </section>

        {/* --- ALL AVAILABLE TEST PROMPTS OVERVIEW --- */}
        <section className="lg:col-span-3 space-y-6 p-6 bg-gray-900 rounded-xl shadow-xl ring-1 ring-cyan-500/20 border border-gray-700 mt-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3 justify-center">
            Complete Lore Prompt Collection
          </h2>

          <p className="text-gray-400 text-center mb-6">
            Below is a full list of all the pre-generated lore examples available in the Test Forge. Click on any entry to load its details, then click Forge to generate content.
          </p>
          
          <div className="flex flex-wrap gap-4 custom-scrollbar max-h-[500px] overflow-y-auto pr-2 justify-center">
            {testLoreEntries.map((lore, index) => (
              <button
                key={index}
                onClick={() => {
                  setPrompt(lore.text);
                  setType(lore.type);
                  setGenre(lore.genre);
                }}
                className="bg-gray-950 p-4 rounded-lg border border-gray-800 shadow-inner space-y-2 opacity-90 hover:opacity-100 transition-opacity transform hover:scale-[1.01] text-left max-w-sm shrink-0"
              >
                <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                  {lore.title}
                </h3>
                <p className="text-sm text-gray-400">
                  <span className="font-medium text-cyan-400">{lore.type}:</span> {lore.text}
                </p>
                <div className="flex flex-wrap gap-2 text-xs mt-2">
                  <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded-full border border-gray-700">
                    Type: <span className="font-medium text-gray-50">{lore.type}</span>
                  </span>
                  <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded-full border border-gray-700">
                    Genre: <span className="font-medium text-gray-50">{lore.genre}</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}