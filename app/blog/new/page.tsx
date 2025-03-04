import { Metadata } from 'next';
import { BlogForm } from '@/components/blog-form';

export const metadata: Metadata = {
  title: 'New Blog Post | Jing Lee',
  description: 'Create a new blog post',
};

export default function NewBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <BlogForm />
    </div>
  );
}