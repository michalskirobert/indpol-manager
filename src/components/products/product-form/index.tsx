"use client";

import { useForm } from "react-hook-form";
import { useCreateForm } from "./use-create-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { CustomButton } from "@shared/button/CustomButton";
import { ArrowLeft, FilePlus2, Files, Import, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductImages } from "./product-images-modal";
import { ProductFormInput, ProductFormValues } from "./types";
import { defaultValues } from "./utils";
import Details from "./details-section";
import {
  useDuplicateProductMutation,
  useInsertProductMutation,
  useUpdateProductMutation,
} from "@/store/services/products";
import { toast } from "react-toastify";
import { SavingModal } from "./SavingModal";
import { ProductProps, ProductStatus } from "@/types/products";
import { LoadingBlocker } from "@shared/LoadingBlocker";
import { ApplyVariantsModal } from "./apply-variants";

interface Props {
  data?: string;
}

const ProductForm = ({ data }: Props) => {
  const processedData: ProductProps = data ? JSON.parse(data) : defaultValues;

  const [insert, { isLoading }] = useInsertProductMutation();
  const [update, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [duplicate, { isLoading: isDuplicating }] =
    useDuplicateProductMutation();

  const [showProductImages, setShowProductImages] = useState(false);
  const [savingModal, setSavingModal] = useState(false);
  const [variantsModal, setVariantsModal] = useState(false);

  const toggleShowProductImages = () => setShowProductImages((prev) => !prev);
  const toggleVariantsModal = () => setVariantsModal((prev) => !prev);

  const { control, formState, reset, getValues, setValue, handleSubmit } =
    useForm<ProductFormInput>({
      defaultValues: processedData,
      mode: "all",
      resolver: zodResolver(schema),
    });

  const { generalSection } = useCreateForm(control);

  const router = useRouter();

  const onConfirmSave = async (status: ProductStatus) => {
    try {
      const { discount, price, stockLimit, ...values } = getValues();

      const bodyRequest: ProductFormValues = {
        ...values,
        discount: Number(discount ?? 0),
        price: Number(price),
        stockLimit: Number(stockLimit),
        status,
      };

      const api = processedData._id?.toString()
        ? update({ id: processedData._id, body: bodyRequest })
        : insert(bodyRequest);

      const res = await api.unwrap();

      reset(bodyRequest);

      toast.success(res.message);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setSavingModal(false);
    }
  };

  const duplicateProduct = async () => {
    if (!processedData?._id) return;

    const res = await duplicate(processedData._id).unwrap();

    router.push(`/products/${res.id}`);

    toast.success("Product has been duplicated");
  };

  return (
    <LoadingBlocker isLoading={isDuplicating || isUpdating}>
      <form onSubmit={handleSubmit(() => setSavingModal(true))}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CustomButton
              variant="text"
              content="Back to product list"
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
              disabled={!formState.isDirty}
              isLoading={isUpdating}
              tooltip={
                !formState.isDirty ? "No changes to save" : "Save changes"
              }
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
              onClick={toggleVariantsModal}
              disabled={isLoading || !processedData?._id}
              tooltip={
                !processedData?._id
                  ? "To apply variants save product before!"
                  : ""
              }
            />
            <CustomButton
              variant="text"
              content="Create duplicate"
              icon={<Files />}
              color="green"
              onClick={duplicateProduct}
              isLoading={isDuplicating}
              disabled={isLoading || !processedData?._id}
              tooltip={
                !processedData?._id
                  ? "Cannot duplicate a product that does not exist"
                  : "Create a copy of this product"
              }
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
        {processedData?._id && (
          <ApplyVariantsModal
            control={control}
            id={processedData._id}
            open={variantsModal}
            handler={toggleVariantsModal}
            setValue={setValue}
          />
        )}
      </form>
    </LoadingBlocker>
  );
};

export default ProductForm;
