import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Eye, ThumbsUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MovieCard } from '@/components/MovieCard';
import { MovieGridSkeleton } from '@/components/MovieSkeleton';
import { movies, trendingData } from '@/data/mockData';

export function TrendingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  
  const trendingMovies = movies.sort((a, b) => b.popularity - a.popularity);
  const topMovies = trendingMovies.slice(0, 10);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-8 bg-gray-800 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="h-64 bg-gray-800 rounded-lg animate-pulse" />
            <div className="h-64 bg-gray-800 rounded-lg animate-pulse" />
          </div>
          <MovieGridSkeleton count={10} />
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
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-white">Trending Now</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Discover what's popular and trending across our platform
          </p>
        </div>

        {/* Analytics Dashboard */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Analytics</h2>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChartType('line')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'line' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChartType('bar')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'bar' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Views Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Weekly Views</h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                {chartType === 'line' ? (
                  <LineChart data={trendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={trendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Bar dataKey="views" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </motion.div>

            {/* Engagement Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
            >
              <div className="flex items-center space-x-2 mb-4">
                <ThumbsUp className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Weekly Engagement</h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                {chartType === 'line' ? (
                  <LineChart data={trendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={trendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Bar dataKey="engagement" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { title: 'Total Views', value: '2.4M', change: '+12%', color: 'text-blue-400' },
              { title: 'Active Users', value: '185K', change: '+8%', color: 'text-green-400' },
              { title: 'Watch Time', value: '48.2K hrs', change: '+15%', color: 'text-purple-400' },
              { title: 'Engagement', value: '92%', change: '+5%', color: 'text-yellow-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
              >
                <h4 className="text-gray-400 text-sm font-medium mb-2">{stat.title}</h4>
                <div className="flex items-end space-x-2">
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Trending Movies */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Most Popular This Week</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {topMovies.map((movie, index) => (
              <div key={movie.id} className="relative">
                <div className="absolute -top-2 -left-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>
                <MovieCard movie={movie} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}