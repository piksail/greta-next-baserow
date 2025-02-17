import { createContext } from 'react';

export const UserContext = createContext({
    preferredTags: ["dev", "infra"],
    preferredCategory: "tech"
});
