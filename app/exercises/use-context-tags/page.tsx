"use client";

import UserPreferredTags from "./components/user-preferred-tags";
import { PreferredTagsProvider } from "./context";
import UserContextReader from "./components/user-context-reader";

export default function ExerciseUseContextTags() {
  return (
    <PreferredTagsProvider>
      <UserContextReader />
      <UserPreferredTags />
    </PreferredTagsProvider>
  );
}
