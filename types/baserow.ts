// Baserow does not provide its typing so we must reproduce
export interface BaserowHttpError {
  response: {
    data: {
      error:
        | "ERROR_INVALID_ACCESS_TOKEN"
        | "ERROR_INVALID_CREDENTIALS"
        | "ERROR_PROFILE_VALIDATION" // Custom error code for non-validated profiles
        | "ERROR_REQUEST_BODY_VALIDATION";
    };
  };
}

// Reproduce BaserowHttpError for n8n custom error throwers
// All error codes are custom
export interface n8nHttpError {
  response: {
    data: {
      error:
        | "ERROR_LOGIN_REQUIRED"
        | "ERROR_PROFILE_ALREADY_REGISTERED_TO_COURSE";
    };
  };
}

export type BaserowPermissions = "ADMIN" | "MEMBER"; // Baserow free-tier roles

export interface BaserowUserDashboard {
  workspace_invitations: BaserowWorkspaceInvitation[];
}

export interface BaserowWorkspaceInvitation {
  id: number;
  invited_by: string;
  email: string;
  workspace: number;
  permissions: BaserowPermissions;
  created_on: string; // Datetime
  message: string;
  email_exists: boolean;
}

export interface BaserowWorkspaceUser {
  id: number;
  name: string;
  email: string;
  workspace: number;
  permissions: BaserowPermissions;
  created_on: string; // Datetime
  user_id: number;
  to_be_deleted: boolean;
}

export interface BaserowWorkspace {
  id: number;
  name: string;
  users: BaserowWorkspaceUser[];
  order: number;
  permissions: BaserowPermissions;
}

// Baserow uses the same property name for root and sub objects, hence the double "Filter"
export interface BaserowFiltersFilter {
  type: string;
  field: string;
  value: string | number; // The id of the row or the primary key value
}

export interface BaserowFilters {
  filter_type: "AND" | "OR";
  filters: BaserowFiltersFilter[];
  groups: BaserowFilters[];
}

export interface BaserowQueryFilter {
  rowId?: number;
  filter?: string;
  filters?: BaserowFilters;
  orderBy?: string;
  size?: string;
  batch?: boolean;
}

// If rowId is provided, Baserow returns a single result
export type BaserowQueryResult<
  Type,
  IsSingle extends boolean,
> = IsSingle extends true
  ? Type
  : {
      count: number;
      next: string; // Url
      previous: string; // Url
      results: Type[];
    };

export interface BaserowSession {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    first_name: string; // Unused
    language: string; // Unused
    // And other unused properties
  };
  // And other unused properties
}

export interface BaserowTable {
  id: number;
  order: string;
}

export interface BaserowForeignKeyRelation {
  id: number;
  value: string;
}

export interface BaserowSelectOption<Type> {
  id: number;
  value: Type;
  color: string; // Unused
}

export interface BaserowFile {
  image_height: number | null;
  image_width: number | null;
  is_image: boolean;
  mime_type:
    | "application/pdf"
    | "application/msword"
    | "application/vnd.ms-excel"
    | "application/vnd.ms-powerpoint"
    | "application/vnd.oasis.opendocument.text"
    | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    | "image/jpeg"
    | "image/png"
    | "image/svg+xml"
    | "text/csv"
    | "text/plain";
  thumbnails: BaserowThumbnail[];
  url: string;
  visible_name: string;
  // And other unused properties
}

export interface BaserowThumbnail {
  card_cover: {
    height: number;
    url: string;
    width: number;
  };
  small: {
    height: number;
    url: string;
    width: number;
  };
  tiny: {
    height: number;
    url: string;
    width: number;
  };
}
