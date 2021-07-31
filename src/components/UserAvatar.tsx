import Image from 'next/image';
import React from 'react';

export interface AvatarProps {
  name?: string | null;
  image?: string | null;
  size?: [number, number];
}

const Avatar: React.FC<AvatarProps> = ({ name, image, size }) => {
  return (
    <span className="flex min-w-0 items-center justify-between space-x-3">
      {image ? (
        <Image
          className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
          src={image}
          alt=""
          width={size?.[0] ?? 60}
          height={size?.[1] ?? 60}
        />
      ) : (
        <span className="h-14 w-14 rounded-full overflow-hidden bg-gray-100">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}
      {name && (
        <span className="flex-1 flex flex-col min-w-0">
          <span className="text-gray-900 text-sm font-medium truncate">
            {name}
          </span>
        </span>
      )}
    </span>
  );
};

Avatar.defaultProps = {
  size: [60, 60],
};

export default Avatar;
