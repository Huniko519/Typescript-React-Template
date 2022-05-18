import { FC, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { IRoutes, routes } from 'routers';
import Logo from 'assets/img/logo.svg';
// props interface

const SideBar: FC = () => {
  const routerList = useMemo(() => {
    return routes.filter((item: IRoutes) => item.sideMenu);
  }, []);

  return (
    <div tw="h-screen w-[250px] bg-gray-700">
      <div tw="py-5 px-3 bg-blue-600 shadow">
        <img src={Logo} alt="logo" />
      </div>
      <div tw="py-4">
        {routerList.map((route: IRoutes) => (
          <NavLink
            to={route.path}
            className={({ isActive }) => {
              return `ease-in duration-300 flex text-[white] py-4 px-3 border-l-4 items-center text-xl cursor-pointer hover:border-yellow-400 hover:bg-gray-900 ${
                isActive
                  ? 'border-yellow-400 bg-gray-900'
                  : 'border-gray-700'
              }`;
            }}
            key={route.path}
          >
            {route.icon}
            <span tw="pl-4">{route.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
