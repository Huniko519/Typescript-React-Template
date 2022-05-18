import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { SketchPicker } from 'react-color';

interface IColorPickerProps {
  color: string;
  onChangeComplete: (value: any) => void;
}

const ColorPicker = (props: IColorPickerProps) => {
  const { color, onChangeComplete } = props;

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" tw="mt-1">
        <Typography>Color</Typography>
        <Box
          sx={{
            backgroundColor: color,
            width: 30,
            height: 15,
            border: '1px solid gray',
            borderRadius: 1,
            padding: 1,
          }}
        />
      </Stack>
      <SketchPicker color={color} onChangeComplete={onChangeComplete} />
    </Box>
  );
};

export default ColorPicker;
