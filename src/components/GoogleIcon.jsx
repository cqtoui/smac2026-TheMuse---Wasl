import React from "react";

export default function GoogleIcon({
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
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.38Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.98-.89 6.64-2.39l-3.24-2.51c-.9.6-2.05.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.93A6 6 0 0 1 6.08 12c0-.67.11-1.32.31-1.93v-2.6H3.04A10 10 0 0 0 2 12c0 1.62.39 3.15 1.04 4.53l3.35-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.94c1.47 0 2.79.5 3.83 1.49l2.88-2.88C16.97 2.93 14.7 2 12 2a10 10 0 0 0-8.96 5.47l3.35 2.6C7.18 7.7 9.39 5.94 12 5.94Z"
      />
    </svg>
  );
}
