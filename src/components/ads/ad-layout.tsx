import { ReactNode } from 'react';
import SideAd from './side-ad';
import BottomAd from './bottom-ad';

interface AdLayoutProps {
  children: ReactNode;
  leftAdSlot?: string;
  rightAdSlot?: string;
  bottomAdSlot?: string;
}

export default function AdLayout({ 
  children, 
  leftAdSlot, 
  rightAdSlot,
  bottomAdSlot
}: AdLayoutProps) {
  return (
    <div className="ad-page-layout relative">
      {leftAdSlot && <SideAd slot={leftAdSlot} position="left" />}
      
      <div className="main-content">
        {children}
      </div>
      
      {rightAdSlot && <SideAd slot={rightAdSlot} position="right" />}
      
      {bottomAdSlot && <BottomAd slot={bottomAdSlot} />}
    </div>
  );
}
