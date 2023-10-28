import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout, SettingsLayout } from './pages';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { homeLoader } from './utils/loaders/homeLoader';
import { AccountManagement, EditProfile, Password } from './components';

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
        children: [
          { index: true, path: 'edit-profile', element: <EditProfile /> },
          { path: 'management', element: <AccountManagement /> },
          { path: 'password', element: <Password /> },
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
