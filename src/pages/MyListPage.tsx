import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { MovieCard } from '@/components/MovieCard';
import { MovieGridSkeleton } from '@/components/MovieSkeleton';
import { useApp } from '@/contexts/AppContext';
import { movies, series } from '@/data/mockData';

export function MyListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { myList, removeFromMyList } = useApp();
  
  const allContent = [...movies, ...series];
  const myListMovies = allContent.filter(item => myList.includes(item.id));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-8 bg-gray-800 rounded w-32 mb-8 animate-pulse" />
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-red-600 fill-current" />
              <h1 className="text-4xl font-bold text-white">My List</h1>
            </div>
            
            {myListMovies.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  myList.forEach(id => removeFromMyList(id));
                }}
                className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-red-600/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </motion.button>
            )}
          </div>
          
          <p className="text-gray-400 text-lg">
            {myListMovies.length > 0 
              ? `You have ${myListMovies.length} ${myListMovies.length === 1 ? 'item' : 'items'} in your list`
              : 'Your list is empty'
            }
          </p>
        </div>

        {myListMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myListMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">Your list is empty</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Start adding movies and series to your list to keep track of what you want to watch.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Browse Content
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}