import { Controller, FieldValues, Path } from "react-hook-form";
import { Feedback } from "../Feedback";
import { Editor } from "@tinymce/tinymce-react";
import { TextEditorProps } from "../types";

export const TextEditor = <T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  ...restProps
}: TextEditorProps<T>) => {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({
        field: { value, name, onBlur, onChange },
        fieldState: { invalid, error },
      }) => (
        <>
          <div>
            {label && (
              <label className="mx-1">
                {required ? (
                  <>
                    {label}
                    <span className="text-red-500">*</span>
                  </>
                ) : (
                  label
                )}
              </label>
            )}
            <Editor
              {...{
                apiKey: process.env.NEXT_PUBLIC_TINY_MCE_KEY,
                init: {
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | image | code | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                },
                ...restProps,
                onBlur,
                name,
                value,
                onEditorChange: onChange,
              }}
            />
          </div>
          {invalid && <Feedback msg={error?.message} />}
        </>
      )}
    />
  );
};
