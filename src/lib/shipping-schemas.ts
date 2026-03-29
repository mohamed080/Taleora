import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export type TranslationFn = (key: string) => string;

export const getShippingSchema = (t: TranslationFn, path = "checkout.validation") =>
  z.object({
    fullName: z.string().min(1, t(`${path}.fullNameRequired`)),
    phone: z
      .string()
      .min(1, t(`${path}.phoneRequired`))
      .refine((value) => isValidPhoneNumber(value), {
        message: t(`${path}.phoneInvalid`),
      }),
    address: z.string().min(1, t(`${path}.addressRequired`)),
    city: z.string().min(1, t(`${path}.cityRequired`)),
    postalCode: z.string().optional(),
  });

export type ShippingFormValues = z.infer<ReturnType<typeof getShippingSchema>>;
