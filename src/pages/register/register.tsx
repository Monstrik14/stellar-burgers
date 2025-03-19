import { FC, SyntheticEvent, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  errorSelector,
  registerUserThunk
} from 'src/slices/userSlice';
import { useForm } from 'src/hooks/useForm';
import { AppDispatch } from 'src/services/store';

export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(errorSelector);

  const { values, handleChange } = useForm({
    userName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUserThunk({
        name: values.userName,
        email: values.email,
        password: values.password
      })
    );
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <RegisterUI
      errorText=''
      email={values.email}
      userName={values.userName}
      password={values.password}
      setEmail={(e) => handleChange('email', e)}
      setPassword={(e) => handleChange('password', e)}
      setUserName={(e) => handleChange('name', e)}
      handleSubmit={handleSubmit}
    />
  );
};
