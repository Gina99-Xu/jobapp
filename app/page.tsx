import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col gap-y-4'>
      <Link href='/jobview'>Job view</Link>
      <Link href='/jobrequest'>job request</Link>
      <Link href='/jobfulfill'>job fullfill</Link>
    </div>
  );
}
