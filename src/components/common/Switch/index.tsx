import React, { ChangeEvent } from 'react';
import { Switch as MuiSwitch, FormGroup, FormControlLabel } from '@mui/material';

interface ISwitchProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Switch = (props: ISwitchProps) => {
  const { label, name, value, onChange } = props;

  return (
    <FormGroup>
      <FormControlLabel
        control={<MuiSwitch checked={value} name={name} onChange={onChange} />}
        label={label}
      />
    </FormGroup>
  );
};

export default Switch;
