// ChatCardSkeleton.jsx

import Skeleton from '@mui/material/Skeleton';

const ChatCardSkeleton = () => (
  <div className="mb-1">
    <div className="flex items-center justify-center py-2 px-2 h-[80px] group cursor-pointer rounded-md transition-all duration-300 bg-[#131313] hover:shadow-lg">
      <div className="w-1/5">
        <Skeleton variant="circular" width={50} height={50} style={{ backgroundColor: '#555' }}  />
      </div>
      <div className="w-3/4 pr-2">
        <div className="flex justify-between items-center text-white">
          <Skeleton width={120} height={20} style={{ backgroundColor: '#444' }} />
          <Skeleton width={60} height={18} style={{ backgroundColor: '#555' }} />
        </div>
        <div className="flex justify-between">
          <Skeleton width={150} height={14} style={{ backgroundColor: '#666' }} />
          <div className="flex space-x-2 items-center">
            <Skeleton width={20} height={20} style={{ backgroundColor: '#777' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChatCardSkeleton;
