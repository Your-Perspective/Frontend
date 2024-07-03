'use client';
import React, {useEffect, useState} from "react";
import { AlertProps } from "@/types/Types";
import {Alert} from "antd";

export default function AlertCompo({ title, content, variant }: AlertProps) {
  
  const [visible, setVisible] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  useEffect(() => {
    const storedTime = localStorage.getItem('bannerCloseTime');
    const currentTime = Date.now();
    
    if (storedTime) {
      const closeTime = parseInt(storedTime, 10);
      const timeToShowAgain = closeTime + (1000 * 60 * 60);
      if (currentTime >= timeToShowAgain) {
        setVisible(true);
        localStorage.removeItem('bannerCloseTime');
      } else {
        const diff = timeToShowAgain - currentTime;
        setTimeLeft(Math.round(diff / 1000));
      }
    }
  }, []);
  
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setVisible(false);
    const currentTime = Date.now();
    localStorage.setItem('bannerCloseTime', String(currentTime));
  };
  
  return (
    <>
      {visible && (
        <Alert
          banner
          className={'text-center font-medium w-full'}
          message={title}
          description={content}
          type={variant}
          closable
          onClose={handleClose}
        />
        )
      }
    </>
  );
}
