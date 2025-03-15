import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";

export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
