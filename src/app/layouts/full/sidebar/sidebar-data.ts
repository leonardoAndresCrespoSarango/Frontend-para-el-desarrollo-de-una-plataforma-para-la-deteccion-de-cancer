import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Componentes',
  },
  {
    displayName: 'Doctores',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Pacientes',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Reporte',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
];
