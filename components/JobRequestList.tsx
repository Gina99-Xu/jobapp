'use client';

import JobRequestCard from './JobRequestCard';
import { useEffect, useState } from 'react';

import axios from 'axios';
import {
  jobFullfillmentRequestPayloadType,
  jobRequestResponsePayloadType,
} from '@/utils/types';

function JobRequestList() {
  const [jobRequestResponses, setJobRequestResponses] = useState<
    jobFullfillmentRequestPayloadType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalentRequest = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/talent-fulfillment-service/talent-fulfillment'
        );
        setJobRequestResponses(response.data);
        setLoading(false);

        console.log('response data is', response.data);
      } catch (error) {
        setError('Failed to fetch job requests');
        setLoading(false);
      }
    };

    fetchTalentRequest();
  }, []);

  if (loading) return <h2 className='text-xl'>Loading....</h2>;
  if (error) return <h2 className='text-xl'>Eror: {error}</h2>;

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold capitalize '>
          {jobRequestResponses.length} Job Requests Found
        </h2>
      </div>
      <div className='grid grid-cols-1 gap-4'>
        {jobRequestResponses.map((jobRequestResponse) => {
          return (
            <JobRequestCard
              key={jobRequestResponse.talentRequestId}
              jobRequestResponse={jobRequestResponse}
            />
          );
        })}
      </div>
    </>
  );
}
export default JobRequestList;
