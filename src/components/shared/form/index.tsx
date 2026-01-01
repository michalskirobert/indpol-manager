import { FieldValues } from "react-hook-form";
import { DatePicker } from "./fields/DatePicker";
import { FieldProps } from "./types";
import { InputRadio } from "./fields/InputRadio";
import { InputSwitch } from "./fields/Switch";
import { MultipleCheckbox } from "./fields/MultipleCheckbox";
import InputSelect from "./fields/InputSelect";
import { SingleCheckbox } from "./fields/SingleCheckbox";
import { InputTextarea } from "./fields/Textarea";
import CustomInput from "./fields/CustomInput";
import { Attachment } from "./fields/attachment";
import { TextEditor } from "./fields/TextEditor";

interface Props<T extends FieldValues> {
  fields: FieldProps<T>[][];
}

export const CustomForm = <T extends FieldValues>({ fields }: Props<T>) => {
  return (
    <div className="flex w-full flex-col">
      {fields.map((fieldGroup, i) => {
        return (
          <div key={`field-group-${i}`} className={"row my-1 flex"}>
            {fieldGroup.map((field, j) => {
              if (field.isHidden) return null;

              const { type, classnames } = field;

              const colClasses =
                classnames?.colClassName || `flex col flex-1 mx-1`;

              let FieldComponent: JSX.Element | null = null;

              switch (type) {
                case "date":
                  FieldComponent = <DatePicker {...field.dateProps!} />;
                  break;
                case "textarea":
                  FieldComponent = <InputTextarea {...field.textareaProps!} />;
                  break;
                case "input_switch":
                  FieldComponent = <InputSwitch {...field.switchProps!} />;
                  break;
                case "multiple_checkbox":
                  FieldComponent = (
                    <MultipleCheckbox {...field.multipleCheckboxProps!} />
                  );
                  break;
                case "single_checkbox":
                  FieldComponent = (
                    <SingleCheckbox {...field.singleCheckboxProps!} />
                  );
                  break;
                case "input_radio":
                  FieldComponent = <InputRadio {...field.radioProps!} />;
                  break;
                case "select":
                  FieldComponent = <InputSelect {...field.inputSelectProps!} />;
                  break;
                case "attachment":
                  FieldComponent = (
                    <Attachment {...field.inputAttachmentProps!} />
                  );
                  break;
                case "text_editor":
                  FieldComponent = <TextEditor {...field.textEditorProps!} />;
                default:
                  FieldComponent = <CustomInput {...field.inputProps!} />;
              }

              return (
                <div key={`field-${i}-${j}`} className={colClasses}>
                  {FieldComponent}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
