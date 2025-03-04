import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Post } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.slug} className="overflow-hidden flex flex-col h-full">
          <div className="relative h-48 w-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="pt-6 flex-grow">
            <div className="text-sm text-muted-foreground mb-2">
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </div>
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}