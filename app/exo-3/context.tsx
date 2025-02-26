// https://stackoverflow.com/questions/73513562/typescript-usecontext-error-argument-of-type-never-is-not-assignable-to

import { createContext, useState } from "react";

export const PreferredTagsContext = createContext<{
  preferredTags: string[];
  setPreferredTags: (value: string[]) => void;
}>({
  preferredTags: [],
  setPreferredTags: () => {},
});

export function PreferredTagsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [preferredTags, setPreferredTags] = useState<string[]>([]);

  return (
    <PreferredTagsContext.Provider value={{ preferredTags, setPreferredTags }}>
      {children}
    </PreferredTagsContext.Provider>
  );
}
