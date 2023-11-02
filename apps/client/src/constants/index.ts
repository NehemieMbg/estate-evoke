export const navbar = [{ label: 'For You', path: '/' }];

export const auth = {
  signIn: {
    label: 'Sign in',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    buttonLabel: 'Sign in',
    forgotPasswordLabel: 'Forgot ?',
    noAccountLabel: "Don't have an account ?",
  },
  signUp: {
    label: 'Sign up',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    buttonLabel: 'Create Account',
    alreadyAccountLabel: 'Already have an account ?',
  },
};

export const settingsNav = [
  { label: 'Edit Profile', path: '/account/edit-profile' },
  { label: 'Account management', path: '/account/management' },
  { label: 'Password', path: '/account/password' },
];

export const settingsPages = {
  editProfile: {
    title: 'Edit Profile',
    description:
      'Keep your personal details private. Information you add here is visible to any who can view your profile.',
  },
  manageAccount: {
    title: 'Account Management',
    description: 'Make changes to your personal information or account type.',
  },
  password: {
    title: 'Password',
    description: 'Manage your password.',
  },
};
