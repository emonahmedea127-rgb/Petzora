import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article } from '../types';

interface SavedArticlesContextType {
  savedArticleSlugs: string[];
  savedArticles: Article[];
  toggleSaveArticle: (article: Article) => void;
  isArticleSaved: (slug: string) => boolean;
  clearSavedArticles: () => void;
}

const SavedArticlesContext = createContext<SavedArticlesContextType | undefined>(undefined);

export const SavedArticlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem('petzora_saved_articles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('petzora_saved_articles', JSON.stringify(savedArticles));
    } catch {
      // localStorage may fail in restricted iframes or quotas
    }
  }, [savedArticles]);

  const toggleSaveArticle = (article: Article) => {
    setSavedArticles((prev) => {
      const exists = prev.some((a) => a.slug === article.slug);
      if (exists) {
        return prev.filter((a) => a.slug !== article.slug);
      } else {
        return [article, ...prev];
      }
    });
  };

  const isArticleSaved = (slug: string) => {
    return savedArticles.some((a) => a.slug === slug);
  };

  const clearSavedArticles = () => {
    setSavedArticles([]);
  };

  const savedArticleSlugs = savedArticles.map((a) => a.slug);

  return (
    <SavedArticlesContext.Provider
      value={{
        savedArticleSlugs,
        savedArticles,
        toggleSaveArticle,
        isArticleSaved,
        clearSavedArticles,
      }}
    >
      {children}
    </SavedArticlesContext.Provider>
  );
};

export const useSavedArticles = () => {
  const context = useContext(SavedArticlesContext);
  if (!context) {
    throw new Error('useSavedArticles must be used within a SavedArticlesProvider');
  }
  return context;
};
