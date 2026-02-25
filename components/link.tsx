"use client";

import NextLink from "next/link";
import { linkVariants } from "@heroui/styles";
import { AnchorHTMLAttributes } from "react";

interface Props {
  href: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  children: React.ReactNode;
}

export default function Link({ href, children, ...props }: Props) {
  const slots = linkVariants();

  return (
    <NextLink href={href} className={`${slots.base()}`} {...props}>
      {children}
    </NextLink>
  );
}
