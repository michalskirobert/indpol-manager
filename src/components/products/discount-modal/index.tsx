import { CustomButton } from "@components/shared/button/CustomButton";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { ArrowLeft, Percent, Save } from "lucide-react";
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

export const DiscountModal = ({
  open,
  product,
  setSelectedData,
  refetch,
  handler,
}: Props) => {
  const [discount, setDiscount] = useState(product.discount || 0);

  const [patch, { isLoading }] = usePatchProductMutation();

  const onSave = async () => {
    await patch({ id: product.id, body: { discount } });
    setSelectedData([{ ...product, discount }]);
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
      <DialogHeader>{product.name}'s discount percentage</DialogHeader>
      <DialogBody>
        <Input
          crossOrigin={"stock"}
          name="stock"
          autoComplete="stocksLimit"
          type="number"
          value={discount}
          label="Discount"
          icon={<Percent />}
          onChange={(e) => setDiscount(e.target.valueAsNumber)}
        />
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
