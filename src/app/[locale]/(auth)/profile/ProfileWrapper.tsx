"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslations } from "next-intl";
import {  useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Edit2 } from "lucide-react";
import { toast } from "sonner";
import {
  getShippingSchema,
  type ShippingFormValues,
} from "@/lib/shipping-schemas";
import {
  Button,
  SlideUp,
  StaggerContainer,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import { ProfileAddressSection, ProfileEditDialog } from "./components";

const generateAddressId = () => Math.random().toString(36).slice(2, 9);

type Address = ShippingFormValues & { id: string };

type ProfileWrapperProps = { locale: string };

type ProfileFormState = {
  fullName: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  avatar: string;
};

const emptyAddress: ShippingFormValues = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

const splitFullName = (fullName: string) => {
  const normalized = fullName.trim().replace(/\s+/g, " ");

  if (!normalized) {
    return { firstName: "", lastName: "" };
  }

  const [firstName, ...rest] = normalized.split(" ");

  return {
    firstName,
    lastName: rest.join(" "),
  };
};


function ProfileWrapper({ locale }: ProfileWrapperProps) {
  const { user, updateUser } = useAuthStore();
  const t = useTranslations("profile");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const shippingSchema = getShippingSchema(t, "validation");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: emptyAddress,
  });

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
  const [profileErrors, setProfileErrors] = useState<
    Partial<Record<"fullName" | "newPassword" | "confirmNewPassword", string>>
  >({});
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    fullName: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    avatar: "",
  });

  const dir = locale === "ar" ? "rtl" : "ltr";
  const isAddressEditing = Boolean(addressToEdit);
  const fallbackName = "Mohamed Ayman";
  const fullName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : fallbackName;
  const email = user?.email ?? "mohayman080@gmail.com";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "MA";
  const avatarSrc = user?.avatar ?? "";

  const profileCardAvatar = useMemo(() => {
    if (avatarSrc) {
      return (
        <div className="relative mb-3 h-35 w-35 overflow-hidden rounded-full border-4 border-white shadow-[0_0_0_2px_rgba(206,206,220,0.9)]">
          <Image
            src={avatarSrc}
            alt={t("profileImageAlt", { name: fullName })}
            fill
            className="object-cover"
            sizes="140px"
          />
        </div>
      );
    }

    return (
      <div className="mb-3 flex h-35 w-35 items-center justify-center rounded-full bg-primary text-5xl font-semibold text-white shadow-[0_0_0_2px_rgba(206,206,220,0.9)]">
        {initials}
      </div>
    );
  }, [avatarSrc, fullName, initials, t]);

  const openProfileDialog = () => {
    setProfileForm({
      fullName,
      email,
      newPassword: "",
      confirmNewPassword: "",
      avatar: avatarSrc,
    });
    setProfileErrors({});
    setIsProfileDialogOpen(true);
  };

  const closeProfileDialog = () => {
    setIsProfileDialogOpen(false);
    setProfileErrors({});
  };

  const updateProfileField = (
    field: keyof ProfileFormState,
    value: string,
  ) => {
    setProfileForm((current) => ({ ...current, [field]: value }));
    if (field in profileErrors) {
      setProfileErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProfileForm((current) => ({ ...current, avatar: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    const nextErrors: typeof profileErrors = {};
    const trimmedName = profileForm.fullName.trim();

    if (!trimmedName) {
      nextErrors.fullName = t("nameRequired");
    }

    if (profileForm.newPassword && profileForm.newPassword.length < 8) {
      nextErrors.newPassword = t("passwordMinLength");
    }

    if (profileForm.newPassword !== profileForm.confirmNewPassword) {
      nextErrors.confirmNewPassword = t("passwordsDoNotMatch");
    }

    if (Object.keys(nextErrors).length > 0) {
      setProfileErrors(nextErrors);
      return;
    }

    const { firstName, lastName } = splitFullName(trimmedName);

    updateUser({
      firstName,
      lastName,
      email: profileForm.email,
      avatar: profileForm.avatar || undefined,
    });

    toast.success(t("profileUpdated"));
    closeProfileDialog();
  };

  const closeAddressDialog = () => {
    setIsAddressDialogOpen(false);
    setAddressToEdit(null);
    reset(emptyAddress);
  };

  const onSaveAddress = handleSubmit((data) => {
    if (addressToEdit) {
      setAddresses((current) =>
        current.map((address) =>
          address.id === addressToEdit.id
            ? { ...addressToEdit, ...data }
            : address,
        ),
      );
    } else {
      setAddresses((current) => [
        ...current,
        {
          ...data,
          id: generateAddressId(),
        },
      ]);
    }

    closeAddressDialog();
  });

  const handleAddAddress = () => {
    setAddressToEdit(null);
    reset(emptyAddress);
    setIsAddressDialogOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setAddressToEdit(address);
    reset(address);
    setIsAddressDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!addressToDelete) return;

    setAddresses((current) =>
      current.filter((address) => address.id !== addressToDelete.id),
    );
    setAddressToDelete(null);
  };

  return (
    <>
      <StaggerContainer
        className="grid gap-5 items-start md:grid-cols-[45%_55%]"
        staggerChildren={0.1}
        delayChildren={0.05}
      >
        <SlideUp className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 md:min-h-102.5">
          {profileCardAvatar}

          <h2 className="mb-5 text-center text-xl font-medium text-gray-800 sm:text-2xl">
            {fullName}
          </h2>

          <Button
            variant="gradient"
            type="button"
            size="lg"
            className="h-12.5 w-full"
            onClick={openProfileDialog}
          >
            <Edit2 className="h-4 w-4" />
            {t("edit")}
          </Button>

          <ProfileEditDialog
            open={isProfileDialogOpen}
            dir={dir}
            profileForm={profileForm}
            profileErrors={profileErrors}
            initials={initials}
            fullName={fullName}
            t={t}
            fileInputRef={fileInputRef}
            onOpenChange={(open) => {
              if (!open) closeProfileDialog();
              else setIsProfileDialogOpen(true);
            }}
            onImageChange={handleProfileImageChange}
            updateProfileField={updateProfileField}
            onCancel={closeProfileDialog}
            onSave={handleSaveProfile}
          />
        </SlideUp>

        <ProfileAddressSection
          addresses={addresses}
          dir={dir}
          isAddressEditing={isAddressEditing}
          isAddressDialogOpen={isAddressDialogOpen}
          register={register}
          control={control}
          errors={errors}
          onSaveAddress={onSaveAddress}
          onAddAddress={handleAddAddress}
          onEditAddress={handleEditAddress}
          onDeleteAddress={(address) => setAddressToDelete(address)}
          closeAddressDialog={closeAddressDialog}
          t={t}
        />
      </StaggerContainer>

      <AnimatePresence>
        {addressToDelete && (
          <AlertDialog
            open={Boolean(addressToDelete)}
            onOpenChange={(open) => {
              if (!open) setAddressToDelete(null);
            }}
          >
            <AlertDialogContent asChild>
              <motion.div
                dir={dir}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("confirmDeleteTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("confirmDeleteBody", {
                      name: addressToDelete.fullName,
                    })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setAddressToDelete(null)}>
                    {t("cancel")}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleConfirmDelete}
                    variant="destructive"
                  >
                    {t("delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </motion.div>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProfileWrapper;
