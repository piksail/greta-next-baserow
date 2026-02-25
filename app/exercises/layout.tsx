"use client";

import NextLink from "next/link";
import { linkVariants } from "@heroui/styles";
import { usePathname } from "next/navigation";

export default function ExerciseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const slots = linkVariants();

  return (
    <section className="flex min-h-screen flex-col items-center p-8">
      <header className="py-8 text-center">
        <h1 className="uppercase" data-testid="mainHeading">
          Exo : {pathname.replaceAll("-", " ").split("/").slice(-1)}
        </h1>
      </header>
      <main className={`mx-auto max-w-7xl`}>{children}</main>
      <footer className="py-8 text-center">
        <NextLink
          href="/"
          className={`${slots.base()}`}
          data-testid="backToHome"
        >
          Aller à l&apos;accueil
        </NextLink>
      </footer>
    </section>
  );
}
