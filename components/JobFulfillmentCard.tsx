import { jobRequestResponsePayloadType } from '@/utils/types';
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
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import JobInfo from './JobInfo';

function JobFulfillmentCard({
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
  } = jobRequestResponse;
  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle>{talentRequestTitle}</CardTitle>
        <CardDescription>Status: {requestStatus}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className='mt-4 grid grid-cols-2 gap-4'>
        <JobInfo icon={<Briefcase />} text={jobDescription.qualifications} />
        <JobInfo icon={<MapPin />} text={jobDescription.qualifications} />
        <JobInfo icon={<CalendarDays />} text={startDate} />

        {/* <Badge className='w-32  justify-center'>
          <JobInfo
            icon={<RadioTower className='w-4 h-4' />}
            text={jobRequest.jobDescription.qualifications}
          />
        </Badge> */}
      </CardContent>
      <CardFooter className='bg-amber-300 flex gap-4'>
        <Button asChild size='sm'>
          <Link href={`/jobfulfill/fuilfill-job-request`}>
            Edit Job Request
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
export default JobFulfillmentCard;
