import { buttonVariants } from '@/components/ui/button';
import { RoutingPaths } from '@/constants';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { Link } from 'wouter';

const NotFound: FC = () => (
  <div className="flex flex-col justify-center items-center gap-y-8 bg-neutral-800 w-screen h-screen text-gray-400 overflow-hidden">
    <h1 className="drop-shadow-[9px_20px_2px_black] font-bold text-[30vw] uppercase leading-none select-none filter stroke-neutral-500">
      404
    </h1>
    <Link
      to={RoutingPaths.Dashboard}
      className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'relative', 'z-10')}
    >
      Go back to Dashboard
    </Link>
  </div>
);

export default NotFound;
