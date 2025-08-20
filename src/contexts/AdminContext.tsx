import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  AdminUser, 
  AdminMovie, 
  AdminReview, 
  adminUsers as initialUsers,
  adminMovies as initialMovies,
  adminReviews as initialReviews,
  adminProfile
} from '@/data/adminMockData';

interface AdminContextType {
  // Authentication
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  adminProfile: typeof adminProfile;

  // Users Management
  users: AdminUser[];
  addUser: (user: Omit<AdminUser, 'id'>) => void;
  updateUser: (id: string, user: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;

  // Movies Management
  movies: AdminMovie[];
  addMovie: (movie: Omit<AdminMovie, 'id'>) => void;
  updateMovie: (id: string, movie: Partial<AdminMovie>) => void;
  deleteMovie: (id: string) => void;

  // Reviews Management
  reviews: AdminReview[];
  addReview: (review: Omit<AdminReview, 'id'>) => void;
  updateReview: (id: string, review: Partial<AdminReview>) => void;
  deleteReview: (id: string) => void;

  // Query Builder
  executeHybridQuery: (query: any) => Promise<any[]>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useLocalStorage('adminAuth', false);
  const [users, setUsers] = useLocalStorage<AdminUser[]>('adminUsers', initialUsers);
  const [movies, setMovies] = useLocalStorage<AdminMovie[]>('adminMovies', initialMovies);
  const [reviews, setReviews] = useLocalStorage<AdminReview[]>('adminReviews', initialReviews);

  const adminLogin = (email: string, password: string): boolean => {
    // Mock authentication - in real app, this would call an API
    if (email === 'admin@streamflix.com' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  // Users Management
  const addUser = (user: Omit<AdminUser, 'id'>) => {
    const newUser: AdminUser = {
      ...user,
      id: `u${Date.now()}`
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updatedUser: Partial<AdminUser>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  // Movies Management
  const addMovie = (movie: Omit<AdminMovie, 'id'>) => {
    const newMovie: AdminMovie = {
      ...movie,
      id: `m${Date.now()}`
    };
    setMovies(prev => [...prev, newMovie]);
  };

  const updateMovie = (id: string, updatedMovie: Partial<AdminMovie>) => {
    setMovies(prev => prev.map(movie => 
      movie.id === id ? { ...movie, ...updatedMovie } : movie
    ));
  };

  const deleteMovie = (id: string) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  // Reviews Management
  const addReview = (review: Omit<AdminReview, 'id'>) => {
    const newReview: AdminReview = {
      ...review,
      id: `r${Date.now()}`
    };
    setReviews(prev => [...prev, newReview]);
  };

  const updateReview = (id: string, updatedReview: Partial<AdminReview>) => {
    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, ...updatedReview } : review
    ));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  };

  // Mock Hybrid Query Execution
  const executeHybridQuery = async (query: any): Promise<any[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock query execution logic
    let results: any[] = [];
    
    if (query.entity === 'users' && query.joinWith === 'reviews') {
      results = users.map(user => {
        const userReviews = reviews.filter(review => review.userId === user.id);
        return {
          ...user,
          reviewCount: userReviews.length,
          avgRating: userReviews.length > 0 
            ? userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length 
            : 0,
          reviews: userReviews
        };
      });
    } else if (query.entity === 'movies' && query.joinWith === 'reviews') {
      results = movies.map(movie => {
        const movieReviews = reviews.filter(review => review.movieId === movie.id);
        return {
          ...movie,
          reviewCount: movieReviews.length,
          avgUserRating: movieReviews.length > 0 
            ? movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length 
            : 0,
          reviews: movieReviews
        };
      });
    }

    // Apply filters
    if (query.filters) {
      query.filters.forEach((filter: any) => {
        results = results.filter(item => {
          const value = item[filter.field];
          switch (filter.operator) {
            case '>':
              return value > filter.value;
            case '<':
              return value < filter.value;
            case '>=':
              return value >= filter.value;
            case '<=':
              return value <= filter.value;
            case '=':
              return value === filter.value;
            case 'contains':
              return value.toString().toLowerCase().includes(filter.value.toLowerCase());
            default:
              return true;
          }
        });
      });
    }

    return results;
  };

  const value = {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    adminProfile,
    users,
    addUser,
    updateUser,
    deleteUser,
    movies,
    addMovie,
    updateMovie,
    deleteMovie,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    executeHybridQuery
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}