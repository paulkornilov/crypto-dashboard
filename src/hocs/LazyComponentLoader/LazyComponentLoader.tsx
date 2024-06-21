import Spinner from '@/components/ui/spinner';
import { FC, LazyExoticComponent, Suspense } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LazyComponentLoader = (Component: LazyExoticComponent<FC<object>>) => (props: any) => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center bg-neutral-800 w-screen h-screen text-gray-400 overflow-hidden">
        <Spinner size={'lg'} />
      </div>
    }
  >
    <Component {...props} />
  </Suspense>
);

export default LazyComponentLoader;
