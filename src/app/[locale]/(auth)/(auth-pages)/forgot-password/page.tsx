"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaPhoneAlt } from "react-icons/fa";
import { toast } from "sonner";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/auth-schemas";
import { forgotPasswordApi } from "@/services/auth-api";
import { Button, PhoneField } from "@/components/ui";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const locale = useLocale();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { phone: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
        console.log("Form data submitted:", data);

    try {
      await forgotPasswordApi(data.phone);
      toast.success(t("success"));
      router.push(`/${locale}/reset-password`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("error"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* Header */}
      <div className="mb-2 text-center">
        <h1 className="font-seasons text-2xl md:text-3xl lg:text-[35px] font-bold text-primary">
          {t("title")}
        </h1>
        <p className="mt-1 text-sm sm:text-base text-[#6F6F6F]">{t("subtitle")}</p>
      </div>

      {/* Phone Number */}
      <PhoneField
        name="phone"
        control={control}
        label={t("phoneLabel")}
        inputSize="lg"
        variant="pink"
        leftIcon={<FaPhoneAlt className="h-4 sm:h-5 w-4" />}
        error={errors.phone?.message}
        placeholder={t("phoneLabel")}
        defaultCountry="EG"
      />

      {/* Submit */}
      <Button
        type="submit"
        variant="gradient"
        disabled={isSubmitting}
        size="lg"
        className="h-12.5 shadow-[0px_4px_19px_0px_#7793414D] cursor-pointer"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </span>
        ) : (
          t("sendCode")
        )}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="h-px flex-1 bg-[#5F5E5E]" />
        <span className="text-lg sm:text-2xl text-[#6F6F6F] font-light">
          {t("or")}
        </span>
        <span className="h-px flex-1 bg-[#5F5E5E]" />
      </div>

      {/* Social Login */}
      <div className="flex items-center justify-center gap-4">
        <Button
          type="button"
          variant="social"
          className="w-13 h-12 min-[400px]:flex-1  sm:px-5 gap-2.5 sm:gap-5 font-medium"
        >
          <FcGoogle className="h-6! w-6!" />
          <span className="hidden min-[400px]:inline">{t("googleSignIn")}</span>
        </Button>
        <Button
          type="button"
          variant="social"
          className=" h-12 w-13 shrink-0 p-0"
        >
          <FaFacebook className="h-6! w-6! text-[#1877F2]" />
        </Button>
        <Button
          type="button"
          variant="social"
          className="h-12 w-13 shrink-0 p-0"
        >
          <FaApple className="h-6! w-6!  text-gray-800" />
        </Button>
      </div>
    </form>
  );
}
