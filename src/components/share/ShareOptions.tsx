'use client';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { HiMiniLink } from 'react-icons/hi2';
import { FaFacebook } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { GoShareAndroid } from "react-icons/go";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


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

export default function ShareButton({ url, quote }: { url: string, quote: string | undefined }) {
  return (
    <Dialog>
      <DialogTrigger>
        <GoShareAndroid size={25} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='py-5 leading-relaxed'>Let&apos; share <span className="text-blue-600">{quote}</span> to social.</DialogTitle>
          <DialogDescription>
            <div className='grid grid-cols-3 gap-3'>
              <Button className='flex flex-col items-center h-fit gap-3' onClick={() => copyToClipboard(url)} variant={'outline'}>
                <HiMiniLink size={30} />
                <p>Copy link</p>
              </Button>
              <Button className='flex flex-col items-center h-fit gap-3' onClick={() => shareToFacebook(url, quote)} variant={'outline'}>
                <FaFacebook size={30} className='rounded-full' />
                <p>Facebook</p>
              </Button>
              <Button className='flex flex-col items-center h-fit gap-3' onClick={() => shareToTwitter(url, quote)} variant={'outline'}>
                <RiTwitterXFill size={30} className='rounded-full' />
                <p>X-Twitter</p>
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
