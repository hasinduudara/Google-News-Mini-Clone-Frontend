import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NewsCard from './components/NewsCard';
import type { Article, NewsResponse } from './types';

function App() {
  // State management
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Call your Spring Boot Backend
        const response = await fetch('http://localhost:8080/api/news/top');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news from backend');
        }

        const data: NewsResponse = await response.json();
        
        // Update state with the list of articles
        setArticles(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Could not load news. Is your Spring Boot backend running?');
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array = run once on load

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8 border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Top Headlines</h1>
          <p className="text-gray-500 mt-1">Global trending news delivered by Spring Boot</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.uuid} article={article} />
            ))}
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;