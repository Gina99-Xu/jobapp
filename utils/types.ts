import * as z from 'zod';

export enum CoreSkill {
  JAVA = 'JAVA',
  PYTHON = 'PYTHON',
  NODEJS = 'NODEJS',
  REACT = 'REACT',
  AGILE_COACH = 'AGILE_COACH',
  PROJECT_MANAGEMENT = 'PROJECT_MANAGEMENT',
}

export enum SkillLevel {
  STUDENT = 'STUDENT',
  JUNIOR = 'JUNIOR',
  ENTRY = 'ENTRY',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export type JobRequestType = {
  jobDescription: string;
  talentRequestTitle: string;
  qualifications: string;
  coreSkills: CoreSkill[];
  startDate: string;
  skillLevel: SkillLevel;
};

export type jobDescriptionType = {
  responsibilities: string;
  qualifications: string;
};

export type CandidateSkillsType = {
  coreSkills: CoreSkill;
  skillLevel: SkillLevel;
};

export type jobRequestBackendType = {
  talentRequestTitle: string;
  jobDescription: jobDescriptionType;
  candidateSkills: CandidateSkillsType;
  startDate: string;
};

export const createAndEditJobRequestSchema = z.object({
  coreSkills: z.array(
    z.nativeEnum(CoreSkill, {
      errorMap: () => ({
        message: 'Please select at least one core skill',
      }),
    })
  ),
  skillLevel: z.nativeEnum(SkillLevel, {
    errorMap: () => ({
      message: 'Please select a skill level',
    }),
  }),
  jobDescription: z.string().min(2, {
    message:
      'job description or responsibilities must be at least 2 characters',
  }),
  talentRequestTitle: z.string().min(2, {
    message: 'talentRequestTitle must be at least 2 characters',
  }),

  qualifications: z.string().min(2, {
    message: 'talentRequestTitle must be at least 2 characters',
  }),
  startDate: z.coerce
    .date()
    .min(new Date(), { message: 'Start date must be in the future' }),
});

export type CreateAndEditJobRequestType = z.infer<
  typeof createAndEditJobRequestSchema
>;

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Pending = 'pending',
  Interview = 'interview',
  Declined = 'declined',
}

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
}

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters.',
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'location must be at least 2 characters.',
  }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
