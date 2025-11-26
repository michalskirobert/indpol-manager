import { useAppDispatch } from "@/store";
import { setUser } from "@/store/slices/auth";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export const useSignOut = () => {
  const dispatch = useAppDispatch();

  const signOutUser = async () => {
    await signOut();
    dispatch(setUser(null));
  };

  return signOutUser;
};
