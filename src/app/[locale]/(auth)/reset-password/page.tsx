"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/auth-schemas";
import { resetPasswordApi } from "@/services/auth-api";
import { Button, FloatingLabelInput } from "@/components/ui";
import { IoMdLock } from "react-icons/io";
import { MdKey, MdOutlineKeyOff } from "react-icons/md";

export default function ResetPasswordPage() {
  const t = useTranslations("auth.resetPassword");
  const locale = useLocale();
  const router = useRouter();

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPasswordApi(data.newPassword);
      toast.success(t("success"));
      router.push(`/${locale}/login`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("error"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      {/* Header */}
      <div className="mb-2 text-center">
        <h1 className="font-seasons text-2xl md:text-3xl lg:text-[35px] font-bold text-primary">
          {t("title")}
        </h1>
        <p className="mt-1 text-sm sm:text-base text-[#6F6F6F]">
          {t("subtitle")}
        </p>
      </div>

      {/* New Password */}
      <FloatingLabelInput
        label={t("newPasswordLabel")}
        type={showNew ? "text" : "password"}
        inputSize="lg"
        variant="pink"
        leftIcon={<IoMdLock className="h-4 sm:h-5 w-4 sm:w-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="text-primary hover:text-primary/80 transition-colors"
            tabIndex={-1}
            aria-label={showNew ? "Hide password" : "Show password"}
          >
            {showNew ? (
              <MdOutlineKeyOff className="h-5 w-5" />
            ) : (
              <MdKey className="h-5 w-5" />
            )}
          </button>
        }
        error={errors.newPassword?.message}
        placeholder={t("newPasswordPlaceholder")}
        {...register("newPassword")}
      />

{/* Confirm Password */}
     <FloatingLabelInput
        label={t("repeatPasswordLabel")}
        type={showConfirm ? "text" : "password"}
        inputSize="lg"
        variant="pink"
        leftIcon={<IoMdLock className="h-4 sm:h-5 w-4 sm:w-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="text-primary hover:text-primary/80 transition-colors"
            tabIndex={-1}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? (
              <MdOutlineKeyOff className="h-5 w-5" />
            ) : (
              <MdKey className="h-5 w-5" />
            )}
          </button>
        }
        error={errors.confirmPassword?.message}
        placeholder={t("repeatPasswordPlaceholder")}
        {...register("confirmPassword")}
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
          t("resetPassword")
        )}
      </Button>

      {/* Back to sign in */}
      <p className="text-center text-sm">
        <Link
          href={`/${locale}/login`}
          className="font-medium text-[#FF6DCA] hover:underline"
        >
          {t("backToSignIn")}
        </Link>
      </p>
    </form>
  );
}
