import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';
import AuthLayout from 'layouts/AuthLayout';
import useAuth from 'hooks/useAuth';
import RequireAuth from 'routers/RequireAuth';
import { IRoutes, routes } from './routers';

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route element={isLoggedIn ? <AppLayout /> : <AuthLayout />}>
        {routes.map((item: IRoutes) => (
          <Route
            path={item.path}
            element={
              <RequireAuth
                auth={isLoggedIn}
                isRequire={item.accessType === 'private'}
              >
                {item.component}
              </RequireAuth>
            }
            key={item.path}
          />
        ))}
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Route>
    </Routes>
  );
};

export default App;
