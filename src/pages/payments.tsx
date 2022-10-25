import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Button, Center, HStack, Icon, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { VscCircleFilled } from "react-icons/vsc";
import { useState } from "react";
import { BsClock } from "react-icons/bs";

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

        </>
    );
};

export default Payments;