export interface AdminUser {
  id: string;
  name: string;
  email: string;
  subscription: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
}

export interface AdminMovie {
  id: string;
  title: string;
  genre: string[];
  year: number;
  rating: number;
  duration: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  revenue: number;
}

export interface AdminReview {
  id: string;
  userId: string;
  movieId: string;
  userName: string;
  movieTitle: string;
  rating: number;
  comment: string;
  date: string;
  hasImage: boolean;
  imageUrl?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface QueryPerformance {
  date: string;
  structuredQuery: number;
  unstructuredQuery: number;
  hybridQuery: number;
}

export interface StorageMetrics {
  structured: number;
  unstructured: number;
  total: number;
}

export interface KPIMetrics {
  totalUsers: number;
  totalMovies: number;
  totalReviews: number;
  storageUsage: number;
  avgQuerySpeed: number;
  activeUsers: number;
}

// Mock Admin Users
export const adminUsers: AdminUser[] = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@streamflix.com",
    subscription: "Premium",
    joinDate: "2023-01-15",
    status: "active",
    lastLogin: "2024-01-20"
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah.j@streamflix.com",
    subscription: "Basic",
    joinDate: "2023-03-22",
    status: "active",
    lastLogin: "2024-01-19"
  },
  {
    id: "u3",
    name: "Mike Chen",
    email: "mike.chen@streamflix.com",
    subscription: "Premium",
    joinDate: "2023-06-10",
    status: "inactive",
    lastLogin: "2024-01-10"
  },
  {
    id: "u4",
    name: "Emily Davis",
    email: "emily.davis@streamflix.com",
    subscription: "Standard",
    joinDate: "2023-08-05",
    status: "active",
    lastLogin: "2024-01-20"
  },
  {
    id: "u5",
    name: "Alex Rodriguez",
    email: "alex.r@streamflix.com",
    subscription: "Premium",
    joinDate: "2023-11-12",
    status: "suspended",
    lastLogin: "2024-01-15"
  }
];

// Mock Admin Movies
export const adminMovies: AdminMovie[] = [
  {
    id: "m1",
    title: "Quantum Nexus",
    genre: ["Sci-Fi", "Action"],
    year: 2024,
    rating: 8.7,
    duration: "2h 18m",
    status: "published",
    views: 1250000,
    revenue: 2500000
  },
  {
    id: "m2",
    title: "The Last Symphony",
    genre: ["Drama", "Romance"],
    year: 2023,
    rating: 9.1,
    duration: "2h 7m",
    status: "published",
    views: 980000,
    revenue: 1800000
  },
  {
    id: "m3",
    title: "Digital Shadows",
    genre: ["Thriller", "Mystery"],
    year: 2024,
    rating: 8.3,
    duration: "1h 54m",
    status: "published",
    views: 750000,
    revenue: 1200000
  },
  {
    id: "m4",
    title: "Celestial Gardens",
    genre: ["Fantasy", "Adventure"],
    year: 2023,
    rating: 8.9,
    duration: "2h 31m",
    status: "published",
    views: 1100000,
    revenue: 2200000
  },
  {
    id: "m5",
    title: "Urban Legends",
    genre: ["Horror", "Thriller"],
    year: 2024,
    rating: 7.8,
    duration: "1h 43m",
    status: "draft",
    views: 0,
    revenue: 0
  }
];

// Mock Admin Reviews
export const adminReviews: AdminReview[] = [
  {
    id: "r1",
    userId: "u1",
    movieId: "m1",
    userName: "John Smith",
    movieTitle: "Quantum Nexus",
    rating: 5,
    comment: "Absolutely stunning visuals and incredible storytelling. This is what cinema should be!",
    date: "2024-01-15",
    hasImage: true,
    imageUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    sentiment: "positive"
  },
  {
    id: "r2",
    userId: "u2",
    movieId: "m2",
    userName: "Sarah Johnson",
    movieTitle: "The Last Symphony",
    rating: 4,
    comment: "Great performances and solid direction. A few pacing issues but overall very enjoyable.",
    date: "2024-01-10",
    hasImage: false,
    sentiment: "positive"
  },
  {
    id: "r3",
    userId: "u3",
    movieId: "m1",
    userName: "Mike Chen",
    movieTitle: "Quantum Nexus",
    rating: 5,
    comment: "A masterpiece of modern filmmaking. The emotional depth is incredible.",
    date: "2024-01-08",
    hasImage: true,
    imageUrl: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400",
    sentiment: "positive"
  },
  {
    id: "r4",
    userId: "u4",
    movieId: "m3",
    userName: "Emily Davis",
    movieTitle: "Digital Shadows",
    rating: 3,
    comment: "Decent thriller but predictable plot. Could have been better.",
    date: "2024-01-12",
    hasImage: false,
    sentiment: "neutral"
  },
  {
    id: "r5",
    userId: "u5",
    movieId: "m4",
    userName: "Alex Rodriguez",
    movieTitle: "Celestial Gardens",
    rating: 2,
    comment: "Too long and boring. Couldn't finish watching it.",
    date: "2024-01-05",
    hasImage: false,
    sentiment: "negative"
  }
];

// Mock Query Performance Data
export const queryPerformanceData: QueryPerformance[] = [
  { date: "Jan 1", structuredQuery: 45, unstructuredQuery: 78, hybridQuery: 120 },
  { date: "Jan 2", structuredQuery: 42, unstructuredQuery: 82, hybridQuery: 115 },
  { date: "Jan 3", structuredQuery: 38, unstructuredQuery: 75, hybridQuery: 108 },
  { date: "Jan 4", structuredQuery: 41, unstructuredQuery: 79, hybridQuery: 112 },
  { date: "Jan 5", structuredQuery: 39, unstructuredQuery: 73, hybridQuery: 105 },
  { date: "Jan 6", structuredQuery: 44, unstructuredQuery: 81, hybridQuery: 118 },
  { date: "Jan 7", structuredQuery: 37, unstructuredQuery: 76, hybridQuery: 110 }
];

// Mock Storage Metrics
export const storageMetrics: StorageMetrics = {
  structured: 2.4, // GB
  unstructured: 8.7, // GB
  total: 11.1 // GB
};

// Mock KPI Metrics
export const kpiMetrics: KPIMetrics = {
  totalUsers: 15420,
  totalMovies: 2847,
  totalReviews: 45230,
  storageUsage: 11.1, // GB
  avgQuerySpeed: 85, // ms
  activeUsers: 12340
};

// Mock Record Counts for Charts
export const recordCounts = [
  { name: 'Users', count: 15420, color: '#3B82F6' },
  { name: 'Movies', count: 2847, color: '#EF4444' },
  { name: 'Reviews', count: 45230, color: '#10B981' },
  { name: 'Sessions', count: 89450, color: '#F59E0B' }
];

// Mock Query Types Performance
export const queryTypePerformance = [
  { type: 'SELECT', avgSpeed: 45, count: 1250 },
  { type: 'INSERT', avgSpeed: 32, count: 890 },
  { type: 'UPDATE', avgSpeed: 58, count: 650 },
  { type: 'DELETE', avgSpeed: 28, count: 120 },
  { type: 'HYBRID', avgSpeed: 112, count: 340 }
];

// Mock Admin Profile
export const adminProfile = {
  id: "admin1",
  name: "Admin User",
  email: "admin@streamflix.com",
  role: "Super Admin",
  avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
  permissions: ["read", "write", "delete", "admin"],
  lastLogin: "2024-01-20T10:30:00Z",
  preferences: {
    theme: "dark",
    notifications: true,
    autoRefresh: 30
  }
};