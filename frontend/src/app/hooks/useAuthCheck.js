import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../store/authSlice';

export const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
};