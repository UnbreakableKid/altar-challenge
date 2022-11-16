import { Center, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import GenerationStatus from './GenerationStatus';

interface CodeBoxProps {
    Code: {
        value: string | undefined;
        firstChar?: string | undefined;
        secondChar?: string | undefined;
        seconds?: number | undefined;
        firstVal?: number | undefined;
        lastVal?: number | undefined;
    } | undefined
    isDevEnv: boolean;
    generateGrid: "generate" | "pause" | "disabled";
}

const CodeBox = ({ Code, isDevEnv, generateGrid }: CodeBoxProps) => {
    if (generateGrid === 'disabled') return <Text>Please Generate a Grid</Text>;
    return (
        <VStack alignSelf={'center'} alignContent={'center'} alignItems={'center'}>
            <GenerationStatus generateGrid={generateGrid} />
            <Center>
                <VStack boxShadow={'dark-lg'} rounded='3xl' w={150} h='full' p={5}>
                    <Text>Your code: {Code?.value}</Text>
                    {/* if dev environment print first char and second char also */}
                    {isDevEnv && (
                        <>
                            <Text>First char: {Code?.firstChar}</Text>
                            <Text>Second char: {Code?.secondChar}</Text>
                            <Text>Seconds: {Code?.seconds}</Text>
                            <Text>FirstVal: {Code?.firstVal}</Text>
                            <Text>Second: {Code?.lastVal}</Text>
                        </>
                    )}
                </VStack>
            </Center>
        </VStack>
    );
}
export default CodeBox;