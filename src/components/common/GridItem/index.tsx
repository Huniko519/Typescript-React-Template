import React, { FC } from 'react';
import { Grid, GridProps } from '@mui/material';

interface IGridItemProps extends GridProps {}

const GridItem: FC<IGridItemProps> = (props) => {
  const { children, xs, sm, md, lg } = props;
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      {children}
    </Grid>
  );
};

export default GridItem;
