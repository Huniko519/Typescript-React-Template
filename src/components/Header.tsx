import { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routes, IRoutes } from 'routers';

interface IHeaderProps {
  handleLogout(): void;
}
const Header: FC<IHeaderProps> = (props) => {
  const { handleLogout } = props;
  const location = useLocation();
  const title = useMemo(() => {
    return routes.find((item: IRoutes) => item.path === location.pathname)
      ?.label;
  }, [location]);

  return (
    <div tw="p-[21px] shadow-lg w-full flex items-center justify-between z-50">
      <span>{title}</span>
      <button onClick={handleLogout} type="button">
        logout
      </button>
    </div>
  );
};

export default Header;
