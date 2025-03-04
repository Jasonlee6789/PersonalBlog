import { Metadata } from 'next';
import { BlogPostContent } from '../components/blog-post-content';

export const metadata: Metadata = {
  title: 'Blog Post | Jing Lee',
  description: 'Read blog post',
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostContent slug={params.slug} />;
}