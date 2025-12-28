"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { useCreateForm } from "./use-create-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { CustomButton } from "../shared/button/CustomButton";
import { ArrowLeft, Import, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductImages } from "./product-images-modal";

interface Props {
  data?: string;
}

const ProductForm = ({ data }: Props) => {
  const [showProductImages, setShowProductImages] = useState(false);

  const toggle = () => setShowProductImages((prev) => !prev);

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: JSON.parse(data || "{}"),
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({ control, name: "" });

  const { detailsSection, generalSection } = useCreateForm(control);

  const router = useRouter();

  const onSave = async () => {};

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <div className="flex items-center justify-between gap-2">
        <div>
          <CustomButton
            variant="text"
            content="Back to list"
            icon={<ArrowLeft />}
            onClick={() => router.push("/products")}
          />
        </div>
        <div>
          <CustomButton
            variant="text"
            content="Save"
            icon={<Save />}
            type="submit"
          />
          <CustomButton
            variant="text"
            content="Import images"
            icon={<Import />}
            onClick={toggle}
          />
        </div>
      </div>
      <section className="border p-3">
        <h2>General Data</h2>
        {generalSection}
      </section>
      <section className="border p-3">
        <h2>Details section</h2>
        {detailsSection}
      </section>
      {showProductImages && (
        <ProductImages
          isOpen={showProductImages}
          control={control}
          setValue={setValue}
          toggle={toggle}
        />
      )}
    </form>
  );
};

export default ProductForm;
