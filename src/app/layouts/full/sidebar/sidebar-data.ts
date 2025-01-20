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
    navCap: 'Herramientas',
  },
  {
    displayName: 'Médicos',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Registro Pacientes',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Visualización IA',
    iconName: 'list',
    route: '/ui-components/lists',
    disabled:true,
  },
  {
    navCap: 'Autenticación',
  },
  {
    displayName: 'Inicio de Sesión',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Registrarse',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
];
