import React from 'react';

export default ({
  active = false,
  bold = false,
  color = '#000000',
  size = 30,
}: Props) => (
  <svg viewBox="0 0 30 30" width={size} height={size}>
    <path
      fill={active ? color : 'transparent'}
      stroke={color}
      strokeWidth={bold ? 1.5 : 1}
      d="M23.48 7.9a5.1 5.1 0 0 0-7.39 0l-1 1-1-1a5.1 5.1 0 0 0-7.39 0 5.53 5.53 0 0 0 0 7.64l1 1 7.39 7.64 7.39-7.64 1-1a5.53 5.53 0 0 0 0-7.64z"
    />
  </svg>
);
