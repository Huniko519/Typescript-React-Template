import React from 'react';
import { Stack, Divider as MuiDivider, Typography } from '@mui/material';

interface IDividerProps {
  dividerName: string;
}

const Divider = (props: IDividerProps) => {
  const { dividerName } = props;
  return (
    <Stack direction="row" alignItems="center" tw="mt-4 mb-2">
      <MuiDivider tw="flex-1" textAlign="left">
        <Typography variant="h6">{dividerName}</Typography>
      </MuiDivider>
    </Stack>
  );
};

export default Divider;
