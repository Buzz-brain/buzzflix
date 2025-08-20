import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { currentUser } from '@/data/mockData';

interface AppContextType {
  myList: string[];
  addToMyList: (movieId: string) => void;
  removeFromMyList: (movieId: string) => void;
  isInMyList: (movieId: string) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentUser: typeof currentUser;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [myList, setMyList] = useLocalStorage<string[]>('myList', currentUser.myList);
  const [searchQuery, setSearchQuery] = useLocalStorage<string>('searchQuery', '');

  const addToMyList = (movieId: string) => {
    setMyList(prev => [...prev, movieId]);
  };

  const removeFromMyList = (movieId: string) => {
    setMyList(prev => prev.filter(id => id !== movieId));
  };

  const isInMyList = (movieId: string) => {
    return myList.includes(movieId);
  };

  const value = {
    myList,
    addToMyList,
    removeFromMyList,
    isInMyList,
    searchQuery,
    setSearchQuery,
    currentUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}