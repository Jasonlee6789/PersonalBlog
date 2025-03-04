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
      // 生成 slug：使用时间戳和标题组合，避免中文 URL 编码问题
      const timestamp = new Date().getTime();
      const slug = `${timestamp}-${formData.title}`
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') // 保留中文字符，其他特殊字符替换为连字符
        .replace(/^-+|-+$/g, ''); // 移除首尾的连字符

      const savedPost = {
        ...formData,
        date: new Date().toISOString(),
        id: timestamp.toString(),
        slug,
      };

      // 如果是编辑模式，更新现有文章
      if (isEditing && initialData) {
        const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
        const updatedPosts = posts.map((post: any) =>
          post.title === initialData.title ? savedPost : post
        );
        localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
      } else {
        // 如果是新建模式，添加新文章
        const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
        posts.push(savedPost);
        localStorage.setItem('blog-posts', JSON.stringify(posts));
      }

      router.push('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('保存文章失败');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          标题
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
          摘要
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
          内容 (Markdown)
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
          {isEditing ? '更新文章' : '创建文章'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          取消
        </button>
      </div>
    </form>
  );
}