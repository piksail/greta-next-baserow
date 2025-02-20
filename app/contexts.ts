import { createContext } from "react";

export const UserContext = createContext({
  currentRegistration: null,
  preferredTags: ["dev", "infra"],
  preferredCategory: "tech",
  setCurrentRegistration: (courseId) => {},
});
