import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NewsCard from './components/NewsCard';
import type { Article, NewsResponse } from './types';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams();
        if (category !== 'all') params.append('category', category);
        if (searchTerm) params.append('search', searchTerm);

        const response = await fetch(`http://localhost:8080/api/news?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch');

        const data: NewsResponse = await response.json();
        
        setArticles(data.data);

      } catch (err) {
        console.error(err);
        setError('Could not load news.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchTerm]);

  const handleFilterChange = (newCategory: string) => {
      setCategory(newCategory);
      setSearchTerm("");
  };

  const handleSearch = (term: string) => {
      setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar onCategoryChange={handleFilterChange} onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {searchTerm ? `Search: ${searchTerm}` : (category === 'all' ? 'Top Headlines' : category)}
          </h1>
        </div>

        {error && <div className="text-red-500 bg-red-50 p-4 rounded">{error}</div>}

        {!loading && articles.length === 0 && !error && (
          <div className="text-center text-gray-500 py-8">
            No articles found. Try a different category or search term.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
                <NewsCard key={`${article.uuid}-${index}`} article={article} />
            ))}
        </div>

        {loading && (
             <div className="flex justify-center py-8">
                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
             </div>
        )}

      </main>
    </div>
  );
}

export default App;