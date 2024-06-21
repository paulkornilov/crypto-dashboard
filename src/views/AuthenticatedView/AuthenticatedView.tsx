import { RoutingPaths } from '@/constants';
import { LazyComponentLoader } from '@/hocs';
import { FC, lazy } from 'react';
import { Redirect, Route, Switch } from 'wouter';

const LazyDashboardLayout = LazyComponentLoader(
  lazy(() => import('@/components/layouts/Dashboard/Dashboard')),
);

const LazyNotFoundLayout = LazyComponentLoader(
  lazy(() => import('@/components/layouts/NotFound/NotFound')),
);

const AuthenticatedView: FC = () => (
  <Switch>
    <Route path={RoutingPaths.Root}>
      <Redirect to={RoutingPaths.Dashboard} />
    </Route>
    <Route path={RoutingPaths.Login}>
      <Redirect to={RoutingPaths.Dashboard} />
    </Route>
    <Route path={RoutingPaths.Dashboard} component={LazyDashboardLayout} />
    <Route component={LazyNotFoundLayout} />
  </Switch>
);

export default AuthenticatedView;
