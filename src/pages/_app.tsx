// src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { ReactQueryDevtools, } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";


const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);
