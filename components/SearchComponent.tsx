'use client';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CoreSkill,
  EmploymentType,
  JobStatus,
  RoleLevel,
  SkillLevel,
} from '@/utils/types';

function SearchComponent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const employmentType = searchParams.get('employmentType') || '';
  const router = useRouter();
  const pathname = usePathname();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('jobStatus') as string;
    params.set('search', search);
    params.set('jobStatus', jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className='bg-muted mb-4 grid grid-cols-3 gap-2 rounded-lg'
      onSubmit={handleSubmit}
    >
      <Input
        type='text'
        placeholder='Search Jobs'
        name='search'
        defaultValue={search}
      />
      <div className='flex flex-row gap-2 items-start'>
        <Select defaultValue={EmploymentType.FULL_TIME} name='jobStatus'>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[...Object.values(EmploymentType)].map((employmentType) => {
              return (
                <SelectItem key={employmentType} value={employmentType}>
                  {employmentType}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Button className='align-self-end' variant='outline' type='submit'>
        Search
      </Button>
    </form>
  );
}
export default SearchComponent;
