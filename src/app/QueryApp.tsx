import queryConfig from "@configs/query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

const queryAppClient = new QueryClient(queryConfig);

export default function QueryApp({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <QueryClientProvider client={queryAppClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
