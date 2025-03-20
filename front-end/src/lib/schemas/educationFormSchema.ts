import { z } from 'zod';

export const educationFormSchema = z
  .object({
    _id: z.string().optional(),
    school: z.string().min(1, 'School is required'),
    degree: z.string().min(1, 'Degree is required'),
    department: z.string().min(1, 'Department is required'),
    startMonth: z.string().min(1, 'Start month is required'),
    startYear: z.string().min(1, 'start year is required'),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
    currentlyStudying: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (!data.currentlyStudying) {
      if (!data.endMonth) {
        ctx.addIssue({
          code: 'custom',
          path: ['endMonth'],
          message: 'End month is required',
        });
      }
      if (!data.endYear) {
        ctx.addIssue({
          code: 'custom',
          path: ['endYear'],
          message: 'End Year is required',
        });
      }
    }
  });

export type EducationCreationForm = z.infer<typeof educationFormSchema>;
