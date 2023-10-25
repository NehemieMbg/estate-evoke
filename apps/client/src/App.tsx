import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
