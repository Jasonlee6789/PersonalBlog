import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  );
}