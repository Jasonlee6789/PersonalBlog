'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    setPosts(savedPosts);
  }, []);

  const handleDelete = (id: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    const updatedPosts = posts.filter(post => post.id !== id);
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <>
              <Link
                href="/blog/new"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                New Post
              </Link>
              <button
                onClick={() => logout()}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                登出
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              登录
            </Link>
          )}
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600">No blog posts yet. Create your first post!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="text-sm text-gray-500 mb-4">
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Read More
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      href={`/blog/edit/${post.slug}`}
                      className="text-green-500 hover:text-green-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}