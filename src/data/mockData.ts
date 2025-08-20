export interface Movie {
  id: string;
  title: string;
  genre: string[];
  year: number;
  rating: number;
  description: string;
  cast: string[];
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  duration: string;
  ageRating: string;
  popularity: number;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription: string;
  myList: string[];
}

export const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", 
  "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"
];

export const movies: Movie[] = [
  {
    id: "1",
    title: "Quantum Nexus",
    genre: ["Sci-Fi", "Action"],
    year: 2024,
    rating: 8.7,
    description: "In a world where quantum physics meets reality, a team of scientists must prevent a catastrophic dimensional collapse that threatens the very fabric of existence.",
    cast: ["Ryan Gosling", "Margot Robbie", "Oscar Isaac"],
    posterUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "2h 18m",
    ageRating: "PG-13",
    popularity: 95
  },
  {
    id: "2",
    title: "The Last Symphony",
    genre: ["Drama", "Romance"],
    year: 2023,
    rating: 9.1,
    description: "A renowned pianist loses her hearing and must find new ways to connect with music and love in this emotionally charged drama.",
    cast: ["Emma Stone", "Adam Driver", "Viola Davis"],
    posterUrl: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "2h 7m",
    ageRating: "R",
    popularity: 88
  },
  {
    id: "3",
    title: "Digital Shadows",
    genre: ["Thriller", "Mystery"],
    year: 2024,
    rating: 8.3,
    description: "A cybersecurity expert discovers a sinister conspiracy hidden in the dark web that threatens global democracy.",
    cast: ["Timothée Chalamet", "Zendaya", "Michael Shannon"],
    posterUrl: "https://images.pexels.com/photos/7991226/pexels-photo-7991226.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991226/pexels-photo-7991226.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "1h 54m",
    ageRating: "R",
    popularity: 82
  },
  {
    id: "4",
    title: "Celestial Gardens",
    genre: ["Fantasy", "Adventure"],
    year: 2023,
    rating: 8.9,
    description: "A young botanist discovers a hidden realm where plants hold magical powers and must save both worlds from destruction.",
    cast: ["Anya Taylor-Joy", "Dev Patel", "Tilda Swinton"],
    posterUrl: "https://images.pexels.com/photos/7991304/pexels-photo-7991304.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991304/pexels-photo-7991304.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "2h 31m",
    ageRating: "PG-13",
    popularity: 91
  },
  {
    id: "5",
    title: "Urban Legends",
    genre: ["Horror", "Thriller"],
    year: 2024,
    rating: 7.8,
    description: "College students investigate local urban legends, only to discover that some myths are terrifyingly real.",
    cast: ["Jacob Elordi", "Jenna Ortega", "Brian Cox"],
    posterUrl: "https://images.pexels.com/photos/7991260/pexels-photo-7991260.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991260/pexels-photo-7991260.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "1h 43m",
    ageRating: "R",
    popularity: 76
  },
  {
    id: "6",
    title: "The Heist Chronicles",
    genre: ["Action", "Crime"],
    year: 2023,
    rating: 8.5,
    description: "A master thief assembles a team for the ultimate heist, but nothing goes according to plan in this adrenaline-fueled thriller.",
    cast: ["Idris Elba", "Charlize Theron", "John Boyega"],
    posterUrl: "https://images.pexels.com/photos/7991532/pexels-photo-7991532.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991532/pexels-photo-7991532.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "2h 12m",
    ageRating: "PG-13",
    popularity: 85
  },
  {
    id: "7",
    title: "Midnight Express",
    genre: ["Drama", "Action"],
    year: 2024,
    rating: 8.1,
    description: "A night train journey becomes a race against time when passengers discover a deadly conspiracy aboard.",
    cast: ["Michael B. Jordan", "Lupita Nyong'o", "Oscar Isaac"],
    posterUrl: "https://images.pexels.com/photos/7991378/pexels-photo-7991378.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991378/pexels-photo-7991378.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "1h 58m",
    ageRating: "R",
    popularity: 79
  },
  {
    id: "8",
    title: "Comedy Gold",
    genre: ["Comedy", "Romance"],
    year: 2023,
    rating: 7.9,
    description: "Two rival comedians are forced to work together and discover that sometimes the best punchlines come from the heart.",
    cast: ["Ryan Reynolds", "Zendaya", "Steve Carell"],
    posterUrl: "https://images.pexels.com/photos/7991609/pexels-photo-7991609.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991609/pexels-photo-7991609.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "1h 52m",
    ageRating: "PG-13",
    popularity: 73
  }
];

export const series = [
  {
    id: "s1",
    title: "Quantum Investigators",
    genre: ["Sci-Fi", "Mystery"],
    year: 2024,
    rating: 9.2,
    description: "A team of investigators uses quantum technology to solve crimes across multiple dimensions.",
    cast: ["Benedict Cumberbatch", "Tilda Swinton", "John Turturro"],
    posterUrl: "https://images.pexels.com/photos/7991421/pexels-photo-7991421.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991421/pexels-photo-7991421.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "8 episodes",
    ageRating: "TV-MA",
    popularity: 97,
    seasons: 2,
    episodes: 16
  },
  {
    id: "s2",
    title: "Corporate Shadows",
    genre: ["Drama", "Thriller"],
    year: 2023,
    rating: 8.8,
    description: "Inside the cutthroat world of corporate espionage where loyalty is a luxury few can afford.",
    cast: ["Sarah Paulson", "Brian Cox", "Jeremy Strong"],
    posterUrl: "https://images.pexels.com/photos/7991485/pexels-photo-7991485.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/7991485/pexels-photo-7991485.jpeg?auto=compress&cs=tinysrgb&w=1200",
    trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "10 episodes",
    ageRating: "TV-MA",
    popularity: 89,
    seasons: 3,
    episodes: 30
  }
];

export const reviews: Review[] = [
  {
    id: "r1",
    user: "MovieBuff2024",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    comment: "Absolutely stunning visuals and incredible storytelling. This is what cinema should be!",
    date: "2024-01-15"
  },
  {
    id: "r2",
    user: "CinemaLover",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 4,
    comment: "Great performances and solid direction. A few pacing issues but overall very enjoyable.",
    date: "2024-01-10"
  },
  {
    id: "r3",
    user: "FilmCritic87",
    avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    comment: "A masterpiece of modern filmmaking. The emotional depth is incredible.",
    date: "2024-01-08"
  }
];

export const trendingData = [
  { name: 'Week 1', views: 4000, engagement: 2400 },
  { name: 'Week 2', views: 3000, engagement: 1398 },
  { name: 'Week 3', views: 2000, engagement: 9800 },
  { name: 'Week 4', views: 2780, engagement: 3908 },
  { name: 'Week 5', views: 1890, engagement: 4800 },
  { name: 'Week 6', views: 2390, engagement: 3800 },
];

export const currentUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
  subscription: "Premium",
  myList: ["1", "3", "5"]
};