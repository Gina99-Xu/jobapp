import Link from 'next/link';
import { NavigationDropdown } from './NavigationDropdown';
import { Briefcase, LogIn, MessageSquare, User } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left side - Logo/Dropdown */}
          <div className='flex items-start gap-4'>
            <NavigationDropdown />
          </div>

          {/* Center - Navigation Links */}
          <div className='hidden md:flex items-center gap-6'>
            <Link
              href='/jobs'
              className='flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary'
            >
              <Briefcase className='h-4 w-4' />
              Job Request
            </Link>
            <Link
              href='/profile'
              className='flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary'
            >
              <User className='h-4 w-4' />
              Job Fulfillment
            </Link>
            <Link
              href='/profile'
              className='flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary'
            >
              <User className='h-4 w-4' />
              Job List
            </Link>
          </div>

          {/* Right side - Auth/Actions */}
          <div className='flex items-center gap-4'>
            <Link href='/' className='flex items-center gap-2'>
              <Briefcase className='h-6 w-6 text-primary' />
              <span className='text-lg font-semibold tracking-tight'>
                AI-JobManagement
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
