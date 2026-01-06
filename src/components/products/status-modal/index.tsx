import { CustomButton } from "@components/shared/button/CustomButton";
import { ProductProps, ProductStatus } from "@typings/products";
import { productStatuses } from "@utils/statuses";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import { ArrowLeft, Save } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { usePatchProductMutation } from "@/store/services/products";
import { toast } from "react-toastify";
import { ProductList } from "../types";

interface Props {
  product: ProductList;
  open: boolean;
  setSelectedData: Dispatch<SetStateAction<ProductList[]>>;
  refetch: () => Promise<void>;
  handler: () => void;
}

export const StatusModal = ({
  open,
  product,
  setSelectedData,
  refetch,
  handler,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<ProductStatus>(
    product.status || ProductStatus.Draft,
  );

  const [patch, { isLoading }] = usePatchProductMutation();

  const onSave = async () => {
    await patch({ id: product.id, body: { status: selectedOption } });
    setSelectedData([{ ...product, status: selectedOption }]);
    await refetch();

    toast.success("Status has been updated");

    handler();
  };

  return (
    <Dialog
      {...{
        open,
        handler: () => {
          if (isLoading) return;

          handler();
        },
      }}
    >
      <DialogHeader>{product.name}'s status</DialogHeader>
      <DialogBody>
        <Select
          name="status"
          label="Status"
          value={`${selectedOption}`}
          disabled={isLoading}
          onChange={(option) =>
            setSelectedOption(+`${option}` as ProductStatus)
          }
        >
          {productStatuses.map(({ label, value }) => (
            <Option key={label} value={`${value}`}>
              {label}
            </Option>
          ))}
        </Select>
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <CustomButton
          content="Back"
          icon={<ArrowLeft />}
          onClick={handler}
          disabled={isLoading}
        />
        <CustomButton
          color="green"
          content="Save"
          icon={<Save />}
          isLoading={isLoading}
          onClick={onSave}
        />
      </DialogFooter>
    </Dialog>
  );
};
