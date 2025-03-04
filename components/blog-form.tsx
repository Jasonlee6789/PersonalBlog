'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogFormProps {
  initialData?: {
    title: string;
    content: string;
    excerpt: string;
  };
  isEditing?: boolean;
}

export function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 这里添加保存博客文章的逻辑
      // 可以使用 localStorage 或者后端 API
      const savedPost = {
        ...formData,
        date: new Date().toISOString(),
        id: Date.now().toString(),
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      };

      // 临时使用 localStorage 存储
      const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
      posts.push(savedPost);
      localStorage.setItem('blog-posts', JSON.stringify(posts));

      router.push('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content (Markdown)
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={15}
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {isEditing ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}