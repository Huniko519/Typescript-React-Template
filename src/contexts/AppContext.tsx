import React from 'react';
import AuthProvider from './AuthContext';
import ItemProvider from './ItemContext';
import ModelProvider from './ModelContext';

export interface AppContextsProps {
  locale?: string;
}

const AppContexts: React.FC<AppContextsProps> = ({ children }) => {
  return (
    <AuthProvider>
      <ItemProvider>
        <ModelProvider>{children}</ModelProvider>
      </ItemProvider>
    </AuthProvider>
  );
};

export default AppContexts;
