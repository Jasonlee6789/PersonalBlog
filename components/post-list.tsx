import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No posts found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 mb-8">
      {posts.map((post) => (
        <Card key={post.slug} className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 relative h-48 md:h-auto">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <CardContent className="p-6 md:w-2/3">
              <div className="text-sm text-muted-foreground mb-2">
                {format(new Date(post.date), 'MMMM d, yyyy')} • {post.readingTime} min read
              </div>
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              </Link>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Read More
              </Link>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}