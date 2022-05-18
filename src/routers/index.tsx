import { ReactElement, ReactNode } from 'react';
import { Ballot } from '@mui/icons-material';

// views
import Home from 'views/Home';
import Item from 'views/Item';
import AddItem from 'views/AddItem';
import Models from 'views/Models';
import AddModel from 'views/AddModel';
import Login from 'views/Login';

export interface IRoutes {
  path: string;
  label: string;
  icon: ReactNode;
  component: ReactElement;
  sideMenu: boolean;
  accessType: string;
}

export const routes: IRoutes[] = [
  {
    path: '/home',
    label: 'Home',
    icon: <Ballot />,
    component: <Home />,
    sideMenu: true,
    accessType: 'private',
  },
  {
    path: '/items',
    label: 'My Items',
    icon: <Ballot />,
    component: <Item />,
    sideMenu: true,
    accessType: 'private',
  },
  {
    path: '/models',
    label: 'My Models',
    icon: <Ballot />,
    component: <Models />,
    sideMenu: true,
    accessType: 'private',
  },
  {
    path: '/add-item',
    label: 'Add Item',
    icon: <Ballot />,
    component: <AddItem />,
    sideMenu: true,
    accessType: 'private',
  },
  {
    path: '/add-model',
    label: 'Add Model',
    icon: <Ballot />,
    component: <AddModel />,
    sideMenu: true,
    accessType: 'private',
  },
  {
    path: '/login',
    label: 'Login',
    icon: <Ballot />,
    component: <Login />,
    sideMenu: false,
    accessType: 'auth',
  },
];
