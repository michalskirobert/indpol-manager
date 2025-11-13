import logo from "@public/images/logo.png";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative mb-5 h-8 max-w-[10.847rem]">
      <Image
        src={logo}
        className="dark:hidden"
        alt="NurByte"
        role="presentation"
        quality={100}
      />
      <Image
        src={logo}
        className="hidden dark:block"
        alt="NurByte"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
