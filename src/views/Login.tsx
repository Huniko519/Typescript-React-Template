import { ChangeEvent, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { Person, Lock } from '@mui/icons-material';
import { Store } from 'react-notifications-component';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import useAuth from 'hooks/useAuth';
import { authLogo, backgroundImg } from 'assets/img';
import tw from 'twin.macro';

const Login: FC = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChangeLoginInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login({ user: loginInfo.username, pass: loginInfo.password });
      navigate('/home');
    } catch (e: any) {
      Store.addNotification({
        title: 'Login Error!',
        message: e.response.data,
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      setIsLoading(false);
    }
  };

  return (
    <Box
      css={tw`flex justify-center items-center w-full h-screen bg-center bg-no-repeat bg-cover`}
      sx={{ backgroundImage: `url("${backgroundImg}")` }}
    >
      <Paper tw="flex flex-col items-center p-12 bg-gradient-to-r from-purple-500 to-pink-500">
        <div tw="w-32 h-32 rounded-full mb-10 overflow-hidden bg-white border-white border-4">
          <img src={authLogo} alt="logo" />
        </div>
        <TextInput
          name="username"
          startIcon={<Person tw="text-white" />}
          placeholder="User Name"
          onChange={handleChangeLoginInfo}
          textColor="white"
          variant="underline"
          tw="my-3"
        />
        <TextInput
          name="password"
          type="password"
          startIcon={<Lock tw="text-white" />}
          placeholder="Password"
          onChange={handleChangeLoginInfo}
          textColor="white"
          variant="underline"
          tw="my-3"
        />
        <Button
          variant="contained"
          label="Login"
          round
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          onClick={handleLogin}
          tw="mt-4"
        />
      </Paper>
    </Box>
  );
};

export default Login;
