import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import { Post } from './types';

const POSTS_DIRECTORY = path.join(process.cwd(), 'app/_posts');

export async function getAllPosts(): Promise<Post[]> {
  // 确保目录存在
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const fullPath = path.join(POSTS_DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const mdxSource = await serialize(content);
        const readTime = readingTime(content);

        return {
          slug,
          title: data.title,
          date: data.date,
          coverImage: data.coverImage || '/images/default-cover.jpg',
          excerpt: data.excerpt || content.slice(0, 200) + '...',
          content: mdxSource,
          readingTime: readTime.text,
          ...data,
        };
      })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      const mdPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
      if (!fs.existsSync(mdPath)) {
        return null;
      }
    }

    const fileContents = fs.readFileSync(
      fs.existsSync(fullPath) ? fullPath : path.join(POSTS_DIRECTORY, `${slug}.md`),
      'utf8'
    );
    const { data, content } = matter(fileContents);
    const mdxSource = await serialize(content);
    const readTime = readingTime(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      coverImage: data.coverImage || '/images/default-cover.jpg',
      excerpt: data.excerpt || content.slice(0, 200) + '...',
      content: mdxSource,
      readingTime: readTime.text,
      ...data,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getAllPosts();
  const searchQuery = query.toLowerCase();

  return posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery) ||
    post.excerpt.toLowerCase().includes(searchQuery)
  );
}

// Sample posts data (in a real app, this would come from a CMS or markdown files)
const SAMPLE_POSTS = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    date: '2023-05-15',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    excerpt: 'Learn how to build modern web applications with Next.js, the React framework for production.',
    content: `
# Getting Started with Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and more. It's designed to make building React applications easier and more efficient.

## Why Next.js?

- **Server-side Rendering (SSR)**: Improves performance and SEO
- **Static Site Generation (SSG)**: Pre-renders pages at build time
- **API Routes**: Build API endpoints as part of your Next.js app
- **File-based Routing**: Create routes based on your file structure
- **Built-in CSS Support**: Import CSS files directly in your components

## Setting Up a Next.js Project

To create a new Next.js project, run:

\`\`\`bash
npx create-next-app@latest my-next-app
\`\`\`

This will set up a new Next.js project with all the necessary configurations.

## Project Structure

A typical Next.js project structure looks like this:

\`\`\`
my-next-app/
  ├── pages/
  │   ├── _app.js
  │   ├── index.js
  │   └── about.js
  ├── public/
  │   └── favicon.ico
  ├── styles/
  │   ├── globals.css
  │   └── Home.module.css
  ├── package.json
  └── next.config.js
\`\`\`

## Creating Pages

In Next.js, pages are React components exported from files in the \`pages\` directory. Each page is associated with a route based on its file name.

For example, \`pages/about.js\` will be accessible at \`/about\`.

\`\`\`jsx
// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page of our website.</p>
    </div>
  );
}
\`\`\`

## Data Fetching

Next.js provides several ways to fetch data for your pages:

### getStaticProps

Use \`getStaticProps\` to fetch data at build time:

\`\`\`jsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
\`\`\`

### getServerSideProps

Use \`getServerSideProps\` to fetch data on each request:

\`\`\`jsx
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
\`\`\`

## Conclusion

Next.js provides a powerful framework for building React applications with features like server-side rendering, static site generation, and API routes. It's a great choice for building modern web applications.

For more information, check out the [Next.js documentation](https://nextjs.org/docs).
    `,
    readingTime: 5,
  },
  {
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS',
    date: '2023-06-22',
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    excerpt: 'Learn how to use Tailwind CSS to build beautiful, responsive user interfaces quickly and efficiently.',
    content: `
# Mastering Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without ever leaving your HTML. It provides low-level utility classes that let you build completely custom designs.

## Why Tailwind CSS?

- **Utility-First**: Build custom designs without writing CSS
- **Responsive**: Built-in responsive design utilities
- **Component-Friendly**: Extract reusable components
- **Customizable**: Tailor the framework to your design system
- **Performance**: Optimize for production with PurgeCSS

## Setting Up Tailwind CSS

To add Tailwind CSS to your project, install it via npm:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Configure your template paths in \`tailwind.config.js\`:

\`\`\`js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

Add Tailwind directives to your CSS:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## Basic Usage

Tailwind provides utility classes for almost everything:

### Typography

\`\`\`html
<h1 class="text-3xl font-bold text-blue-600">Hello World</h1>
<p class="text-gray-700 text-lg">This is a paragraph with Tailwind CSS.</p>
\`\`\`

### Layout

\`\`\`html
<div class="container mx-auto px-4 py-8">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Content -->
  </div>
</div>
\`\`\`

### Flexbox

\`\`\`html
<div class="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>
\`\`\`

### Responsive Design

Tailwind includes responsive variants that let you build responsive designs easily:

\`\`\`html
<div class="text-center md:text-left">
  <!-- Centers text on mobile, left-aligns on medium screens and up -->
</div>
\`\`\`

## Extracting Components

When you find yourself repeating the same patterns of utilities, extract them into reusable components:

\`\`\`jsx
// Button.js
export function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

## Customizing Tailwind

You can customize Tailwind by modifying your \`tailwind.config.js\` file:

\`\`\`js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
\`\`\`

## Conclusion

Tailwind CSS provides a different approach to styling your applications. Instead of writing custom CSS, you use utility classes to build your designs directly in your HTML. This approach can significantly speed up your development process and make your codebase more maintainable.

For more information, check out the [Tailwind CSS documentation](https://tailwindcss.com/docs).
    `,
    readingTime: 6,
  },
  {
    slug: 'building-a-blog-with-nextjs-and-mdx',
    title: 'Building a Blog with Next.js and MDX',
    date: '2023-07-10',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    excerpt: 'Learn how to create a blog using Next.js and MDX for rich content with React components.',
    content: `
# Building a Blog with Next.js and MDX

MDX is a format that lets you write JSX in your markdown documents. You can import components, like interactive charts or alerts, and embed them within your content.

## Why Next.js and MDX?

- **Rich Content**: Embed React components in your markdown
- **Static Generation**: Pre-render blog posts at build time
- **Dynamic Routes**: Create pages for each blog post
- **SEO Friendly**: Optimize your blog for search engines
- **Developer Experience**: Great DX with hot reloading

## Setting Up Your Blog

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-blog
cd my-blog
\`\`\`

Install the necessary dependencies:

\`\`\`bash
npm install next-mdx-remote gray-matter reading-time
\`\`\`

## Project Structure

A typical blog structure might look like this:

\`\`\`
my-blog/
  ├── pages/
  │   ├── index.js
  │   ├── blog/
  │   │   └── [slug].js
  ├── posts/
  │   ├── hello-world.mdx
  │   └── getting-started.mdx
  ├── components/
  │   ├── Layout.js
  │   └── MDXComponents.js
  └── lib/
      └── posts.js
\`\`\`

## Creating the Posts Library

Create a utility to load and parse your MDX files:

\`\`\`jsx
// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, \`\${slug}.mdx\`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse the frontmatter
  const { data, content } = matter(fileContents);

  // Calculate reading time
  const readingTimeResult = readingTime(content);

  // Serialize the content
  const mdxSource = await serialize(content);

  return {
    slug,
    frontmatter: {
      ...data,
      readingTime: readingTimeResult.text,
    },
    content: mdxSource,
  };
}

export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\\.mdx$/, '');
      const post = await getPostBySlug(slug);

      return {
        slug,
        ...post.frontmatter,
      };
    })
  );

  // Sort posts by date
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
\`\`\`

## Creating Blog Post Pages

Create a dynamic route for blog posts:

\`\`\`jsx
// pages/blog/[slug].js
import { MDXRemote } from 'next-mdx-remote';
import { getPostBySlug, getAllPosts } from '../../lib/posts';
import Layout from '../../components/Layout';
import MDXComponents from '../../components/MDXComponents';

export default function Post({ post }) {
  return (
    <Layout>
      <article>
        <h1>{post.frontmatter.title}</h1>
        <div>
          <time>{post.frontmatter.date}</time>
          <span>{post.frontmatter.readingTime}</span>
        </div>
        <div>
          <MDXRemote {...post.content} components={MDXComponents} />
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
\`\`\`

## Custom MDX Components

Create custom components for your MDX content:

\`\`\`jsx
// components/MDXComponents.js
import Image from 'next/image';
import Link from 'next/link';

const MDXComponents = {
  img: (props) => (
    <div className="my-8">
      <Image
        {...props}
        width={800}
        height={450}
        layout="responsive"
        className="rounded-lg"
      />
    </div>
  ),
  a: ({ href, children, ...props }) => {
    if (href.startsWith('/')) {
      return (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  // Add more custom components as needed
};

export default MDXComponents;
\`\`\`

## Creating Blog Posts

Now you can create blog posts as MDX files in the \`posts\` directory:

\`\`\`mdx
---
title: Hello World
date: '2023-01-01'
excerpt: This is my first blog post
---

# Hello World

This is my first blog post using **MDX**!

<SomeCustomComponent />

## Heading 2

More content here...
\`\`\`

## Conclusion

By combining Next.js and MDX, you can create a powerful blog with rich content that includes React components. This approach gives you the flexibility of markdown with the power of React.

For more information, check out the [Next.js documentation](https://nextjs.org/docs) and [MDX documentation](https://mdxjs.com/).
    `,
    readingTime: 8,
  },
  {
    slug: 'responsive-design-principles',
    title: 'Responsive Design Principles',
    date: '2023-08-05',
    coverImage: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    excerpt: 'Learn the key principles of responsive web design to create websites that work well on any device.',
    content: `
# Responsive Design Principles

Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It's essential for providing a good user experience regardless of whether a user is visiting your site from a desktop computer, tablet, or smartphone.

## Core Principles of Responsive Design

### 1. Fluid Grids

Instead of designing a layout based on fixed pixel values, a fluid grid uses relative units like percentages. This allows the layout to resize based on the screen size.

\`\`\`css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.column {
  width: 33.33%;
  float: left;
  padding: 0 15px;
}

@media (max-width: 768px) {
  .column {
    width: 50%;
  }
}

@media (max-width: 480px) {
  .column {
    width: 100%;
  }
}
\`\`\`

### 2. Flexible Images

Images should resize within their containing elements to prevent them from overflowing when the screen or browser window is smaller than the image.

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

### 3. Media Queries

Media queries allow you to apply different styles based on the characteristics of the device, most commonly the width of the browser.

\`\`\`css
/* Base styles for all devices */
body {
  font-size: 16px;
}

/* Styles for tablets */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

/* Styles for smartphones */
@media (max-width: 480px) {
  body {
    font-size: 12px;
  }
}
\`\`\`

## Mobile-First Approach

A mobile-first approach means designing for mobile devices first, then progressively enhancing the design for larger screens. This approach has several advantages:

1. **Focus on Content**: Mobile screens have limited space, forcing you to focus on the most important content.
2. **Performance**: Mobile devices often have slower connections, so optimizing for mobile first helps ensure good performance for all users.
3. **Progressive Enhancement**: It's easier to add features for larger screens than to remove them for smaller screens.

\`\`\`css
/* Base styles for mobile */
.container {
  padding: 10px;
}

/* Enhance for tablets */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Enhance for desktops */
@media (min-width: 1024px) {
  .container {
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
\`\`\`

## Responsive Typography

Typography should also be responsive to ensure readability across different devices.

\`\`\`css
html {
  font-size: 16px;
}

h1 {
  font-size: 2rem; /* 32px on default font size */
}

@media (min-width: 768px) {
  html {
    font-size: 18px;
  }
}

@media (min-width: 1024px) {
  html {
    font-size: 20px;
  }
}
\`\`\`

## Testing Responsive Designs

It's important to test your responsive designs on actual devices or using browser developer tools that simulate different screen sizes.

### Browser Developer Tools

Most modern browsers include developer tools that allow you to simulate different devices:

1. Open your browser's developer tools (F12 or Ctrl+Shift+I)
2. Look for the device toggle or responsive design mode
3. Select different device presets or manually adjust the viewport size

### Testing on Real Devices

While browser tools are helpful, testing on real devices provides the most accurate results. Consider testing on:

- Different smartphones (iOS and Android)
- Tablets
- Laptops and desktops with various screen sizes

## Common Responsive Design Patterns

### 1. Mostly Fluid

The mostly fluid pattern consists primarily of a fluid grid. On large or medium screens, it usually remains the same size, just adjusting the margins on wider screens. On smaller screens, the fluid grid causes the main content to reflow, while columns are stacked vertically.

### 2. Column Drop

For full-width multi-column layouts, column drop simply stacks the columns vertically as the window width becomes too narrow for the content.

### 3. Layout Shifter

The layout shifter pattern does the most to adapt to different screen sizes. It uses different layouts for different screen sizes, not just stacking columns.

### 4. Off Canvas

This pattern places less frequently used content (perhaps navigation or app filters) off-screen, showing it only when the screen is large enough.

## Conclusion

Responsive design is essential for creating websites that provide a good user experience across all devices. By following the principles of fluid grids, flexible images, and media queries, and adopting a mobile-first approach, you can create websites that look and function well regardless of the device used to access them.

Remember to test your designs on various devices and screen sizes to ensure they work as expected. With these principles in mind, you'll be well on your way to creating responsive websites that delight users on any device.
    `,
    readingTime: 7,
  },
  {
    slug: 'typescript-for-react-developers',
    title: 'TypeScript for React Developers',
    date: '2023-09-18',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    excerpt: 'Learn how to use TypeScript with React to build type-safe applications with better developer experience.',
    content: `
# TypeScript for React Developers

TypeScript is a strongly typed programming language that builds on JavaScript. It adds static types to JavaScript, which can help catch errors early in the development process and improve the developer experience.

## Why Use TypeScript with React?

- **Type Safety**: Catch type-related errors at compile time instead of runtime
- **Better Developer Experience**: Improved autocompletion and IntelliSense
- **Self-Documenting Code**: Types serve as documentation
- **Safer Refactoring**: TypeScript helps ensure refactoring doesn't break existing code
- **Enhanced Component Props**: Clear definition of what props a component accepts

## Setting Up a TypeScript React Project

You can create a new React project with TypeScript using Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

Or with Next.js:

\`\`\`bash
npx create-next-app@latest --ts my-app
\`\`\`

## Basic TypeScript Concepts for React

### Typing Component Props

\`\`\`tsx
// Defining props interface
interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

// Using the interface in a component
const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = 'primary',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      className={\`btn btn-\${color}\`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
\`\`\`

### Typing Component State

\`\`\`tsx
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ...

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};
\`\`\`

### Typing Event Handlers

\`\`\`tsx
import { ChangeEvent, FormEvent, useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
\`\`\`

## Advanced TypeScript with React

### Generic Components

\`\`\`tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
/>;
\`\`\`

### Typing Context

\`\`\`tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Login logic
    const user = await loginApi(email, password);
    setUser(user);
  };

  const logout = () => {
    // Logout logic
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
\`\`\`

### Typing Custom Hooks

\`\`\`tsx
import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
interface Post {
  id: number;
  title: string;
  body: string;
}

function PostList() {
  const { data, loading, error } = useFetch<Post[]>('https://api.example.com/posts');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No posts found</div>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Best Practices

1. **Use Interfaces for Objects**: Interfaces are generally preferred for defining the shape of objects, including component props.

2. **Be Explicit with Types**: Avoid using \`any\` as much as possible. Be explicit about your types to get the full benefit of TypeScript.

3. **Use Type Inference When Appropriate**: TypeScript is good at inferring types, so you don't always need to explicitly type everything.

4. **Create Reusable Types**: Define types that can be reused across your application to maintain consistency.

5. **Use Discriminated Unions for State Management**: When a component can be in different states, use discriminated unions to model this.

   \`\`\`tsx
   type State =
     | { status: 'idle' }
     | { status: 'loading' }
     | { status: 'success', data: User }
     | { status: 'error', error: Error };
   \`\`\`

6. **Use TypeScript with a Linter**: Configure ESLint with TypeScript-specific rules to catch more issues.

## Conclusion

TypeScript adds a powerful type system to React development, helping catch errors early and improving the developer experience. By properly typing your components, props, state, and events, you can build more robust React applications.

As you become more comfortable with TypeScript, you can explore more advanced features like generics, conditional types, and utility types to make your code even more type-safe and maintainable.

For more information, check out the [TypeScript documentation](https://www.typescriptlang.org/docs/) and [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/).
    `,
    readingTime: 10,
  },
  {
    slug: 'web-accessibility-best-practices',
    title: 'Web Accessibility Best Practices',
    date: '2023-10-25',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    excerpt: 'Learn how to make your websites accessible to all users, including those with disabilities.',
    content: `
# Web Accessibility Best Practices

Web accessibility means designing and developing websites that can be used by everyone, including people with disabilities. Making your website accessible is not only the right thing to do, but it can also improve your SEO, reach a wider audience, and in many jurisdictions, it's required by law.

## Why Accessibility Matters

- **Inclusivity**: Everyone should be able to use the web, regardless of their abilities or disabilities.
- **Legal Requirements**: Many countries have laws requiring websites to be accessible (e.g., ADA in the US, EAA in the EU).
- **Better User Experience**: Accessibility improvements often benefit all users, not just those with disabilities.
- **SEO Benefits**: Many accessibility practices also improve search engine optimization.

## WCAG Guidelines

The Web Content Accessibility Guidelines (WCAG) provide a framework for making web content more accessible. WCAG is organized around four principles, often referred to as POUR:

1. **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive.
2. **Operable**: User interface components and navigation must be operable.
3. **Understandable**: Information and the operation of the user interface must be understandable.
4. **Robust**: Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

## Key Accessibility Practices

### Semantic HTML

Use HTML elements according to their intended purpose:

\`\`\`html
<!-- Bad -->
<div class="heading">Welcome to Our Site</div>
<div class="button" onclick="doSomething()">Click Me</div>

<!-- Good -->
<h1>Welcome to Our Site</h1>
<button onclick="doSomething()">Click Me</button>
\`\`\`

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

\`\`\`html
<!-- Bad -->
<div class="button" onclick="doSomething()">Click Me</div>

<!-- Good -->
<button onclick="doSomething()">Click Me</button>
\`\`\`

### Focus Management

Make sure the focus order is logical and visible:

\`\`\`css
/* Make focus visible */
:focus {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}

/* Don't hide focus on mouse click (bad practice) */
:focus:not(:focus-visible) {
  outline: none;
}
\`\`\`

### Alternative Text

Provide alt text for images:

\`\`\`html
<!-- Provide alt text for images -->
<img src="logo.png" alt="Company Logo">

<!-- For decorative images -->
<img src="decorative-line.png" alt="">
\`\`\`

### Color and Contrast

Ensure sufficient color contrast between text and background:

\`\`\`css
/* Good contrast */
.text {
  color: #333;
  background-color: #fff;
}

/* Avoid relying on color alone */
.error {
  color: #d9534f;
  border: 1px solid #d9534f;
  background-color: #f2dede;
}
.error::before {
  content: "⚠ ";
}
\`\`\`

### ARIA Attributes

Use ARIA (Accessible Rich Internet Applications) when necessary:

\`\`\`html
<!-- Simple example -->
<button aria-label="Close" aria-describedby="desc">X</button>
<div id="desc" hidden>Closes the current dialog</div>

<!-- Navigation landmark -->
<nav aria-label="Main Navigation">
  <!-- Navigation items -->
</nav>
\`\`\`

### Form Accessibility

Make forms accessible with proper labels and error messages:

\`\`\`html
<form>
  <div>
    <label for="name">Name</label>
    <input id="name" type="text" aria-required="true">
  </div>

  <div>
    <label for="email">Email</label>
    <input id="email" type="email" aria-required="true">
    <div id="email-error" class="error" aria-live="polite"></div>
  </div>

  <button type="submit">Submit</button>
</form>
\`\`\`

### Responsive Design

Ensure your site works well at different zoom levels and viewport sizes:

\`\`\`css
/* Base styles for all devices */
body {
  font-size: 16px;
  line-height: 1.5;
}

/* Ensure text remains readable when zoomed */
p, li, label, input {
  font-size: 1rem;
}

/* Responsive layout */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
}
\`\`\`

## Testing Accessibility

### Automated Testing

Use automated tools to catch common accessibility issues:

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)

### Manual Testing

Automated tests can't catch everything. Manual testing is essential:

1. **Keyboard Navigation**: Try navigating your site using only the keyboard.
2. **Screen Reader Testing**: Use screen readers like NVDA, JAWS, or VoiceOver.
3. **Zoom Testing**: Test your site at different zoom levels (up to 200%).
4. **Reduced Motion**: Test with reduced motion settings enabled.
5. **High Contrast Mode**: Test with high contrast mode enabled.

## Implementing Accessibility in React

### Accessible React Components

\`\`\`jsx
// Accessible button component
function Button({ onClick, children, isDisabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {children}
    </button>
  );
}

// Accessible modal component
function Modal({ isOpen, onClose, title, children }) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-header">
        <h2 id="modal-title">{title}</h2>
        <button
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="modal-body">
        {children}
      </div>
    </div>
  );
}
\`\`\`

## Common Accessibility Issues and Solutions

### Issue: Missing Alternative Text

**Solution**: Add descriptive alt text to all meaningful images.

### Issue: Low Color Contrast

**Solution**: Ensure text has sufficient contrast with its background (4.5:1 for normal text, 3:1 for large text).

### Issue: Keyboard Traps

**Solution**: Ensure users can navigate to and from all interactive elements using the keyboard.

### Issue: Missing Form Labels

**Solution**: Associate labels with form controls using the \`for\` attribute or by nesting the control inside the label.

### Issue: Non-descriptive Links

**Solution**: Make link text descriptive of its destination instead of using "click here" or "read more".

## Conclusion

Web accessibility is an essential aspect of web development. By following these best practices, you can create websites that are usable by everyone, regardless of their abilities or disabilities. Remember that accessibility is not a one-time task but an ongoing process that should be integrated into your development workflow.

For more information, check out the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) and the [A11Y Project](https://www.a11yproject.com/).
    `,
    readingTime: 12,
  },
];