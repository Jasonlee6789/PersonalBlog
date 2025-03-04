"use client";

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  initialValue?: string;
}

export function SearchBar({ initialValue = '' }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      
      if (searchQuery) {
        params.set('search', searchQuery);
      } else {
        params.delete('search');
      }
      
      // Reset to page 1 when searching
      params.delete('page');
      
      const targetPath = pathname === '/' ? '/blog' : pathname;
      router.push(`${targetPath}?${params.toString()}`);
    });
  };
  
  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-r-none"
          aria-label="Search posts"
        />
        <Button 
          type="submit" 
          className="rounded-l-none"
          disabled={isPending}
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
}