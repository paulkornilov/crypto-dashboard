import { FC, LazyExoticComponent, Suspense } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LazyComponentLoader = (Component: LazyExoticComponent<FC<object>>) => (props: any) => (
  <Suspense fallback={<div>SpinnerBox</div>}>
    <Component {...props} />
  </Suspense>
);

export default LazyComponentLoader;
