import Link from 'next/link';

export default function Home() {
  return (
    <div className='text-center'>
      <Link href='/add-job'>Add Job</Link>
    </div>
  );
}
