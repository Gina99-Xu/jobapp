import LinksDropDown from './LinksDropDown';

export default function Navbar() {
  return (
    <nav className='bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between'>
      <div>
        <LinksDropDown />
      </div>
      <div className='flex items-center gap-x-4'>Toggle Theme</div>
    </nav>
  );
}
