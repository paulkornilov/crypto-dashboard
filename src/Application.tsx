import { FC, useState } from 'react';
import { AuthenticatedView, UnAuthenticatedView } from './views';

const Application: FC = () => {
  // TODO: Authenticated mechanism will be implemented later.
  const [isAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <UnAuthenticatedView />;
  }

  return <AuthenticatedView />;
};

export default Application;
