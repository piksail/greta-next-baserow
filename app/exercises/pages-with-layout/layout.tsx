export default function Exo1Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="bg-accent p-8">{children}</section>;
}
