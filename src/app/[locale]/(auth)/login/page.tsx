"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdKey, MdOutlineKeyOff } from "react-icons/md";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaUser } from "react-icons/fa";
import { toast } from "sonner";

import { Button, Checkbox, FloatingLabelInput, Label } from "@/components/ui";
import { loginSchema, type LoginFormValues } from "@/lib/auth-schemas";
import { loginApi } from "@/services/auth-api";
import { useAuthStore } from "@/store/useAuthStore";
import { IoMdLock } from "react-icons/io";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const locale = useLocale();
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { user, token } = await loginApi({
        email: data.email,
        password: data.password,
      });
      login(user, token);
      toast.success(t("loginSuccess"));
      router.push(`/${locale}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("loginError"));
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

      {/* Username / Email */}
      <FloatingLabelInput
        label={t("usernameLabel")}
        type="email"
        inputSize="lg"
        variant="pink"
        leftIcon={<FaUser className="h-4 sm:h-5 w-4 sm:w-5" />}
        error={errors.email?.message}
        placeholder={t("usernamePlaceholder")}
        {...register("email")}
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

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between text-center">
        <div className="flex items-center gap-1 sm:gap-2">
          <Checkbox
            id="rememberMe"
            {...register("rememberMe")}
            className="border-[#FF6DCA] data-[state=checked]:bg-[#FF6DCA] data-[state=checked]:border-[#FF6DCA]"
          />
          <Label
            htmlFor="rememberMe"
            className="cursor-pointer text-[13px] sm:text-sm text-[#616161]"
          >
            {t("rememberMe")}
          </Label>
        </div>
        <Link
          href={`/${locale}/forgot-password`}
          className="text-[13px] sm:text-sm font-medium text-[#FF6DCA] hover:underline"
        >
          {t("forgotPassword")}
        </Link>
      </div>

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
          t("signIn")
        )}
      </Button>

      {/* Create Account */}
      <p className="text-center text-sm sm:text-base text-[#6F6F6F]">
        {t("noAccount")}{" "}
        <Link
          href={`/${locale}/signup`}
          className="font-semibold text-[#FF6DCA] hover:underline"
        >
          {t("createOne")}
        </Link>
      </p>

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
