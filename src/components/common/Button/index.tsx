import { FC } from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import PuffLoader from 'react-spinners/PuffLoader';

interface IButtonProps extends ButtonProps {
  label: string;
  round?: boolean;
  loading?: boolean;
}
const Button: FC<IButtonProps> = (props) => {
  const {
    label,
    variant,
    className,
    round,
    loading,
    fullWidth,
    disabled,
    color,
    onClick,
  } = props;

  return (
    <MuiButton
      variant={variant}
      className={className}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      classes={{
        root: `${round ? 'rounded-full' : ''} text-slate-900 font-black`,
        text: '',
      }}
      color={color}
    >
      {loading ? <PuffLoader size="30px" /> : label}
    </MuiButton>
  );
};

Button.defaultProps = {
  round: false,
  loading: false,
};

export default Button;
