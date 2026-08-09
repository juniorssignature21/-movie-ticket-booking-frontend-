export interface DiscountOffer {
  id: number;
  title: string;
  image_url: string;
  movie: number | null;
  original_price: string;
  discount_percent: number;
  final_price: string;
  is_banner: boolean;
  banner_subtitle: string;
}

export interface BlogPostListItem {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  excerpt: string;
  author_name: string;
  author_image_url: string;
  published_date: string;
}

export interface BlogPost extends BlogPostListItem {
  content: string;
}
