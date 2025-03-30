'use client';

import { navLinks } from '@/utils/navlinks';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className='py-4 px-8 bg-muted h-full'>
      <div className='flex flex-col mt-20 gap-y-4'>
        {/**JOB REQUEST LINKS */}
        <div className='mb-4'>
          <h2 className='text-lg font-bold'>
            {navLinks.jobRequestLinks.title}
          </h2>
          <div className='flex flex-col gap-y-2'>
            {navLinks.jobRequestLinks.links.map((link) => (
              <div key={link.href}>
                <Button
                  asChild
                  key={link.href}
                  variant={pathname === link.href ? 'default' : 'link'}
                >
                  <Link href={link.href}>
                    <span className='mr-2'>{link.icon}</span> {link.label}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/**JOB POST LINKS */}
        <div className='mb-4'>
          <h2 className='text-lg font-bold'>
            {navLinks.jobPostNavLinks.title}
          </h2>
          <div className='flex flex-col gap-y-2'>
            {navLinks.jobPostNavLinks.links.map((link) => (
              <div key={link.href}>
                <Button
                  asChild
                  key={link.href}
                  variant={pathname === link.href ? 'default' : 'link'}
                >
                  <Link href={link.href}>
                    <span className='mr-2'>{link.icon}</span> {link.label}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/**USER JOB LINKS */}
        <div className='mb-4'>
          <h2 className='text-lg font-bold'>
            {navLinks.userJobListNavLinks.title}
          </h2>
          <div className='flex flex-col gap-y-2'>
            {navLinks.userJobListNavLinks.links.map((link) => (
              <div key={link.href}>
                <Button
                  asChild
                  key={link.href}
                  variant={pathname === link.href ? 'default' : 'link'}
                >
                  <Link href={link.href}>
                    <span className='mr-2'>{link.icon}</span> {link.label}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
