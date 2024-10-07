export type ErrorBannerProps = {
  message: string;
  clearError: () => void;
};

export default function ErrorBanner({ message, clearError }: ErrorBannerProps) {
  return (
    <div className='fixed flex items-center gap-3 p-4 bg-red text-white w-full z-10'>
      {message}
      <button
        className='bg-black text-white px-3 rounded-xl text-sm pointer'
        onClick={clearError}
      >
        Dismiss
      </button>
    </div>
  );
}
