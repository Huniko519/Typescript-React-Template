import React from 'react';
import { Box } from '@mui/material';
import { CircleLoader } from 'react-spinners';

const Loading = () => {
  return (
    <Box tw="w-full h-full flex items-center justify-center">
      <CircleLoader />
    </Box>
  );
};

export default Loading;
