"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import React, { useCallback, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { SignInArgs } from "@/types/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "./schema";
import { Alert } from "../shared/alert";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomInput from "@shared/form/fields/CustomInput";
import { CustomButton } from "../shared/button/CustomButton";
import { LogIn } from "lucide-react";

export default function SigninWithPassword() {
  const [isLoading, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  const { control, handleSubmit } = useForm<SignInArgs>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: yupResolver(signInSchema),
  });

  const router = useRouter();

  const onSave = useCallback(
    async (data: SignInArgs) => {
      startTransition(async () => {
        setErrorMessage("");
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (res?.error) {
          setErrorMessage(res.error);
        }

        if (!res?.error) {
          router.push("/");
        }
      });
    },
    [router, setErrorMessage],
  );

  return (
    <form onSubmit={handleSubmit(onSave)}>
      {errorMessage && (
        <div className="mb-3">
          <Alert description={errorMessage} title="Error" variant="error" />
        </div>
      )}
      <div className="mb-2 flex flex-col gap-2">
        <CustomInput
          type="email"
          label="Email"
          className="mb-4 [&_input]:py-[15px]"
          placeholder="Enter your email"
          name="email"
          control={control}
          icon={<EmailIcon />}
          size="lg"
        />

        <CustomInput
          type="password"
          label="Password"
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Enter your password"
          name="password"
          control={control}
          icon={<PasswordIcon />}
          size="lg"
        />
      </div>
      {/* <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div> */}

      <div className="mb-4.5">
        <CustomButton
          {...{
            color: "blue",
            content: "Sign in",
            icon: <LogIn />,
            isLoading,
            type: "submit",
          }}
        />
      </div>
    </form>
  );
}
