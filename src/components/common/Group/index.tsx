import { FC } from 'react';
import { Box } from '@mui/material';

interface IGroupProps {
  groupName: string;
  className?: string;
}

const Group: FC<IGroupProps> = (props) => {
  const { children, groupName, className } = props;
  return (
    <Box
      tw="border border-gray-300 rounded-lg p-4 mt-[30px]"
      className={className}
    >
      <div tw="mt-[-30px] mb-4">
        <span tw="text-[20px] bg-white px-2">{groupName}</span>
      </div>
      {children}
    </Box>
  );
};

Group.defaultProps = {
  className: '',
};

export default Group;
