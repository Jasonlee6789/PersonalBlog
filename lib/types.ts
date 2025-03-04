import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface Post {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  content: MDXRemoteSerializeResult;
  readingTime: string;
  [key: string]: any; // 用于其他可能的元数据
}

export interface SearchResult {
  posts: Post[];
  query: string;
}