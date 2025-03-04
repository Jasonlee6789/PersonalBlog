"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXContentProps {
  content: MDXRemoteSerializeResult;
}

const components = {
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="relative w-full aspect-video my-8 overflow-hidden rounded-lg">
      {src && (
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      )}
    </div>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/') || href?.startsWith('#')) {
      return (
        <Link href={href} {...props}>
          {children}
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

export function MDXContent({ content }: MDXContentProps) {
  const mdxComponents = useMemo(() => components, []);
  
  return <MDXRemote {...content} components={mdxComponents} />;
}