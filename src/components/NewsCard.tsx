import React from 'react';
import type { Article } from '../types';

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={article.image_url} 
          alt={article.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=News';
          }}
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1">
            {article.source}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col grow">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                {article.categories[0]}
            </span>
            <span className="text-xs text-gray-400">
                {new Date(article.published_at).toLocaleDateString()}
            </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 hover:text-blue-600 cursor-pointer">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 grow">
          {article.snippet}
        </p>

        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-auto text-blue-600 font-medium hover:underline text-sm"
        >
          Read full story &rarr;
        </a>
      </div>
    </div>
  );
};

export default NewsCard;