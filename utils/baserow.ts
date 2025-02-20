import { BaserowQueryFilter } from "@/types/baserow";

/**
 * Map a Baserow table ID with a human-readable name and return its API url.
 */
export function getBaserowTableUrl(
    tableName:
      | "courses"
      | "course_tags"
      | "profiles"
      | "registrations",
    { rowId, filter, filters, orderBy, size, batch }: BaserowQueryFilter = {}
  ) {
    const tableId = {
      courses: 727,
      course_tags: 730,
      profiles: 729,
      registrations: 728,
    }[tableName];
    const rowIdSlug = rowId ? `${rowId}/` : "";
    const batchSlug = batch ? `batch/` : "";
    const filterQueryParam = filter ? `&${filter}` : ""; // Ignored when filters is provided
    const filtersQueryParams = filters
      ? `&filters=${JSON.stringify(filters)}`
      : "";
    const orderByQueryParam = orderBy ? `&${orderBy}` : "";
    const sizeQueryParam = size ? `&${size}` : "";
    return `/database/rows/table/${tableId}/${rowIdSlug}${batchSlug}?user_field_names=true${filterQueryParam}${filtersQueryParams}${orderByQueryParam}${sizeQueryParam}`;
  }
