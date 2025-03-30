'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  CoreSkill,
  CreateAndEditJobRequestType,
  SkillLevel,
  createAndEditJobRequestSchema,
  jobRequestPayloadType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import CustomFormSelect, { CustomFormField } from './FormComponent';
import { toast } from 'sonner';
import { CustomDatePicker } from './CustomDatePicker';
import { useEffect } from 'react';

function CreateJobRequestForm() {
  const form = useForm<CreateAndEditJobRequestType>({
    resolver: zodResolver(createAndEditJobRequestSchema),
    defaultValues: {
      jobDescription: '',
      talentRequestTitle: '',
      qualifications: '',
      startDate: new Date(),
      coreSkill: CoreSkill.JAVA,
      skillLevel: SkillLevel.ENTRY,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: CreateAndEditJobRequestType) => {
      const backendData: jobRequestPayloadType = {
        talentRequestTitle: data.talentRequestTitle,
        jobDescription: {
          responsibilities: data.jobDescription,
          qualifications: data.qualifications,
        },
        candidateSkills: {
          coreSkill: data.coreSkill,
          skillLevel: data.skillLevel,
        },
        startDate: data.startDate.toISOString().split('T')[0],
      };
      const response = await fetch(
        'http://localhost:8080/talent-request-service/talent-request',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(backendData),
        }
      );

      console.log('inside');
      return response.json();
    },
    onSuccess: () => {
      toast.success('Job Request Created Successfully');
    },

    onError: () => {
      toast.error('Failed to create job request');
    },
  });

  function onSubmit(values: CreateAndEditJobRequestType) {
    console.log('form values', values);
    mutate(values);
  }

  useEffect(() => {
    console.log('Form values:', form.getValues());
    console.log('Form errors:', form.formState.errors);
  }, [form.watch()]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6'>
          Create Job Request
        </h2>
        <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-1 items-start'>
          {/* jobDescription */}
          <CustomFormField name='jobDescription' control={form.control} />
          {/* talentRequestTitle */}
          <CustomFormField name='talentRequestTitle' control={form.control} />
          <CustomFormField name='qualifications' control={form.control} />

          {/* <div className=' space-y-2'>
            <Label>Core Skills</Label>
            <MultiSkillSelect name='coreSkills' control={form.control} />
          </div> */}

          <CustomFormSelect
            name='coreSkill'
            control={form.control}
            labelText='Core Skill'
            items={CoreSkill}
          />

          <CustomFormSelect
            name='skillLevel'
            control={form.control}
            labelText='Skill Level'
            items={SkillLevel}
          />
          <CustomDatePicker
            name='startDate'
            control={form.control}
            label='Start Date'
          />
          <Button type='submit' className='self-end capitalize'>
            Submit Job Request
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateJobRequestForm;
