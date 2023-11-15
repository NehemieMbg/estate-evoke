import { useDispatch, useSelector } from 'react-redux';
import {
  openLoginModal,
  openRegisterModal,
} from '../redux/reducers/auth-reducer';
import { User } from '../types/user-type';

const useSession = () => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { auth: { user: User } }) => state.auth.user
  );

  const openLogin = () => {
    dispatch(openLoginModal());
  };
  const openRegister = () => {
    dispatch(openRegisterModal());
  };

  return { openLogin, openRegister, user, isLoggedIn: user ? true : false };
};
export default useSession;
