'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXContent } from '@/components/mdx-content';
import { SharePost } from '@/components/share-post';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Personal Blog`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const currentPost = posts.find((p: BlogPost) => p.slug === params.slug);
    if (currentPost) {
      setPost(currentPost);
    }
  }, [params.slug]);

  const handleDelete = () => {
    if (!post || !confirm('Are you sure you want to delete this post?')) return;

    const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const updatedPosts = posts.filter((p: BlogPost) => p.id !== post.id);
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
    router.push('/blog');
  };

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog" className="text-blue-500 hover:text-blue-600">
          ← Back to Blog
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
          Edit Post
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}