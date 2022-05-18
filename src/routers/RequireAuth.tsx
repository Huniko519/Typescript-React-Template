import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IRequireAuth {
  children: JSX.Element;
  auth: boolean;
  isRequire: boolean;
}

const RequireAuth: FC<IRequireAuth> = (props) => {
  const { children, auth, isRequire } = props;
  const location = useLocation();

  if (!auth && isRequire) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (auth && !isRequire) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
