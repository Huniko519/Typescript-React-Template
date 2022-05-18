import { FC, ReactNode } from 'react';
import tw from 'twin.macro';
import { Box, InputBase, InputBaseProps } from '@mui/material';

interface ITextInputProps extends InputBaseProps {
  // label: string;
  startIcon?: ReactNode;
  textColor: string;
  variant: 'outline' | 'underline';
}
const TextInput: FC<ITextInputProps> = (props) => {
  const {
    name,
    type,
    startIcon,
    className,
    textColor,
    size,
    variant,
    placeholder,
    multiline,
    onChange,
  } = props;

  return (
    <Box
      tw="flex items-center w-full rounded-md"
      css={[
        variant === 'underline'
          ? tw`border-b border-b-gray-200`
          : tw`border border-gray-400`,
        size === 'medium' ? 'p-4' : 'p-2',
      ]}
      className={className}
    >
      {startIcon}
      <InputBase
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        tw="ml-3 text-lg w-full"
        size="medium"
        className={textColor}
        multiline={multiline}
        rows={3}
      />
    </Box>
  );
};

TextInput.defaultProps = {
  startIcon: null,
};

export default TextInput;
