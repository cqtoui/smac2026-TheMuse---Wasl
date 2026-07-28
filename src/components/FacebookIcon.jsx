import React from "react";

export default function FacebookIcon({
  className = "",
  ...props
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="12"
        fill="#1877F2"
      />

      <path
        fill="#FFFFFF"
        d="M13.7 20v-7h2.35l.35-2.73H13.7V8.53c0-.79.22-1.33 1.36-1.33h1.45V4.76c-.25-.03-1.11-.11-2.12-.11-2.1 0-3.54 1.28-3.54 3.64v1.98H8.47V13h2.38v7h2.85Z"
      />
    </svg>
  );
}