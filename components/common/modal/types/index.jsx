import { LoadingText } from '@/components/common/loadding/text';

export const Image = ({ src }) => (
  <img src={src} alt="Modal Content" className="max-w-[90vw] max-h-[90vh] object-contain" />
);

export const ProgressBar = ({ total, current }) => (
  <div className="h-2 bg-gray-900 w-[80vw] rounded-lg">
    <LoadSpinner />
    <div
      style={{ width: `${(current / total) * 100}%` }}
      className="h-full mt-10 transition-all bg-blue-800 rounded-lg"
    />
  </div>
);

export const LoadSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
    <LoadingText />
  </div>
);
