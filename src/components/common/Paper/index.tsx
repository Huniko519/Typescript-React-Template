import React, { FC } from 'react';
import { Box } from '@mui/material';

interface IPaperProps {
  className?: string;
}

const Paper: FC<IPaperProps> = (props) => {
  const { children, className } = props;
  return (
    <Box
      tw="border border-gray-200 rounded-2xl shadow-[0 6px 10px -4px rgb(0 0 0 / 15%)] bg-white"
      className={className}
    >
      {children}
    </Box>
  );
};

Paper.defaultProps = {
  className: '',
};
export default Paper;
