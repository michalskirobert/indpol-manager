import * as yup from "yup";

export const schema = yup
  .object({
    fullname: yup.string().required().label("Full name"),
    email: yup.string().email().required().label("E-mail"),
    oldPassword: yup.string().default(""),
    newPassword: yup.string().default(""),
  })
  .test(
    "passwords-required",
    "Both old and new password are required when changing password",
    function (values) {
      const { oldPassword, newPassword } = values as {
        oldPassword: string;
        newPassword: string;
      };
      if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
        return this.createError({
          path: oldPassword ? "newPassword" : "oldPassword",
          message:
            "Both old and new password are required when changing password",
        });
      }
      return true;
    },
  );
