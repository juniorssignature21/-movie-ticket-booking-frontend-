import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { fetchBlogPost } from '../api/content';
import type { BlogPost } from '../types/content';

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); fetchBlogPost(slug).then(setPost).catch(() => setPost(null)).finally(() => setLoading(false)); }, [slug]);
  return <PageShell><article className="max-w-4xl mx-auto px-6 py-10">
    <Link to="/" className="text-primary text-sm hover:underline">← Back to home</Link>
    {loading ? <p className="text-gray-400 py-16">Loading article…</p> : !post ? <p className="text-gray-400 py-16">Article not found.</p> : <>
      <img src={post.image_url} alt="" className="w-full aspect-[16/9] object-cover rounded-2xl mt-6" />
      <p className="text-gray-400 text-sm mt-6">{post.author_name} · {new Date(post.published_date).toLocaleDateString()}</p>
      <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-3">{post.title}</h1>
      <p className="text-gray-300 text-lg mt-5">{post.excerpt}</p>
      <div className="text-gray-300 leading-8 mt-8 whitespace-pre-line">{post.content}</div>
    </>}
  </article></PageShell>;
}
