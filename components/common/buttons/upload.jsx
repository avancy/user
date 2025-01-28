export function BtnUpload({ caption, ...rest }) {
  return (
    <button
      type="button"
      className="inline-flex items-center px-1 text-xs font-medium leading-4 text-blue-700 transition duration-150 ease-in-out bg-white rounded-full hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
      {...rest}
    >
      <svg
        className="-ml-0.5 mr-1 h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        <polyline points="16 16 12 12 8 16" />
      </svg>
      {caption && caption.length > 0 && <span class="ml-1 mr-1 ">{caption}</span>}
    </button>
  );
}
