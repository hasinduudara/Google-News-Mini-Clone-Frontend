import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NewsCard from './components/NewsCard';
import type { Article, NewsResponse } from './types';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for Filters
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 2. Build the URL with both params properly
        const params = new URLSearchParams();
        
        // Always send category if it's not "all"
        if (category !== 'all') {
            params.append('category', category);
        }
        
        // Only send search if the user typed something
        if (searchTerm) {
            params.append('search', searchTerm);
        }

        // 3. Fetch from Backend
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
  }, [category, searchTerm]); // <--- 4. Re-run when category OR search changes

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 5. Connected the Navbar props properly */}
      <Navbar 
        onCategoryChange={(cat) => {
            setCategory(cat);
            setSearchTerm(""); // Optional: Reset search when changing category
        }} 
        onSearch={(term) => setSearchTerm(term)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {searchTerm 
                ? `Search results for "${searchTerm}"`
                : (category === 'all' ? 'Top Headlines' : `${category} News`)
            }
          </h1>
        </div>

        {loading && (
             <div className="flex justify-center py-10">
                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
             </div>
        )}
        
        {error && <div className="text-red-500 bg-red-50 p-4 rounded">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length > 0 ? (
                articles.map((article) => (
                    <NewsCard key={article.uuid} article={article} />
                ))
            ) : (
                <div className="col-span-3 text-center text-gray-500 py-10">
                    No articles found. Try a different search.
                </div>
            )}
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;