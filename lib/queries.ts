import { useQuery } from "@tanstack/react-query";
import { getBaserowTableUrl } from "@/utils/baserow";
import {
  BaserowCourse,
  BaserowCourseTag,
  BaserowProfile,
  BaserowRegistration,
} from "@/types";
import axios from "./axios";
import { BaserowQueryFilter, BaserowQueryResult } from "@/types/baserow";

/**
 * Get the list of tags that courses can have.
 */
const getCourseTags = async <IsSingle extends boolean>(
  queryFilter: BaserowQueryFilter
) => {
  const { data } = await axios.get<
    BaserowQueryResult<BaserowCourseTag, IsSingle>
  >(getBaserowTableUrl("course_tags", queryFilter));
  return data;
};

export const useGetCourseTagsQuery = <IsSingle extends boolean>(
  queryFilter: BaserowQueryFilter = {}
) =>
  useQuery({
    queryKey: ["courseTags", queryFilter.filters],
    queryFn: () => getCourseTags<IsSingle>(queryFilter),
  });

/**
 * Get the list of courses.
 */
export const getCourses = async <IsSingle extends boolean>(
  queryFilter: BaserowQueryFilter
) => {
  const { data } = await axios.get<BaserowQueryResult<BaserowCourse, IsSingle>>(
    getBaserowTableUrl("courses", queryFilter)
  );
  return data;
};

export const useGetCoursesQuery = <IsSingle extends boolean>(
  queryFilter: BaserowQueryFilter = {},
  { enabled }: { enabled: boolean } = { enabled: true }
) =>
  useQuery({
    queryKey: ["courses", queryFilter.rowId, queryFilter.filters],
    queryFn: () => getCourses<IsSingle>(queryFilter),
    enabled,
  });

/**
 * Get profiles.
 */
export const getProfiles = async <IsSingle extends boolean>(
  queryFilter: BaserowQueryFilter
) => {
  const { data } = await axios.get<
    BaserowQueryResult<BaserowProfile, IsSingle>
>(getBaserowTableUrl("profiles", queryFilter));
  return data;
};

export const useGetProfilesQuery = <IsSingle extends boolean>(
  queryFilter: BaserowQueryFilter = {},
  { enabled }: { enabled: boolean } = { enabled: true }
) =>
  useQuery({
    queryKey: ["profiles", queryFilter.rowId, queryFilter.filters],
    queryFn: () => getProfiles<IsSingle>(queryFilter),
    enabled,
  });

/**
 * Get the list of registrations to courses.
 */
export const getRegistrations = async <IsSingle extends boolean>(
  queryFilter: BaserowQueryFilter
) => {
  const { data } = await axios.get<
    BaserowQueryResult<BaserowRegistration, IsSingle>
  >(getBaserowTableUrl("registrations", queryFilter));
  return data;
};

export const useGetRegistrationsQuery = <IsSingle extends boolean>(
  queryFilter: BaserowQueryFilter = {},
  { enabled }: { enabled: boolean } = { enabled: true }
) =>
  useQuery({
    queryKey: [
      "registrations",
      queryFilter.rowId,
      queryFilter.filters,
      queryFilter.filter,
    ],
    queryFn: () => getRegistrations<IsSingle>(queryFilter),
    enabled,
  });
