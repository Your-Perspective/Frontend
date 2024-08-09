'use client';
import React from 'react';
import { FacebookShare, TwitterShare } from 'react-share-kit'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { HiMiniLink } from 'react-icons/hi2';

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

export default function FacebookShareButton({ url, quote }: { url: string, quote: string | undefined }) {
  return (
    <div className='flex gap-3 items-center md:justify-start justify-end'>
      <Button onClick={() => copyToClipboard(url)} variant={'link'} className='p-0'>
        <HiMiniLink size={30} />
      </Button>
      <FacebookShare style={{ borderRadius: '50%' }} size={40} url={url} quote={quote || ""} />
      <TwitterShare size={40} url={url} title={quote} />
    </div>
  )
}
