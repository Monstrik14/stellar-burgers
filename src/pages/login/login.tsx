import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { error } from 'console';
import { clearErrors, errorSelector, loginUserThunk } from 'src/services/slices/userSlice';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const eror = useSelector(errorSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });
  const { from } = location.state || { from: { pathname: '/' } };
  
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      loginUserThunk({ email: values.email, password: values.password })
    );
    navigate(from.pathname, { replace: true });
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

