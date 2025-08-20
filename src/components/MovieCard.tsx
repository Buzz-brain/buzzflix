// ...existing code...
import { motion } from 'framer-motion';
import { Play, Plus, Check, Star } from 'lucide-react';
import { Movie } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const { isInMyList, addToMyList, removeFromMyList } = useApp();
  const navigate = useNavigate();
  const inMyList = isInMyList(movie.id);

  const handleMyListToggle = () => {
    if (inMyList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className="relative group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[2/3]">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle play action
              }}
            >
              <Play className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleMyListToggle();
              }}
              className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              {inMyList ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 text-xs text-white">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span>{movie.rating}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="mt-2 space-y-1">
        <h3 className="text-white font-semibold text-sm line-clamp-2">{movie.title}</h3>
        <p className="text-gray-400 text-xs">{movie.year} • {movie.duration}</p>
        <p className="text-gray-500 text-xs">{movie.genre.join(', ')}</p>
      </div>
    </motion.div>
  );
}