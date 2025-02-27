// https://react.dev/learn/scaling-up-with-reducer-and-context

import { createContext, useContext, useReducer } from "react";

export const PreferredTagsContext = createContext<string[]>([]);

// TODO typing
export const PreferredTagsDispatchContext = createContext({});

export function usePreferredTags() {
  return useContext(PreferredTagsContext);
}

export function usePreferredTagsDispatch() {
  return useContext(PreferredTagsDispatchContext);
}

export function PreferredTagsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [preferredTags, dispatch] = useReducer(preferredTagsReducer, []);

  return (
    <PreferredTagsContext.Provider value={preferredTags}>
      <PreferredTagsDispatchContext.Provider value={dispatch}>
        {children}
      </PreferredTagsDispatchContext.Provider>
    </PreferredTagsContext.Provider>
  );
}

function preferredTagsReducer(
  tags: string[],
  action: { type: "added" | "deleted" | "emptied"; tag: string },
) {
  switch (action.type) {
    case "added": {
      return [...tags, action.tag];
    }
    case "deleted": {
      return tags.filter((tag) => tag !== action.tag);
    }
    case "emptied": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
