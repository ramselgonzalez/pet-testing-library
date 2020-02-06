import { Add, Profile } from '../pages';
import { Person, Pets } from '@material-ui/icons';

export const routes = [
  {
    component: Profile,
    exact: true,
    icon: Person,
    key: 'profile',
    path: '/profile',
    title: 'Profile'
  },
  {
    component: Add,
    exact: true,
    icon: Pets,
    key: 'add',
    path: '/add',
    title: 'Add A Pet'
  }
];
