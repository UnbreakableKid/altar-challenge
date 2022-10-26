import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { Center, Spinner, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import CustomGrid from "../components/CustomGrid";
import Header from "../components/Header";
import CodeBox from "../components/CodeBox";
import { useAtom } from "jotai";
import { codeState, generationState, gridState, inputValueState } from "../utils/jotai";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useAtom(inputValueState);
  const [inputState, setInputState] = useState(true);
  const [generateGrid, setGenerateGrid] = useAtom(generationState)
  const [grid, setGrid] = useAtom(gridState)
  const [code, setCode] = useAtom(codeState)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : e.target.value;
    setInputValue(value);
    setInputState(false);
    setTimeout(() => {
      setInputState(true);
    }, 4000);
  }

  return (
    <>
      <Head>
        <title>Grid</title>
        <meta name="description" content="Generate random 10x10 grids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack>
        <Header generateGrid={generateGrid} handleInputChange={handleInputChange} inputState={inputState} inputValue={inputValue} setGenerateGrid={setGenerateGrid} />
        {generateGrid === 'disabled' ?
          <Center>
            <Text>Click on the button to generate a grid</Text>
          </Center>
          :
          <>
            {grid.length === 0 ? <Center> <Spinner /></Center> :
              <>
                <CustomGrid code={grid?.split('')} />
                <Stack >
                  <Center>
                    <CodeBox Code={code} isDevEnv generateGrid={generateGrid} />
                  </Center>
                </Stack>
              </>
            }
          </>
        }
      </Stack>
    </>
  );
};

export default Home;