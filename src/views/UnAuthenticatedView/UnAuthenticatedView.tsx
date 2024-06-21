import { RoutingPaths } from '@/constants';
import { FC } from 'react';
import { Redirect, Route, Switch } from 'wouter';

const UnAuthenticatedView: FC = () => (
  <Switch>
    <Route>
      <Redirect to={RoutingPaths.Login} />
    </Route>
  </Switch>
);

export default UnAuthenticatedView;
