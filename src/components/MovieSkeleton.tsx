// ...existing code...
import { motion } from 'framer-motion';

export function MovieSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      <div className="bg-gray-800 rounded-lg aspect-[2/3] animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-800 rounded animate-pulse" />
        <div className="h-3 bg-gray-800 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gray-800 rounded w-1/2 animate-pulse" />
      </div>
    </motion.div>
  );
}

interface MovieGridSkeletonProps {
  count?: number;
}

export function MovieGridSkeleton({ count = 20 }: MovieGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  );
}