import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { MovieCard } from '@/components/MovieCard';
import { MovieGridSkeleton } from '@/components/MovieSkeleton';
import { movies, series } from '@/data/mockData';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const query = searchParams.get('q') || '';
  
  const allContent = [...movies, ...series];
  const searchResults = query 
    ? allContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
        item.cast.some(actor => actor.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [query]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-8 bg-gray-800 rounded w-64 mb-8 animate-pulse" />
          <MovieGridSkeleton />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-black pt-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Search className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-white">
              Search Results
            </h1>
          </div>
          
          {query && (
            <p className="text-gray-400 text-lg mb-6">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} results for "${query}"`
                : `No results found for "${query}"`
              }
            </p>
          )}
        </div>

        {query ? (
          <>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map((item, index) => (
                  <MovieCard key={item.id} movie={item} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">No results found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Try searching for different keywords or check your spelling.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">Start your search</h3>
            <p className="text-gray-400">Enter a movie title, genre, or actor name to get started.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}