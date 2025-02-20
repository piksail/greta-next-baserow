"use client";

import { useContext } from "react";
import { UserContext } from "../contexts";

export default function CourseValidation() {
  const { currentRegistration } = useContext(UserContext);

  return <div>{currentRegistration}</div>;
}
