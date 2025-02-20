import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import ClientWrapper dynamically since it contains client-side logic
const ClientWrapper = dynamic(() => import('@/components/ClientWrapper'), {
  ssr: false,
});

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
        <ClientWrapper />
      </div>
    </Suspense>
  );
}
