export function BtnRealize({ caption, ...rest }) {
  return (
    <button
      type="button"
      className="inline-flex items-center px-1 text-xs font-medium leading-4 text-green-700 transition duration-150 ease-in-out bg-transparent rounded-full hover:text-green-500 focus:outline-none focus:border-green-300 focus:shadow-outline-green active:text-green-800 active:bg-green-50"
      {...rest}
    >
      <svg
        className="-ml-0.5 h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 19V5m-7 7l7-7 7 7"
        />
      </svg>
      {caption && caption.length > 0 && <span className="ml-1 mr-1 ">{caption}</span>}
    </button>
  );
}
