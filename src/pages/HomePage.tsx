import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { MovieCarousel } from '@/components/MovieCarousel';
import { MovieGridSkeleton } from '@/components/MovieSkeleton';
import { movies, series, genres } from '@/data/mockData';

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const featuredMovies = movies.slice(0, 5);
  const trendingMovies = movies.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
  const actionMovies = movies.filter(movie => movie.genre.includes('Action'));
  const dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
  const sciFiMovies = movies.filter(movie => movie.genre.includes('Sci-Fi'));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-16">
        <div className="animate-pulse">
          <div className="h-screen bg-gray-800" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 py-12 space-y-12">
          <MovieGridSkeleton count={6} />
          <MovieGridSkeleton count={6} />
          <MovieGridSkeleton count={6} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black"
    >
      <HeroSection movies={featuredMovies} />
      
      <div className="container mx-auto px-4 lg:px-8 py-12 space-y-12">
        <MovieCarousel title="Trending Now" movies={trendingMovies} />
        <MovieCarousel title="Popular Series" movies={series} />
        <MovieCarousel title="Action Movies" movies={actionMovies} />
        <MovieCarousel title="Drama Collection" movies={dramaMovies} />
        <MovieCarousel title="Sci-Fi Adventures" movies={sciFiMovies} />
      </div>
    </motion.div>
  );
}