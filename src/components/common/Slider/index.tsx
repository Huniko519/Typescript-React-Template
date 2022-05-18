import React from 'react';
import { Slider as MuiSlider, Box, Typography } from '@mui/material';

interface ISliderProps {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: Event, newValue: number | number[]) => void;
}

const Slider = (props: ISliderProps) => {
  const { label, name, value, min, max, step, onChange } = props;

  return (
    <Box>
      <Typography>{label}</Typography>
      <MuiSlider
        onChange={onChange}
        value={value}
        name={name}
        min={min}
        max={max}
        step={step}
      />
    </Box>
  );
};

export default React.memo(Slider);
