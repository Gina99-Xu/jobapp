import Link from 'next/link';
import { NavigationDropdown } from './NavigationDropdown';

export default function Navbar() {
  return (
    <nav className='bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between'>
      <div>
        <NavigationDropdown />
      </div>
      <div className='flex items-center gap-x-4'>
        <Link href='/' className='flex items-center gap-x-2'>
          Home
        </Link>
      </div>
    </nav>
  );
}
