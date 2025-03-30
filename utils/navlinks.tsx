import { AppWindow, Layers } from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type NavLinkGroup = {
  title: string;
  links: NavLink[];
};

const jobRequestLinks: NavLinkGroup = {
  title: 'Job Requests',
  links: [
    {
      href: '/jobrequest/create-job-request',
      label: 'create new job request',
      icon: <Layers />,
    },

    {
      href: '/jobrequest/view-job-requests',
      label: 'view job request lists',
      icon: <AppWindow />,
    },
  ],
};

// const fullfillJobRequestLinks: NavLinkGroup = {
//   title: 'Fullfill Job Request',
//   links: [
//     {
//       href: '/jobfulfill/fuilfill-job-request',
//       label: 'create job fullfillment',
//       icon: <Layers />,
//     },

//     {
//       href: '/jobfulfill/view-job-fullfill-requests',
//       label: 'view job fullfillment requests',
//       icon: <AppWindow />,
//     },
//   ],
// };

const jobPostNavLinks: NavLinkGroup = {
  title: 'Job Posts',
  links: [
    {
      href: '/jobview/find-all-jobposts',
      label: 'view job post lists',
      icon: <Layers />,
    },

    {
      href: '/jobview/add-job',
      label: 'view job post stats',
      icon: <AppWindow />,
    },
  ],
};

export const navLinks = {
  jobRequestLinks,
  jobPostNavLinks,
};

export type { NavLink, NavLinkGroup };
