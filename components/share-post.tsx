"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SharePostProps {
  title: string;
  slug: string;
}

export function SharePost({ title, slug }: SharePostProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const postUrl = `${baseUrl}/blog/${slug}`;
  
  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4 mr-2" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4 mr-2" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4 mr-2" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    },
  ];
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      
      toast({
        title: 'Link copied!',
        description: 'The post URL has been copied to your clipboard.',
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy the link to your clipboard.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Share this post</h3>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            onClick={() => window.open(link.url, '_blank')}
          >
            {link.icon}
            {link.name}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="ml-auto"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <LinkIcon className="h-4 w-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}