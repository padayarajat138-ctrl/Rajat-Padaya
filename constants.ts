import { SlideData } from './types';

// Using a more reliable music source
export const BACKGROUND_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3"; 

// Helper to proxy images to prevent hotlink 403 errors
const proxy = (url: string) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800&q=80`;

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Happy Birthday Shinchan! 🎈",
    description: "Welcome to your magical day! Just like Shinchan, you bring laughter, innocence, and a bit of mischievous fun into everyone's life. Never lose that spark!",
    // Shinchan Birthday Banner
    image: proxy("https://images.ottplay.com/images/crayon-shin-chan-715.jpg"), 
    bgGradient: "from-yellow-200 via-red-200 to-pink-200",
    theme: 'shinchan'
  },
  {
    id: 2,
    title: "Main Apni Favourite Hoon! 💃",
    description: "Confidence looks good on you! Like Geet, you are full of life, self-love, and unfiltered honesty. Keep shining and loving yourself fiercely.",
    // Geet (Kareena Kapoor) from Jab We Met
    image: proxy("https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/10/kareena-kapoor-1572070335.jpg"), 
    bgGradient: "from-purple-200 via-pink-200 to-red-200",
    theme: 'geet'
  },
  {
    id: 3,
    title: "Together Through It All 🤝",
    description: "Like the journey in Sita Ramam, success isn't just about the destination, but who stands by you. Your hard work and patience are building something beautiful.",
    // Sita Ramam (Dulquer & Mrunal)
    image: proxy("https://images.indianexpress.com/2022/08/sita-ramam-review-1200.jpg"),
    bgGradient: "from-blue-200 via-indigo-200 to-purple-200",
    theme: 'motivation'
  },
  {
    id: 4,
    title: "CA Kratika Gupta 🎓",
    description: "I believe in you. The late nights, the books, the struggle—it's all leading to this moment. You are going to make your parents so proud. Keep going!",
    // Shahid and Kareena at Book Stall (Jab We Met) or similar studious vibe
    image: proxy("https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/74637372.jpg"), 
    bgGradient: "from-emerald-200 via-teal-200 to-cyan-200",
    theme: 'ca'
  }
];

export const MEMORIES = [
  { id: 1, src: proxy("https://images.unsplash.com/photo-1529156069898-49953e39b3ac"), caption: "Late Night Talks 🌙" },
  { id: 2, src: proxy("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846"), caption: "Crazy Adventures 🚗" },
  { id: 3, src: proxy("https://images.unsplash.com/photo-1523240795612-9a054b0db644"), caption: "Study Buddies 📚" },
  { id: 4, src: proxy("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"), caption: "Foodie Partners 🍕" },
  { id: 5, src: proxy("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"), caption: "Travelling the World 🌍" },
];