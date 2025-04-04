'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CoreSkill,
  EmploymentType,
  jobListPayloadType,
  RoleLevel,
  SkillLevel,
} from '@/utils/types';
import JobListCard from './JobListCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from './ui/button';

function JobList() {
  const [jobListResponses, setJobListResponses] = useState<
    jobListPayloadType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**Pagination Part */
  const [currentPage, setCurrentPage] = useState(1);
  const [jobPerPage, setJobPerPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    console.log('inside page');
    setCurrentPage(page);
    console.log('current page', currentPage);
    console.log('job per page', jobPerPage);
  };

  /**Search Filters */
  const [searchUrl, setSearchUrl] = useState('');
  const [employmentTypeSelect, setEmploymentTypeSelect] =
    useState<EmploymentType>();
  const [coreSkillSelect, setCoreSkillSelect] = useState<CoreSkill>();
  const [roleLevelSelect, setRoleLevelSelect] = useState<RoleLevel>();
  const [skillLevelSelect, setSkillLevelSelect] = useState<SkillLevel>();
  const [queryParams, setQueryParams] = useState('');
  const loadedJobs: jobListPayloadType[] = [];
  const params = new URLSearchParams();

  const resetFilterParams = () => {
    setCurrentPage(1);
    setSkillLevelSelect(undefined);
    setCoreSkillSelect(undefined);
    setRoleLevelSelect(undefined);
    setEmploymentTypeSelect(undefined);
  };
  const buildQueryParam = () => {
    const hasFilters =
      employmentTypeSelect ||
      coreSkillSelect ||
      roleLevelSelect ||
      skillLevelSelect;

    if (employmentTypeSelect) {
      params.append('employmentType', employmentTypeSelect);
    }
    if (coreSkillSelect) {
      params.append('coreSkill', coreSkillSelect);
    }
    if (roleLevelSelect) {
      params.append('roleLevel', roleLevelSelect);
    }
    if (skillLevelSelect) {
      params.append('skillLevel', skillLevelSelect);
    }

    if (!hasFilters) {
      params.append('page', currentPage.toString());
      params.append('size', jobPerPage.toString());
    }
    return params;
  };

  const handleEmploymentTypeChange = (value: EmploymentType) => {
    setCurrentPage(1);
    setEmploymentTypeSelect(value);
  };

  const handleCoreSkillChange = (value: CoreSkill) => {
    setCurrentPage(1);
    setCoreSkillSelect(value);
  };

  const handleRoleLevelChange = (value: RoleLevel) => {
    setCurrentPage(1);
    setRoleLevelSelect(value);
  };

  const handleSkillLevelChange = (value: SkillLevel) => {
    setCurrentPage(1);
    setSkillLevelSelect(value);
  };

  useEffect(() => {
    const fetchTalentRequest = async () => {
      const toastId = 'job-list-toast';
      try {
        setLoading(true);
        toast.loading('Fetching job list...', { id: toastId });

        const baseUrl: string = 'http://localhost:8080/career-portal-service';
        const params = buildQueryParam();
        const queryString = params.toString();

        let url: string = '';
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const hasPagination = params.has('page') && params.has('size');
        if (hasPagination) {
          url = `${baseUrl}/jobPosts?${queryString}`;
          console.log('inside null', url);

          const response = await axios.get(url, requestOptions);
          const responseData = await response.data._embedded.jobPosts;
          const pageResponseObj = await response.data.page;
          const { totalPages } = pageResponseObj;

          /**Restructure job data - why need to pass jobPostId! */
          for (const key in responseData) {
            loadedJobs.push({
              jobPostId: responseData[key]._links.self.href.split('/').pop(),
              talentRequestTitle: responseData[key].talentRequestTitle,
              jobDescription: responseData[key].jobDescription,
              candidateSkills: responseData[key].candidateSkills,
              roleLevel: responseData[key].roleLevel,
              employmentType: responseData[key].employmentType,
            });
          }

          setTotalPages(totalPages);
          setJobListResponses(loadedJobs);
          setTotalJobs(responseData.length);
          toast.success('Jobs loaded successfully', { id: toastId });
        } else {
          url = `${baseUrl}/job-post?${queryString}`;
          console.log('inside NOT NULL', url);

          const response = await axios.get(url, requestOptions);
          const responseData = await response.data;

          setJobListResponses(responseData);
          setTotalJobs(responseData.length);
          setLoading(false);
        }
        toast.success('Jobs loaded successfully', { id: toastId });
      } catch (error: any) {
        toast.error('Failed to fetch job lists', { id: toastId });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTalentRequest();
  }, [
    searchUrl,
    employmentTypeSelect,
    coreSkillSelect,
    roleLevelSelect,
    skillLevelSelect,
    currentPage,
  ]);

  if (loading) return <h2 className='text-xl'>Loading...</h2>;
  if (error) return <h2 className='text-xl'> Error: {error}</h2>;

  return (
    <>
      <div className='flex items-center justify-between mb-4 gap-x-1'>
        <h2 className='text-xl font-semibold capitalize '>
          {totalJobs} Job Result Found
        </h2>
      </div>
      <div className='flex flex-col items-start justify-center mb-4 '>
        <div className='flex flex-row gap-2'>
          <Select
            onValueChange={handleSkillLevelChange}
            defaultValue={SkillLevel.ENTRY}
            name='skillLevel'
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[...Object.values(SkillLevel)].map((skillLevel) => {
                return (
                  <SelectItem key={skillLevel} value={skillLevel}>
                    {skillLevel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleEmploymentTypeChange}
            defaultValue={EmploymentType.FULL_TIME}
            name='jobStatus'
          >
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
          <Select
            onValueChange={handleCoreSkillChange}
            defaultValue={CoreSkill.JAVA}
            name='coreSkill'
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[...Object.values(CoreSkill)].map((coreSkill) => {
                return (
                  <SelectItem key={coreSkill} value={coreSkill}>
                    {coreSkill}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleRoleLevelChange}
            defaultValue={RoleLevel.INDIVIDUAL_CONTRIBUTOR}
            name='roleLevel'
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[...Object.values(RoleLevel)].map((roleLevel) => {
                return (
                  <SelectItem key={roleLevel} value={roleLevel}>
                    {roleLevel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {/* Reset Button */}
          <Button
            variant='outline'
            onClick={resetFilterParams}
            className='ml-2'
          >
            Reset Filters
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6'>
        {jobListResponses.length > 0 &&
          jobListResponses.map((joblistResponse) => {
            return (
              <JobListCard
                key={joblistResponse.jobPostId}
                jobListResponse={joblistResponse}
              />
            );
          })}
      </div>
      <div className='flex flex-col items-end my-6'>
        {jobListResponses.length > 0 && (
          <div className='flex items-center justify-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={isFirstPage}
              aria-label='Previous page'
            >
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only md:not-sr-only'>Previous</span>
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={i + 1 === currentPage ? 'default' : 'outline'}
                size='sm'
                onClick={() => handlePageChange(i + 1)}
                aria-current={i + 1 === currentPage ? 'page' : undefined}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={isLastPage}
              aria-label='Next page'
            >
              <span className='sr-only md:not-sr-only'>Next</span>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
export default JobList;
