import Image from "next/image";

import logo from "@public/images/logo.png";
import { Spinner } from "@material-tailwind/react";

export const Loading = () => {
  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <Image {...{ src: logo, alt: "NurByte" }} />
      <Spinner className="h-25 w-25 text-yellow-500" />
    </section>
  );
};
