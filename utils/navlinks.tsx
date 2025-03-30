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

const userJobListNavLinks: NavLinkGroup = {
  title: 'User Job List',
  links: [
    {
      href: '/user/user-job-lists',
      label: 'view list of user job lists',
      icon: <AppWindow />,
    },

    {
      href: '/user/user-job-stats',
      label: 'view applicants stats',
      icon: <AppWindow />,
    },
  ],
};

const jobPostNavLinks: NavLinkGroup = {
  title: 'Job Posts',
  links: [
    {
      href: '/jobview/find-all-jobposts',
      label: 'view job post lists',
      icon: <Layers />,
    },
  ],
};

export const navLinks = {
  jobRequestLinks,
  jobPostNavLinks,
  userJobListNavLinks,
};

export type { NavLink, NavLinkGroup };
