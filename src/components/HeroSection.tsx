import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Info, Check } from 'lucide-react';
import { Movie } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  movies: Movie[];
}

export function HeroSection({ movies }: HeroSectionProps) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const { isInMyList, addToMyList, removeFromMyList } = useApp();
  const navigate = useNavigate();
  
  const currentMovie = movies[currentMovieIndex];
  const inMyList = currentMovie ? isInMyList(currentMovie.id) : false;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMovieIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const handleMyListToggle = () => {
    if (currentMovie) {
      if (inMyList) {
        removeFromMyList(currentMovie.id);
      } else {
        addToMyList(currentMovie.id);
      }
    }
  };

  if (!currentMovie) return null;

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentMovie.backdropUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <motion.h1
              key={`title-${currentMovie.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-4"
            >
              {currentMovie.title}
            </motion.h1>

            <motion.p
              key={`desc-${currentMovie.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-200 mb-6 line-clamp-3"
            >
              {currentMovie.description}
            </motion.p>

            <motion.div
              key={`meta-${currentMovie.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-4 text-gray-300 mb-8"
            >
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                {currentMovie.ageRating}
              </span>
              <span>{currentMovie.year}</span>
              <span>{currentMovie.duration}</span>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span>{currentMovie.rating}</span>
              </div>
            </motion.div>

            <motion.div
              key={`buttons-${currentMovie.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Play</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMyListToggle}
                className="bg-gray-600/80 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-500/80 transition-colors"
              >
                {inMyList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{inMyList ? 'In My List' : 'My List'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="bg-gray-600/50 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-500/50 transition-colors"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex space-x-2">
          {movies.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMovieIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentMovieIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}