import { CustomButton } from "@components/shared/button/CustomButton";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
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

export const StockModal = ({
  open,
  product,
  setSelectedData,
  refetch,
  handler,
}: Props) => {
  const [stockLimit, setStockLimit] = useState(product.stockLimit);

  const [patch, { isLoading }] = usePatchProductMutation();

  const onSave = async () => {
    await patch({ id: product.id, body: { stockLimit } });
    setSelectedData([{ ...product, stockLimit }]);
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
      <DialogHeader>{product.name}'s stock limit</DialogHeader>
      <DialogBody>
        <Input
          crossOrigin={"stock"}
          name="stock"
          label="Stock limit"
          autoComplete="stocksLimit"
          type="number"
          value={stockLimit}
          onChange={(e) => setStockLimit(e.target.valueAsNumber)}
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
