"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchTerm?: string;
}

export function Pagination({ currentPage, totalPages, searchTerm = '' }: PaginationProps) {
  const pathname = usePathname();
  
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams();
    
    if (pageNumber > 1) {
      params.set('page', pageNumber.toString());
    }
    
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    const queryString = params.toString();
    return `${pathname}${queryString ? `?${queryString}` : ''}`;
  };
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page, last page, current page, and pages adjacent to current page
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push(null); // Ellipsis
      }
      
      // Pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push(null); // Ellipsis
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        asChild={currentPage !== 1}
      >
        {currentPage === 1 ? (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        ) : (
          <Link href={createPageURL(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        )}
      </Button>
      
      {getPageNumbers().map((page, index) => {
        if (page === null) {
          return (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          );
        }
        
        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            asChild={currentPage !== page}
          >
            {currentPage === page ? (
              <span>{page}</span>
            ) : (
              <Link href={createPageURL(page as number)}>
                {page}
              </Link>
            )}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        asChild={currentPage !== totalPages}
      >
        {currentPage === totalPages ? (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        ) : (
          <Link href={createPageURL(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </Button>
    </div>
  );
}