import React, { FC } from 'react';
import { Select as MuiSelect, SelectProps, MenuItem } from '@mui/material';

export interface ItemListType {
  label: string;
  value: string | number;
}
interface ISelectProps extends SelectProps {
  itemList: ItemListType[];
  inputName: string;
}

const Select: FC<ISelectProps> = (props) => {
  const { itemList, inputName, value, className, onChange } = props;

  return (
    <MuiSelect
      tw=""
      classes={{
        select: 'p-2 hover:border-green-200',
      }}
      value={value}
      fullWidth
      className={className}
      inputProps={{ name: inputName }}
      onChange={onChange}
    >
      {itemList.map((item: ItemListType) => (
        <MenuItem
          key={item.value}
          value={item.value}
          disabled={item.value === 'none'}
        >
          {item.value === 'none' ? <em>{item.label}</em> : item.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default Select;
