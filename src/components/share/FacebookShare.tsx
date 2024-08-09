'use client';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { HiMiniLink } from 'react-icons/hi2';
import { FaFacebook } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

export const copyToClipboard = (text: string): void => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Blog url copied to clipboard successfully!');
      })
      .catch(err => {
        toast.error('Failed to copy text to clipboard:', err);
      });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  }
}

const shareToFacebook = (url: string, quote?: string): void => {
  const encodedUrl = encodeURIComponent(url);
  let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  if (quote) {
    const encodedQuote = encodeURIComponent(quote);
    facebookUrl += `&quote=${encodedQuote}`;
  }

  window.open(facebookUrl, '_blank', 'width=600,height=400');
};

const shareToTwitter = (url: string, text?: string, hashtags?: string[]): void => {
  const encodedUrl = encodeURIComponent(url);
  let twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;

  if (text) {
    const encodedText = encodeURIComponent(text);
    twitterUrl += `&text=${encodedText}`;
  }

  if (hashtags && hashtags.length > 0) {
    const encodedHashtags = encodeURIComponent(hashtags.join(","));
    twitterUrl += `&hashtags=${encodedHashtags}`;
  }

  window.open(twitterUrl, '_blank', 'width=600,height=400');
};

export default function FacebookShareButton({ url, quote }: { url: string, quote: string | undefined }) {
  return (
    <div className='flex gap-3 items-center md:justify-start justify-end'>
      <Button onClick={() => copyToClipboard(url)} variant={'link'} className='p-0'>
        <HiMiniLink size={30} />
      </Button>
      <Button onClick={() => shareToFacebook(url, quote)} variant={'link'} className='p-0'>
        <FaFacebook size={30} className='rounded-full' />
      </Button>
      <Button onClick={() => shareToTwitter(url, quote)} variant={'link'} className='p-0'>
        <RiTwitterXFill size={30} className='rounded-full' />
      </Button>
    </div>
  )
}
