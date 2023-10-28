import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout } from './pages';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { homeLoader } from './utils/loaders/homeLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: homeLoader,
    children: [],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

export default App;
