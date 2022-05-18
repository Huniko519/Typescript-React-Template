import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import SideBar from 'components/SideBar';
import Header from 'components/Header';
import useAuth from 'hooks/useAuth';

const AppLayout: FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div tw="flex">
      <SideBar />
      <div tw="flex-1 flex flex-col h-screen overflow-hidden">
        <Header handleLogout={handleLogout} tw="(p-10 )!" />
        <Box tw="p-8 flex-1 overflow-auto bg-[#efefef]">
          <Outlet />
        </Box>
      </div>
    </div>
  );
};

export default AppLayout;
