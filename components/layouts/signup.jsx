export default function SignupLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className={`w-full flex items-center justify-center`}>
        <div className={`flex flex-col h-full py-3 gap-4 md:gap-6`}>{children}</div>
      </div>
    </div>
  );
}
