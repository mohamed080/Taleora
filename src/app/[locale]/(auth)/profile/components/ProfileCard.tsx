"use client";

import { ReactNode } from "react";
import { Edit2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, SlideUp } from "@/components/ui";

type Translation = ReturnType<typeof useTranslations>;

type Props = {
  avatarNode: ReactNode;   // pass the memoized avatar JSX from parent
  fullName: string;
  t: Translation;
  onEdit: () => void;
  children?: ReactNode;    // slot for ProfileEditDialog
};

export function ProfileCard({ avatarNode, fullName, t, onEdit, children }: Props) {
  return (
    <SlideUp className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 md:min-h-102.5">
      {avatarNode}
      <h2 className="mb-5 text-center text-xl font-medium text-gray-800 sm:text-2xl">
        {fullName}
      </h2>
      <Button
        variant="gradient"
        type="button"
        size="lg"
        className="h-12.5 w-full"
        onClick={onEdit}
      >
        <Edit2 className="h-4 w-4" />
        {t("edit")}
      </Button>
      {children}
    </SlideUp>
  );
}