import { z } from 'zod';

export const courseSchema = z.object({
  name: z.string().min(2, 'Course name must be at least 2 characters'),
  code: z.string().min(2, 'Course code is required').max(20),
  departmentId: z.coerce.number().min(1, 'Please select a department'),
  credits: z.coerce.number().min(1).max(10).default(3),
});

export type CourseFormInput = z.input<typeof courseSchema>;
export type CourseFormData = z.infer<typeof courseSchema>;

export const timetableSlotSchema = z
  .object({
    courseId: z.coerce.number().min(1, 'Please select a course'),
    dayOfWeek: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    room: z.string().optional(),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: 'Start time must be before end time',
    path: ['endTime'],
  });

export type TimetableSlotFormInput = z.input<typeof timetableSlotSchema>;
export type TimetableSlotFormData = z.infer<typeof timetableSlotSchema>;
