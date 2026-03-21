"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaPhoneAlt } from "react-icons/fa";
import { toast } from "sonner";

import { signupSchema, type SignupFormValues } from "@/lib/auth-schemas";
import { signupApi } from "@/services/auth-api";
import { useAuthStore } from "@/store/useAuthStore";
import { IoMdLock } from "react-icons/io";
import { MdOutlineKeyOff, MdKey } from "react-icons/md";
import { Button, FloatingLabelInput, PhoneField } from "@/components/ui";

export default function SignupPage() {
  const t = useTranslations("auth.signup");
  const locale = useLocale();
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", password: "", phone: "" },
  });

  
  const onSubmit = async (data: SignupFormValues) => {
    console.log("Form data submitted:", data);
    try {
      const { user, token } = await signupApi(data);
      login(user, token);
      toast.success(t("signupSuccess"));
      router.push(`/${locale}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("signupError"));
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

      {/* First Name */}
      <FloatingLabelInput
        label={t("firstNameLabel")}
        type="text"
        inputSize="lg"
        variant="pink"
        error={errors.firstName?.message}
        placeholder={t("firstNamePlaceholder")}
        {...register("firstName")}
      />

      {/* Family Name */}
      <FloatingLabelInput
        label={t("familyNameLabel")}
        type="text"
        inputSize="lg"
        variant="pink"
        error={errors.lastName?.message}
        placeholder={t("familyNamePlaceholder")}
        {...register("lastName")}
      />

      {/* Password */}
      <FloatingLabelInput
        label={t("passwordLabel")}
        type={showPassword ? "text" : "password"}
        inputSize="lg"
        variant="pink"
        leftIcon={<IoMdLock className="h-4 sm:h-5 w-4 sm:w-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-primary hover:text-primary/80 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <MdOutlineKeyOff className="h-5 w-5" />
            ) : (
              <MdKey className="h-5 w-5" />
            )}
          </button>
        }
        error={errors.password?.message}
        placeholder={t("passwordPlaceholder")}
        {...register("password")}
      />

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
          t("signUp")
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
