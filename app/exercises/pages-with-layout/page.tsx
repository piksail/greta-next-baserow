import Link from "@/components/link";

export default function ExercisePagesWithLayout() {
  return (
    <div className="flex justify-center gap-2">
      <Link href="/exercises/pages-with-layout/sous-page-1/">
        Aller à la sous-page 1
      </Link>
      <Link href="/exercises/pages-with-layout/sous-page-2/">
        Aller à la sous-page 2
      </Link>
    </div>
  );
}
