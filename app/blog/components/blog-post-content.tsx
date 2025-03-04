'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
}

export function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
      console.log('Looking for post with slug:', slug);
      console.log('Available posts:', posts);

      // 对 URL 中的 slug 进行解码，因为它可能包含编码后的中文字符
      const decodedSlug = decodeURIComponent(slug);
      console.log('Decoded slug:', decodedSlug);

      const currentPost = posts.find((p: BlogPost) => p.slug === decodedSlug);

      if (currentPost) {
        console.log('Found post:', currentPost);
        setPost(currentPost);
      } else {
        console.log('Post not found');
        router.push('/blog'); // 如果找不到文章，重定向到博客列表页
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  const handleDelete = () => {
    if (!post || !confirm('确定要删除这篇文章吗？')) return;

    const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const updatedPosts = posts.filter((p: BlogPost) => p.id !== post.id);
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
    router.push('/blog');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">加载中...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">未找到文章</p>
          <Link href="/blog" className="text-blue-500 hover:text-blue-600">
            返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog" className="text-blue-500 hover:text-blue-600">
          ← 返回博客列表
        </Link>
      </div>

      <article className="prose lg:prose-xl">
        <h1>{post.title}</h1>
        <div className="text-gray-500 mb-8">
          {new Date(post.date).toLocaleDateString()}
        </div>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

      <div className="mt-8 flex gap-4">
        <Link
          href={`/blog/edit/${post.slug}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          编辑文章
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          删除文章
        </button>
      </div>
    </div>
  );
}