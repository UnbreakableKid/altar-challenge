import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Button, Center, HStack, Icon, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { VscCircleFilled } from "react-icons/vsc";
import { useState } from "react";
import { BsClock } from "react-icons/bs";
import GenerationStatus from "../components/GenerationStatus";
import CustomGrid from "../components/CustomGrid";
import Header from "../components/Header";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputState, setInputState] = useState(true);
  const [generateGrid, setGenerateGrid] = useState<"generate" | 'pause' | 'disabled'>('disabled');
  const { data: Grid } = trpc.grid.generate.useQuery(undefined, {
    refetchInterval: 2000, enabled: generateGrid === 'generate'
  });
  const { data: Code, refetch } = trpc.code.generate.useQuery({ character: inputValue, grid: Grid }, {
    enabled: !!Grid && generateGrid === 'generate', onSuccess: () => {
      if (inputState && inputValue !== '') {
        setInputState(false);
        //wait 4 seconds before allowing the user to generate another code
        setTimeout(() => {
          setInputState(true);

        }, 4000);
      }
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    refetch();
  }


  return (
    <>
      <Head>
        <title>Grid</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack>
        <Header generateGrid={generateGrid} handleInputChange={handleInputChange} inputState={inputState} inputValue={inputValue} setGenerateGrid={setGenerateGrid} />
        {generateGrid !== 'disabled' &&
          <>
            <CustomGrid code={Grid?.split('')} />
            <Stack >
              <Center>
                <Stack>
                  <GenerationStatus generateGrid={generateGrid} />
                  <Box boxShadow={'lg'} rounded='3xl' w={150} h='full' p={5}>
                    <Text>Your code: {Code?.value}</Text>
                    {/* if dev environment print first char and second char also */}
                    {process.env.NODE_ENV === 'development' && (
                      <>
                        <Text>First char: {Code?.firstChar}</Text>
                        <Text>Second char: {Code?.secondChar}</Text>
                        <Text>Seconds: {Code?.seconds}</Text>
                        <Text>FirstVal {Code?.firstVal}</Text>
                        <Text>Second: {Code?.lastVal}</Text>
                      </>
                    )}
                  </Box>
                </Stack>
              </Center>
              {process.env.NODE_ENV === 'development' && inputValue !== '' && (
                <CustomGrid code={Code?.grid?.split('')} isDebugTable />
              )}
            </Stack>
          </>
        }
      </Stack>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      <button
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};