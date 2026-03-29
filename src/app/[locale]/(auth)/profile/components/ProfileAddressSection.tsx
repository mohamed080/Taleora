import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Edit2, Trash2, MoreHorizontal } from "lucide-react";
import { FaStore } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  itemVariants,
  SlideUp,
} from "@/components/ui";
import { ShippingForm } from "@/app/[locale]/(main)/checkout/shipping/components";
import { useTranslations } from "next-intl";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { type ShippingFormValues } from "@/lib/shipping-schemas";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Translation = ReturnType<typeof useTranslations>;
type Address = ShippingFormValues & { id: string };

type ProfileAddressSectionProps = {
  addresses: Address[];
  dir: "ltr" | "rtl";
  isAddressEditing: boolean;
  isAddressDialogOpen: boolean;
  register: UseFormRegister<ShippingFormValues>;
  control: Control<ShippingFormValues>;
  errors: FieldErrors<ShippingFormValues>;
  onSaveAddress: () => void;
  onAddAddress: () => void;
  onEditAddress: (address: Address) => void;
  onDeleteAddress: (address: Address) => void;
  closeAddressDialog: () => void;
  t: Translation;
};

export function ProfileAddressSection({
  addresses,
  dir,
  isAddressEditing,
  isAddressDialogOpen,
  register,
  control,
  errors,
  onSaveAddress,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  closeAddressDialog,
  t,
}: ProfileAddressSectionProps) {
  return (
    <SlideUp
      y={28}
      delay={0.1}
      className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 md:min-h-102.5"
    >
      <motion.div
        variants={itemVariants}
        className="mb-4 flex items-center gap-3"
      >
        <Image
          src="/images/parachute.svg"
          width={30}
          height={30}
          alt="parachute"
        />
        <h4 className="text-xl font-bold text-black sm:text-2xl">
          {t("shippingInfo")}
        </h4>
      </motion.div>

      <div className="mb-4 flex flex-col gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="relative flex items-start gap-4 rounded-xl border border-gray-200 p-5"
          >
            <div className="mt-0.5 shrink-0 text-gray-400">
              <FaStore className="h-5 w-5" />
            </div>

            <div className="flex flex-1 flex-col -space-y-1 text-sm text-gray-600 sm:text-base">
              <p className="font-semibold text-gray-700">{address.fullName}</p>
              <p className="text-gray-500">
                {address.city}, {address.address}
              </p>
              <p className="text-gray-600">{address.phone}</p>
            </div>

            <div className="absolute top-4 inset-e-4">
              <DropdownMenu dir={dir}>
                <DropdownMenuTrigger className="cursor-pointer p-1 text-gray-400 outline-none hover:text-gray-600">
                  <MoreHorizontal className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-32 rounded-xl p-2 shadow-lg"
                >
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      onEditAddress(address);
                    }}
                    className="gap-2 rounded-lg hover:text-gray-900"
                  >
                    <Edit2 className="h-4 w-4" />
                    {t("edit")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      onDeleteAddress(address);
                    }}
                    className="gap-2 rounded-lg text-red-500 hover:text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t("delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={isAddressDialogOpen}
        onOpenChange={(open) => {
          if (!open) closeAddressDialog();
        }}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            onClick={onAddAddress}
            className="flex h-24 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary bg-[#FDF9FF] text-primary transition-colors hover:bg-primary/20"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">
              {addresses.length === 0
                ? t("addAddress")
                : t("addAnotherAddress")}
            </span>
          </button>
        </DialogTrigger>

        <DialogContent
          dir={dir}
          className="overflow-hidden rounded-3xl border-0 bg-white p-0 sm:max-w-2xl [&>button]:top-6 [&>button]:z-50 [&>button]:rounded-full [&>button]:text-primary [&>button]:inset-e-6"
        >
          <VisuallyHidden>
            <DialogTitle>
              {isAddressEditing ? t("updateAddress") : t("addAddress")}
            </DialogTitle>
          </VisuallyHidden>
          <div className="max-h-[85vh] w-full overflow-y-auto">
            <ShippingForm register={register} control={control} errors={errors}>
              <Button
                onClick={onSaveAddress}
                type="button"
                variant="gradient"
                className="h-12.5 w-full"
              >
                {isAddressEditing ? t("updateAddress") : t("addAddress")}
              </Button>
            </ShippingForm>
          </div>
        </DialogContent>
      </Dialog>
    </SlideUp>
  );
}
