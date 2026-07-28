import React from 'react';

const SIZES = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-20 h-20 text-3xl',
};

export default function UserAvatar({ user, size = 'md', onClick }) {
  const name = user?.display_name || user?.full_name || 'A';
  const initial = name.charAt(0).toUpperCase();
  const cls = SIZES[size] || SIZES.md;

  if (user?.profile_photo) {
    return (
      <button
        onClick={onClick}
        className={`${cls} rounded-full overflow-hidden flex-shrink-0 ring-2 ring-wasl-soft active:scale-95 transition-transform`}
      >
        <img src={user.profile_photo} alt={name} className="w-full h-full object-cover" />
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${cls} rounded-full bg-wasl-primary flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform`}
    >
      <span className="text-white font-semibold">{initial}</span>
    </button>
  );
}