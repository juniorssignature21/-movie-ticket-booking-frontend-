import React, { useEffect, useState } from 'react';
import { fetchBlogPosts } from '../api/content';
import type { BlogPostListItem } from '../types/content';

export const NollyGist: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => setPosts(data.results.slice(0, 2)))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && posts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-6 md:px-12 lg:px-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
        {/* Header Block (Centered) */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Nolly Gist</h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-3 mb-4" />
          <p className="text-gray-400 text-sm md:text-base">
            Stay updated with the latest Nollywood news, celebrity buzz, blockbuster releases, behind the scenes
            stories, and exclusive entertainment updates all in one place.
          </p>
        </div>

        {/* 2-Column Layout of Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col bg-card border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/20 transition-all duration-300"
            >
              {/* Blog Image */}
              <div className="aspect-[16/9] w-full overflow-hidden relative">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Blog Content */}
              <div className="p-6 flex flex-col justify-between flex-grow text-left">
                <h3 className="text-white font-bold text-base sm:text-lg md:text-xl leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-6">
                  {/* Author Avatar */}
                  <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-sm shadow-purple-900/50 overflow-hidden">
                    <img
                      src={post.author_image_url}
                      alt={post.author_name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm">{post.author_name}</span>
                    <span className="text-gray-400 text-xs mt-0.5">
                      {new Date(post.published_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NollyGist;
