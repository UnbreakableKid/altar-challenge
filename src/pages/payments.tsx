import { HStack, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Payments: NextPage = () => {
    const { data: Grid } = trpc.grid.generate.useQuery(undefined, {
        refetchInterval: 2000
    });
    const { data: Code } = trpc.code.generate.useQuery({ grid: Grid }, {
        enabled: !!Grid
    });


    return (
        <>
            <Head>
                <title>Grid</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Stack>
                <HStack>
                    <Text>Your code: {Code?.value}</Text>
                </HStack>
            </Stack>

        </>
    );
};

export default Payments;