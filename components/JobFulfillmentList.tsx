'use client';

import JobRequestCard from './JobRequestCard';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { jobRequestResponsePayloadType } from '@/utils/types';

function JobFulfillmentList() {
  const [jobRequestResponses, setJobRequestResponses] = useState<
    jobRequestResponsePayloadType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Fetches job requests from the talent request service
     * and stores the response in the component state.
     * If there is an error, it sets the error state instead.
     */
    /******  fe9d6152-2a79-428a-b6fb-14015f83d409  *******/
    const fetchTalentRequest = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/talent-request-service/talent-request'
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
      <div className='grid md:grid-cols-2 gap-8'>
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
export default JobFulfillmentList;
