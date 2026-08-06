import z from "zod";

export const AssignmentSchema = z.object({
  title: z.string(),
  description: z.string(),
  submissionDate: z.string(),
  totalScore: z.string().optional(),
})