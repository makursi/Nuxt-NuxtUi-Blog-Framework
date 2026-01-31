export interface Post {
  Id: number;
  title: string;
  post_content: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  excerpt?: string;
  status?: 'draft' | 'published' | 'archived';
}