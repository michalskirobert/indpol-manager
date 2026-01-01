import React, { useState } from "react";

import { Control } from "react-hook-form";
import { LanguageCode, ProductProps } from "@/types/products";
import {
  Card,
  CardBody,
  Tab,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { TextEditor } from "@/components/shared/form/fields/TextEditor";
import CustomInput from "@/components/shared/form/fields/CustomInput";
import { CustomButton } from "@/components/shared/button/CustomButton";
import { Trash } from "lucide-react";
import { ProductFormInput } from "../../types";

export const DetailItem = ({
  index,
  control,
  remove,
}: {
  index: number;
  control: Control<ProductFormInput>;
  remove: (index: number) => void;
}) => {
  const [selected, setSelected] = useState<LanguageCode>("pl");

  const data: { label: string; value: LanguageCode }[] = [
    {
      label: "Polish",
      value: "pl",
    },
    {
      label: "English",
      value: "en",
    },
    {
      label: "Bahasa",
      value: "id",
    },
  ];

  return (
    <Tabs>
      <TabsHeader className="mt-2">
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            defaultValue={"pl"}
            value={value}
            onClick={() => setSelected(value)}
          >
            <div className="flex items-center gap-2">{label}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <CustomInput
                control={control}
                label="Title"
                name={`details.${index}.title.${selected}`}
              />
              <CustomButton
                icon={<Trash />}
                className="mb-2"
                variant="text"
                color="red"
                onClick={() => remove(index)}
              />
            </div>
            <TextEditor
              control={control}
              label="Content"
              name={`details.${index}.detail.${selected}`}
            />
          </CardBody>
        </Card>
      </TabsBody>
    </Tabs>
  );
};
