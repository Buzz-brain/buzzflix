import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List } from 'lucide-react';
import { MovieCard } from '@/components/MovieCard';
import { MovieGridSkeleton } from '@/components/MovieSkeleton';
import { series, genres } from '@/data/mockData';

export function SeriesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredSeries = series
    .filter(show => selectedGenre === 'All' || show.genre.includes(selectedGenre))
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return b.popularity - a.popularity;
      }
    });

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
          <h1 className="text-4xl font-bold text-white mb-6">TV Series</h1>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
              >
                <option value="All">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="year">Newest First</option>
              <option value="title">A-Z</option>
            </select>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <p className="text-gray-400 mb-6">
            Showing {filteredSeries.length} series
          </p>
        </div>

        {/* Series Grid */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            : "space-y-4"
        }>
          {filteredSeries.map((show, index) => (
            <MovieCard key={show.id} movie={show} index={index} />
          ))}
        </div>

        {filteredSeries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No series found matching your criteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}