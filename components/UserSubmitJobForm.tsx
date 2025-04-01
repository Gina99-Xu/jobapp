'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  CreateAndEditUserJobApplicationRequestType,
  createUserJobApplicationRequestSchema,
  userJobApplicantRequestPayload,
  userJobApplicationData,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField } from './FormComponent';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

function UserSubmitJobForm() {
  const { jobPostId } = useParams<{ jobPostId: string }>();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gptResult, setGptResult] = useState<userJobApplicationData | null>(
    null
  );
  const [showGptResult, setShowGptResult] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CreateAndEditUserJobApplicationRequestType>({
    resolver: zodResolver(createUserJobApplicationRequestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobileNumber: 0,
      userEmail: '',
      jobPostId,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  async function onSubmit(values: CreateAndEditUserJobApplicationRequestType) {
    console.log('submitting form values', JSON.stringify(values, null, 2)); // Log the form values);

    if (!resumeFile) {
      alert('Please upload your resume before submitting!');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('submmiting job application....');

    try {
      const formData = new FormData();
      const userJobApplicationData: userJobApplicantRequestPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: Number(values.mobileNumber),
        userEmail: values.userEmail,
        jobPostId: values.jobPostId,
      };

      formData.append('userData', JSON.stringify(userJobApplicationData));
      formData.append('resumePdf', resumeFile);

      const response = await fetch(
        'http://localhost:8080/user-service/user-service/save-user-and-analyze-resume',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Error while submitting job application!');
      }

      const result = await response.json();
      console.log('api result', result);

      form.reset();
      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setGptResult(result);
      setShowGptResult(true);

      console.log('gptresult is', gptResult);
      console.log('showGptResult is', showGptResult);

      toast.success('Application submitted successfully!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Error while submitting job application!', {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='space-y-6'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='bg-muted p-8 rounded'
          encType='multipart/form-data'
        >
          <input type='hidden' {...form.register('jobPostId')} />
          <h2 className='capitalize font-semibold text-4xl mb-6'>
            Apply for Job Post: {jobPostId}
          </h2>
          <div className='grid grid-cols-1 gap-4 items-start'>
            <CustomFormField
              disabled={isSubmitting}
              name='firstName'
              control={form.control}
            />
            <CustomFormField
              disabled={isSubmitting}
              name='lastName'
              control={form.control}
            />
            <CustomFormField
              disabled={isSubmitting}
              name='userEmail'
              control={form.control}
            />
            <CustomFormField
              disabled={isSubmitting}
              name='mobileNumber'
              control={form.control}
            />
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Resume Upload
              </label>
              <input
                disabled={isSubmitting}
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                accept='.pdf'
                className='block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100'
              />
              {resumeFile && (
                <p className='text-sm text-gray-600 mt-1'>
                  Selected file: {resumeFile.name}
                </p>
              )}
            </div>
            <Button
              disabled={isSubmitting}
              type='submit'
              className='self-end capitalize'
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </Form>

      {gptResult && (
        <div className='space-y-4'>
          <div className='flex justify-end'>
            <Button
              onClick={() => setShowGptResult(!showGptResult)}
              variant='outline'
            >
              {showGptResult ? 'Hide Results' : 'View Analysis Results'}
            </Button>
          </div>

          {showGptResult && (
            <Card>
              <CardHeader>
                <CardTitle>Resume Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-medium'>Applicant Information</h3>
                    <p>
                      Name: {gptResult.firstName} {gptResult.lastName}
                    </p>
                    <p>Email: {gptResult.userEmail}</p>
                  </div>

                  {gptResult.userJobAppliedList?.map((analysis, index) => (
                    <div key={index} className='space-y-2'>
                      <h3 className='font-medium'>Analysis Scores</h3>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <p>
                            Experience Score:{' '}
                            {analysis.experienceScore.toFixed(2)}
                          </p>
                          <p>Skills Score: {analysis.skillsScore.toFixed(2)}</p>
                        </div>
                        <div>
                          <p>
                            Education Score:{' '}
                            {analysis.educationScore.toFixed(2)}
                          </p>
                          <p>
                            Overall Score: {analysis.overallScore.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className='font-medium mt-4'>Analysis Summary</h4>
                        <p className='text-sm'>{analysis.overallAnalysis}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
export default UserSubmitJobForm;
