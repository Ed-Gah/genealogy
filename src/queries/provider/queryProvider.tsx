"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
    {children}
    <ReactQueryDevtools initialIsOpen={true} position="bottom"  />
    </QueryClientProvider>)
  
}

export default QueryProvider;
