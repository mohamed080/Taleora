import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine((value) => isValidPhoneNumber(value), {
    message: "Please enter a valid phone number",
  });

export const loginSchema = z.object({
  email: z
    .string()
 .min(1, "Email or username is required")
 .refine((value) => {
      const isEmail = z.string().email().safeParse(value).success;

      const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);

      return isEmail || isUsername;
    }, "Enter a valid email or username"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(2, "Family name must be at least 2 characters")
    .max(50, "Family name is too long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  phone: phoneSchema,
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  phone: phoneSchema,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
