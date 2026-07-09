import { z } from 'zod';

export const leaveSchema = z
  .object({
    reason: z.string().min(5, 'Reason must be at least 5 characters'),
    fromDate: z.string().min(1, 'From date is required'),
    toDate: z.string().min(1, 'To date is required'),
  })
  .refine((data) => new Date(data.fromDate) <= new Date(data.toDate), {
    message: 'From date cannot be after to date',
    path: ['toDate'],
  });

export type LeaveFormData = z.infer<typeof leaveSchema>;