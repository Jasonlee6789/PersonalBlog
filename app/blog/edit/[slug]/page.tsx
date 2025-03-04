'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BlogForm } from '@/components/blog-form';
import { useAuth } from '@/contexts/auth-context';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
}

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const currentPost = posts.find((p: BlogPost) => p.slug === params.slug);
    if (currentPost) {
      setPost(currentPost);
    }
  }, [params.slug, isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <BlogForm
        initialData={{
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
        }}
        isEditing={true}
      />
    </div>
  );
}