"use client";

import { useForm } from "react-hook-form";
import { useCreateForm } from "./use-create-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { CustomButton } from "../shared/button/CustomButton";
import { ArrowLeft, FilePlus2, Files, Import, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductImages } from "./product-images-modal";
import { ProductFormInput, ProductFormValues } from "./types";
import { defaultValues } from "./utils";
import Details from "./details-section";
import { useInsertProductMutation } from "@/store/services/products";
import { toast } from "react-toastify";
import { SavingModal } from "./SavingModal";

interface Props {
  data?: string;
}

const ProductForm = ({ data }: Props) => {
  const [insert, { isLoading }] = useInsertProductMutation();

  const [showProductImages, setShowProductImages] = useState(false);
  const [savingModal, setSavingModal] = useState(false);

  const toggleShowProductImages = () => setShowProductImages((prev) => !prev);
  const toggleSavingModal = () => setSavingModal((prev) => !prev);

  const { control, formState, getValues, setValue, handleSubmit } =
    useForm<ProductFormInput>({
      defaultValues: data ? JSON.parse(data) : defaultValues,
      mode: "all",
      resolver: zodResolver(schema),
    });

  const { generalSection } = useCreateForm(control);

  const router = useRouter();

  const onConfirmSave = async () => {
    try {
      const { discount, price, stockLimit, ...values } = getValues();

      const bodyRequest: ProductFormValues = {
        ...values,
        discount: Number(discount ?? 0),
        price: Number(price),
        stockLimit: Number(stockLimit),
      };

      const res = await insert(bodyRequest).unwrap();

      toast.success(res.message);
      router.push("/products");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setSavingModal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(() => setSavingModal(true))}>
      <div className="flex items-center justify-between gap-2">
        <div>
          <CustomButton
            variant="text"
            content="Back to list"
            className="dark:text-white dark:hover:bg-dark-2"
            icon={<ArrowLeft />}
            onClick={() => router.push("/products")}
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-wrap items-center">
          <CustomButton
            variant="text"
            content="Save"
            icon={<Save />}
            type="submit"
            color="green"
          />
          <CustomButton
            variant="text"
            content="Import images"
            icon={<Import />}
            color="blue"
            onClick={toggleShowProductImages}
            disabled={isLoading}
          />
          <CustomButton
            variant="text"
            content="Apply variants"
            icon={<FilePlus2 />}
            color="deep-orange"
            disabled={isLoading}
          />
          <CustomButton
            variant="text"
            content="Create duplicate"
            icon={<Files />}
            color="green"
            disabled={isLoading}
          />
        </div>
      </div>
      <section className="border p-3">
        <h2>General Data</h2>
        {generalSection}
      </section>
      <section className="border p-3">
        <h2>Details sections</h2>
        <Details control={control as any} />
      </section>
      {showProductImages && (
        <ProductImages
          isOpen={showProductImages}
          control={control}
          setValue={setValue}
          toggle={toggleShowProductImages}
        />
      )}
      <SavingModal
        open={savingModal}
        isLoading={isLoading}
        handler={() => setSavingModal(false)}
        onSave={onConfirmSave}
      />
    </form>
  );
};

export default ProductForm;
