import { AppWindow, AreaChart, Layers } from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: '/add-job',
    label: 'add job',
    icon: <Layers />,
  },

  {
    href: '/jobs',
    label: 'all jobs',
    icon: <AppWindow />,
  },

  {
    href: '/stats',
    label: 'job stats',
    icon: <AreaChart />,
  },
  {
    href: '/create-job-request',
    label: 'create job request',
    icon: <Layers />,
  },

  {
    href: '/job-under-review',
    label: 'review jobs',
    icon: <AppWindow />,
  },
];

export default links;
