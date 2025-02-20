import { BaserowForeignKeyRelation, BaserowSelectOption, BaserowTable } from "./baserow";

interface BaserowLocation {
  address: string;
  city: string;
  zip_code: string;
  full_address: string;
}

export interface BaserowContactDetails extends BaserowTable, BaserowLocation {
  name: string;
  email: string;
  phone: string;
  facebook: string;
  position: string; // For document signature
  family_name: string; // For document signature
  given_name: string; // For document signature
}

export interface BaserowCourse extends BaserowTable {
  visible: boolean;
  name: string;
  start_date: string;
  end_date: string;
  registration_closing_date: string;
  address: string | null;
  seats: number;
  public: string;
  subject: string;
  tags: BaserowForeignKeyRelation[];
  body: string | null;
  image: BaserowFile[];
  documents: BaserowFile[];
  registrations: BaserowForeignKeyRelation[];
  non_member_allowed: boolean;
  organizers: BaserowForeignKeyRelation[];
  speakers: BaserowForeignKeyRelation[];
  status?: BaserowSelectOption<
    "canceled" | "closed" | "delivered" | "open" | "waiting_list"
  >;
  feedback_form: string;
}

export interface BaserowCourseTag extends BaserowTable {
  name: string;
}

export interface BaserowDepartment extends BaserowTable {
  name: string;
  profiles: BaserowForeignKeyRelation[]; // The manager
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

export interface BaserowLabellingApplication extends BaserowTable {
  email: string;
  profiles: BaserowForeignKeyRelation[]; // The applicant (who is a manager)
  application_date: string;
  institution: string;
  course_title: string;
  course_start_date: string;
  course_end_date: string;
  course_duration: number;
  course_address: string;
  range: BaserowSelectOption<"department" | "nation" | "region">;
  state: BaserowSelectOption<"approved" | "refused" | "waiting_approval">;
  documents: BaserowFile[];
  participant_number: number;
  course_delivered: boolean;
  note?: string;
}

export interface BaserowLabellingApplicationCsv
  extends Pick<
    BaserowLabellingApplication,
    | "email"
    | "institution"
    | "course_title"
    | "course_start_date"
    | "course_end_date"
    | "course_duration"
    | "course_address"
    | "participant_number"
    | "note"
  > {
  // Below properties are appended after parsing
  profiles?: number[];
  application_date?: string;
  state?: "waiting_approval";
}

export interface BaserowNationalUnion extends BaserowTable {
  name: string;
  profiles: BaserowForeignKeyRelation[]; // The manager
}

export interface BaserowPage extends BaserowTable {
  slug: string;
  title: string;
  body: string | null;
  image: BaserowFile[];
  documents: BaserowFile[];
  resources: BaserowForeignKeyRelation[]; // Allow one resource upload for users and pages can use it
}

export interface BaserowProfile extends BaserowTable, BaserowLocation {
  birth_year: string;
  email: string;
  family_name: string;
  given_name: string;
  departments: BaserowForeignKeyRelation[];
  gender: BaserowSelectOption<Gender>;
  mobile: string;
  national_unions: BaserowForeignKeyRelation[];
  profession: string;
  registrations: BaserowForeignKeyRelation[];
  role: BaserowSelectOption<ProfileRole>;
  state: BaserowSelectOption<"active" | "refused" | "waiting_validation">;
  labor_status: BaserowSelectOption<LaborStatus>;
  last_login_date: string;
}

export interface BaserowRegistration {
  id: number;
  email: string; // Baserow expects a primary-key, we could rely on both profiles and courses alone
  registration_date: string;
  profiles: BaserowForeignKeyRelation[];
  courses: BaserowForeignKeyRelation[];
  attendance_signed: boolean;
  institution: BaserowSelectOption<Institution>;
  state: BaserowSelectOption<
    "approved" | "refused" | "waiting_approval" | "waiting_list" | "withdrew"
  >;
  note?: string;
}

export interface BaserowResource extends BaserowTable {
  name: string;
  files: BaserowFile[];
  pages: BaserowForeignKeyRelation[];
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

// Enum types

export type AccountState = "active" | "waiting_validation" | "refused";

export type Gender = "F" | "H" | "NB";

export type Institution = "CFR" | "SD" | "SN";

export type LaborStatus = "public" | "private" | "retired";

export type ProfileRole = "administrator" | "manager" | "member";

// Input types

type BatchApplyToLabellingInputItem = BaserowLabellingApplicationCsv & {
  application_date: string;
  profiles: number[];
  state: "waiting_approval"; // Force default state
};

export interface BatchApplyToLabellingInputs {
  // Keep snake_case naming and string type as it comes from .csv files
  items: BatchApplyToLabellingInputItem[];
}

export interface LogInInputs {
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface ProfileInputs {
  // Keep the types raw as they come from HTML inputs
  // Optional fields are still required for member profiles
  // All fields are optional to allow lastLoginDate update through the same request
  address?: string;
  birthYear?: number;
  city?: string;
  department?: number;
  familyName?: string;
  gender?: string;
  givenName?: string;
  laborStatus?: string;
  lastLoginDate?: string;
  mobile?: string;
  nationalUnion?: number;
  profession?: string;
  role?: string;
  zipCode?: string;
}

export interface RegisterToCourseInputs {
  email: string;
  givenName: string;
  familyName: string;
  courseId: number;
}

export interface RegisterMemberToCourseInputs {
  email: string;
  profiles: number[];
  courses: number[];
}

export interface RegisterInputs
  extends ProfileInputs,
    Omit<LogInInputs, "isAdmin"> {
  state: "active" | "waiting_validation";
}

export interface SendContactEmailInputs {
  email: string;
  subject: string;
  body: string;
}

export interface SendTooManySameDepartmentRegistrationEmailInputs {
  subject: string;
  body: string;
}

export interface AcceptWorkspaceInvitationInputs {
  workspaceInvitationId: number;
}

export interface CreateAccountInputs
  extends Omit<LogInInputs, "isAdmin">,
    Pick<ProfileInputs, "familyName" | "givenName"> {}

export interface CreateProfileInputs extends ProfileInputs {
  email: string;
  userId?: number;
}

export interface CreateWorkspaceInvitationInputs {
  email: string;
  workspaceId: number;
}

export interface DeleteWorkspaceInvitationInputs {
  workspaceInvitationId: number;
}

export interface UpdatePasswordInputs {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateProfileInputs extends ProfileInputs {
  rowId: number;
}

export interface UpdateRegistrationInputs {
  rowId: number;
  attendanceSigned?: boolean;
  state?: string;
  note?: string;
}

export interface RequestPasswordResetInputs {
  email: string;
}

export interface ResetPasswordInputs {
  token: string;
  password: string;
}

export interface UnregisterFromCourseInputs {
  rowId: number;
}
