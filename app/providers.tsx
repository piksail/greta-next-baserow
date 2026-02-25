"use client";

import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "./contexts";

const queryClient = new QueryClient();

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentRegistration, setCurrentRegistration] = useState<number | null>(
    null,
  );
  const value = useMemo(
    () => ({
      currentRegistration,
      setCurrentRegistration,
      preferredTags: ["dev", "infra"],
      preferredCategory: "tech",
    }),
    [currentRegistration],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </QueryClientProvider>
  );
}
