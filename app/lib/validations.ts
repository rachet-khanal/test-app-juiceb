import { z } from "zod"

export const firstNameSchema = z
  .string()
  .min(1, "First name is required")
  .min(2, "First name must be at least 2 characters")
  .max(50, "First name must be less than 50 characters")
  .regex(
    /^[a-zA-Z\s'-]+$/,
    "First name can only contain letters, spaces, hyphens, and apostrophes"
  )

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(100, "Email must be less than 100 characters")

export const surveyFormSchema = z.object({
  firstName: firstNameSchema,
  email: emailSchema,
})

export type SurveyFormData = z.infer<typeof surveyFormSchema>
