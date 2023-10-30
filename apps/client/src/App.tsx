import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NewDesign, HomeLayout, ProfileLayout, SettingsLayout } from './pages';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { homeLoader } from './utils/loaders/homeLoader';
import { AccountManagement, EditProfile, Password, Work } from './components';
import { managementAction } from './utils/actions/managementAction';
import { editProfileAction } from './utils/actions/editProfileAction';
import { deleteUserAction } from './utils/actions/deleteUserAction';
import { passwordAction } from './utils/actions/passwordAction';
import { Toaster } from 'react-hot-toast';
import { designAction } from './utils/actions/designAction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: homeLoader,
    children: [
      {
        path: '/portfolio/new-design',
        element: <NewDesign />,
        action: designAction,
      },
      {
        path: ':username',
        element: <ProfileLayout />,
        children: [{ index: true, element: <Work /> }],
      },
      {
        path: 'account',
        element: <SettingsLayout />,
        action: deleteUserAction,
        children: [
          {
            index: true,
            path: 'edit-profile',
            element: <EditProfile />,
            action: editProfileAction,
          },
          {
            path: 'management',
            element: <AccountManagement />,
            action: managementAction,
          },
          { path: 'password', element: <Password />, action: passwordAction },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </Provider>
  );
}

export default App;
