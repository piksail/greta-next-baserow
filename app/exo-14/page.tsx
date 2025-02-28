import Link from "next/link";

// Baserow uses the same property name for root and sub objects, hence the double "Filter"
interface BaserowFiltersFilter {
  type: string;
  field: string;
  value: string | number; // The id of the row or the primary key value
}

interface BaserowFilters {
  filter_type: "AND" | "OR";
  filters: BaserowFiltersFilter[];
  groups: BaserowFilters[];
}

interface BaserowQueryFilter {
  rowId?: number;
  filter?: string;
  filters?: BaserowFilters;
  orderBy?: string;
  size?: string;
  batch?: boolean;
}

// If rowId is provided, Baserow returns a single result
type BaserowQueryResult<Type, IsSingle extends boolean> = IsSingle extends true
  ? Type
  : {
      count: number;
      next: string; // Url
      previous: string; // Url
      results: Type[];
    };

interface BaserowTable {
  id: number;
  order: string;
}

interface BaserowForeignKeyRelation {
  id: number;
  value: string;
}

interface BaserowSelectOption<Type> {
  id: number;
  value: Type;
  color: string; // Unused
}

export interface BaserowCourse extends BaserowTable {
  visible: boolean;
  name: string;
  start_date: string;
  end_date: string;
  seats: number;
  tags: BaserowForeignKeyRelation[];
  body: string | null;
  category: BaserowSelectOption<string>;
}

export default function Exo14() {
  return (
    <main className="mx-auto max-w-7xl p-12 text-center">
      <h1 className="text-7xl font-bold">Exercice 14</h1>
      <Link
        href="/"
        className="mt-12 inline-block rounded bg-indigo-500 px-4 py-2 text-2xl font-bold text-white"
      >
        Aller à l&apos;accueil
      </Link>
    </main>
  );
}
