'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
  CreateAndEditUserJobApplicationRequestType,
  createUserJobApplicationRequestSchema,
  userJobApplicantRequestPayload,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from './FormComponent';
import { useParams } from 'next/navigation';

function UserSubmitJobForm() {
  const { jobPostId } = useParams<{ jobPostId: string }>();

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

  async function onSubmit(values: CreateAndEditUserJobApplicationRequestType) {
    console.log('submitting form values', JSON.stringify(values, null, 2)); // Log the form values);

    try {
      const userJobApplicationData: userJobApplicantRequestPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: Number(values.mobileNumber),
        userEmail: values.userEmail,
        jobPostId: values.jobPostId,
      };
      const response = await fetch(
        'http://localhost:8080/user-service/user-service',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userJobApplicationData),
        }
      );

      return response.json();
    } catch (error: Error) {
      console.log('error occure submit job application', error.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'
      >
        <input type='hidden' {...form.register('jobPostId')} />
        <h2 className='capitalize font-semibold text-4xl mb-6'>
          Apply for Job Post: {jobPostId}
        </h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
          <CustomFormField name='firstName' control={form.control} />
          <CustomFormField name='lastName' control={form.control} />
          <CustomFormField name='userEmail' control={form.control} />
          <CustomFormField name='mobileNumber' control={form.control} />

          <Button type='submit' className='self-end capitalize'>
            Submit Job Now
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default UserSubmitJobForm;
