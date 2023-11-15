import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  NewDesign,
  HomeLayout,
  ProfileLayout,
  SettingsLayout,
  PostsLayout,
  Post,
  Search,
} from './pages';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { homeLoader } from './utils/loaders/homeLoader';
import {
  AccountManagement,
  EditProfile,
  FollowingPosts,
  Password,
  Posts,
  Work,
} from './components';
import { managementAction } from './utils/actions/managementAction';
import { editProfileAction } from './utils/actions/editProfileAction';
import { deleteUserAction } from './utils/actions/deleteUserAction';
import { passwordAction } from './utils/actions/passwordAction';
import { Toaster } from 'react-hot-toast';
import { designAction } from './utils/actions/designAction';
import { postsLoader } from './utils/loaders/postsLoader';
import { profileLoader } from './utils/loaders/profileLoader';
import { profileWorkLoader } from './utils/loaders/profileWorkLoader';
import { postLoader } from './utils/loaders/postLoader';
import { followingPostsLoader } from './utils/loaders/followingPostsLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: homeLoader,
    children: [
      {
        path: '/',
        element: <PostsLayout />,
        children: [
          { index: true, element: <Posts />, loader: postsLoader },
          {
            path: 'following',
            element: <FollowingPosts />,
            loader: followingPostsLoader,
          },
        ],
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/gallery/:postId/:postName',
        element: <Post />,
        loader: postLoader,
      },
      {
        path: '/portfolio/new-design',
        element: <NewDesign />,
        action: designAction,
      },
      {
        path: '/:username',
        element: <ProfileLayout />,
        loader: profileLoader,
        children: [
          { index: true, element: <Work />, loader: profileWorkLoader },
          { path: 'about' },
        ],
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
