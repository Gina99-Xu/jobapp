'use client';

import { useEffect, useState } from 'react';
import StatsCards, { StatsLoadingCard } from './StatsCard';
import axios from 'axios';
import { JobStats } from '@/utils/types';
import { useParams } from 'next/navigation';

function StatsContainer() {
  const [jobStatsResponse, setJobStatsResponse] = useState<JobStats>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { jobPostId } = useParams();

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    const fetchJobStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user-service/user-resume-analysis/job-stats?jobPostId=${jobPostId}`
        );

        console.log('raw data is', response);

        setJobStatsResponse(response.data);
        setLoading(false);
        console.log('response data is', response.data);
      } catch (error) {
        setError('Failed to fetch job stats');
        setLoading(false);
      }
    };
    fetchJobStats();
  }, [jobPostId]);

  if (loading || !jobStatsResponse)
    return (
      <div className='grid grid-cols-2 gap-4'>
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
    );

  if (error) return <h2 className='text-xl'>Eror: {error}</h2>;

  return (
    <div className='grid grid-cols-2 gap-4'>
      jobStatsResponse
      <StatsCards
        title='totalJobApplicants'
        value={jobStatsResponse?.totalJobApplicants}
      />
      <StatsCards
        title='avgExperienceScore'
        value={formatter.format(jobStatsResponse?.avgExperienceScore)}
      />
      <StatsCards
        title='avgSkillsScore'
        value={formatter.format(jobStatsResponse?.avgSkillsScore)}
      />
      <StatsCards
        title='avgEducationScore'
        value={formatter.format(jobStatsResponse?.avgEducationScore)}
      />
      <StatsCards
        title='avgOverallScore'
        value={formatter.format(jobStatsResponse?.avgOverallScore)}
      />
    </div>
  );
}

export default StatsContainer;
