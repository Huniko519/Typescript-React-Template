import { FC } from 'react';
import { Grid } from '@mui/material';

interface IGridContainerProps {
  spacing: number;
}
const GridContainer: FC<IGridContainerProps> = (props) => {
  const { children, spacing } = props;
  return (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  );
};

export default GridContainer;
