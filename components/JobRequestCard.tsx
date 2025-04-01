import {
  jobFullfillmentRequestPayloadType,
  jobRequestResponsePayloadType,
  RequestStatus,
} from '@/utils/types';
import { MapPin, Briefcase, CalendarDays, RadioTower } from 'lucide-react';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import JobInfo from './JobInfo';

function JobRequestCard({
  jobRequestResponse,
}: {
  jobRequestResponse: jobRequestResponsePayloadType;
}) {
  const {
    talentRequestTitle,
    talentRequestId,
    jobDescription,
    candidateSkills,
    startDate,
    requestStatus,
    roleLevel,
    employmentType,
    talentFulfillmentId,
  } = jobRequestResponse;
  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle>{talentRequestTitle}</CardTitle>
        <CardDescription>Status: {requestStatus}</CardDescription>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-4'>
        <JobInfo icon={<Briefcase />} text={jobDescription.qualifications} />
        <JobInfo icon={<MapPin />} text={jobDescription.qualifications} />
        <JobInfo icon={<CalendarDays />} text={startDate} />
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button asChild size='sm'>
          {requestStatus === RequestStatus.APPROVED ? (
            <Link className='bg-stone-300' href={`/`}>
              View in Job List
            </Link>
          ) : (
            <Link
              className='bg-red-500'
              href={`/jobfulfill/${talentFulfillmentId}`}
            >
              Approve Job Request
            </Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
export default JobRequestCard;
