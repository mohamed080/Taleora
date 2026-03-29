"use client";

import { ChangeEvent, RefObject } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FloatingLabelInput,
} from "@/components/ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


type Translation = ReturnType<typeof useTranslations>;

export type ProfileFormState = {
  fullName: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  avatar: string;
};

type ProfileEditDialogProps = {
  open: boolean;
  dir: "ltr" | "rtl";
  profileForm: ProfileFormState;
  profileErrors: Partial<
    Record<"fullName" | "newPassword" | "confirmNewPassword", string>
  >;
  initials: string;
  fullName: string;
  t: Translation;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onOpenChange: (open: boolean) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  updateProfileField: (field: keyof ProfileFormState, value: string) => void;
  onCancel: () => void;
  onSave: () => void;
};

export function ProfileEditDialog({
  open,
  dir,
  profileForm,
  profileErrors,
  initials,
  fullName,
  t,
  fileInputRef,
  onOpenChange,
  onImageChange,
  updateProfileField,
  onCancel,
  onSave,
}: ProfileEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={dir}
        className="overflow-hidden rounded-3xl border border-[#F0E7FF] bg-[#FBF8FF] p-0 shadow-[0_20px_80px_rgba(149,91,255,0.12)] sm:max-w-xl [&>button]:top-5 [&>button]:z-50 [&>button]:rounded-full [&>button]:text-primary [&>button]:inset-e-5"
      >
        <VisuallyHidden>
    <DialogTitle>{t("editProfile")}</DialogTitle>
  </VisuallyHidden>
        <div className="space-y-5 p-6 sm:p-7">
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-primary/90 text-white shadow-[0_0_0_2px_rgba(206,206,220,0.9)] transition-transform hover:scale-[1.02]"
            >
              {profileForm.avatar ? (
                <Image
                  src={profileForm.avatar}
                  alt={t("profileImageAlt", {
                    name: profileForm.fullName || fullName,
                  })}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <span className="text-4xl font-semibold">{initials}</span>
              )}

              <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-black/45 px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="h-3.5 w-3.5" />
                {t("changePhoto")}
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </div>

          <div className="space-y-4">
            <FloatingLabelInput
              label={t("nameLabel")}
              type="text"
              inputSize="lg"
              variant="pink"
              value={profileForm.fullName}
              onChange={(event) =>
                updateProfileField("fullName", event.target.value)
              }
              error={profileErrors.fullName}
              placeholder={t("namePlaceholder")}
            />

            <FloatingLabelInput
              label={t("emailLabel")}
              type="email"
              inputSize="lg"
              variant="pink"
              value={profileForm.email}
              readOnly
              className="cursor-default text-[#2C2C2C]"
              placeholder={t("emailPlaceholder")}
            />

            <FloatingLabelInput
              label={t("newPasswordLabel")}
              type="password"
              inputSize="lg"
              variant="pink"
              value={profileForm.newPassword}
              onChange={(event) =>
                updateProfileField("newPassword", event.target.value)
              }
              error={profileErrors.newPassword}
              placeholder={t("newPasswordPlaceholder")}
            />

            <FloatingLabelInput
              label={t("confirmNewPasswordLabel")}
              type="password"
              inputSize="lg"
              variant="pink"
              value={profileForm.confirmNewPassword}
              onChange={(event) =>
                updateProfileField("confirmNewPassword", event.target.value)
              }
              error={profileErrors.confirmNewPassword}
              placeholder={t("confirmNewPasswordPlaceholder")}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              className="h-12 rounded-xl bg-[#EDEBF1] text-[#5B4B88] hover:bg-[#E3E0EA]"
              onClick={onCancel}
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              variant="gradient"
              className="h-12 rounded-xl"
              onClick={onSave}
            >
              {t("save")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
