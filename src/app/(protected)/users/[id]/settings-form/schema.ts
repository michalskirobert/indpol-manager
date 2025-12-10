import z from "zod";

export const schema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid e-mail address"),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    const { oldPassword, newPassword } = values;

    const oldFilled = oldPassword && oldPassword.length > 0;
    const newFilled = newPassword && newPassword.length > 0;

    if ((oldFilled && !newFilled) || (!oldFilled && newFilled)) {
      if (oldFilled) {
        ctx.addIssue({
          path: ["newPassword"],
          code: z.ZodIssueCode.custom,
          message:
            "Both old and new password are required when changing password",
        });
      } else {
        ctx.addIssue({
          path: ["oldPassword"],
          code: z.ZodIssueCode.custom,
          message:
            "Both old and new password are required when changing password",
        });
      }
    }
  });
