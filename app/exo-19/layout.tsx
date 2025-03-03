import Link from "next/link";

export default function Exo19Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      {children}

      <Link
        href="/"
        className="mt-12 inline-block w-fit rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
