import { apiClient } from './client';
import type { BlogPost, BlogPostListItem, DiscountOffer } from '../types/content';
import type { Paginated } from '../types/movie';

export async function fetchOffers(): Promise<DiscountOffer[]> {
  const { data } = await apiClient.get('/offers/');
  return data;
}

export async function fetchBlogPosts(): Promise<Paginated<BlogPostListItem>> {
  const { data } = await apiClient.get('/blog/');
  return data;
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const { data } = await apiClient.get(`/blog/${slug}/`);
  return data;
}
