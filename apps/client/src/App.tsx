import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout, SettingsLayout } from './pages';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { homeLoader } from './utils/loaders/homeLoader';
import { AccountManagement, EditProfile, Password } from './components';
import { managementAction } from './utils/actions/managementAction';
import { editProfileAction } from './utils/actions/editProfileAction';
import { deleteUserAction } from './utils/actions/deleteUserAction';
import { passwordAction } from './utils/actions/passwordAction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: homeLoader,
    children: [
      { path: ':username', element: <h1>Home</h1> },
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
    </Provider>
  );
}

export default App;
