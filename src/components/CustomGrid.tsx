import { SimpleGrid, Code, Box, Center } from '@chakra-ui/react';
import React from 'react'

interface CustomGridProps {
    code: string[] | undefined;
    isDebugTable?: boolean;
}

const CustomGrid = ({ code, isDebugTable = false }: CustomGridProps) => {
    return (<Center>
        <SimpleGrid columns={10} border={'1px'} w={isDebugTable ? 'container.md' : 'container.lg'} h={'fit-content'} m={10}>
            {code?.map((char, i) => (
                <Box bg={"white.100"} border={"1px"} boxShadow='sm' borderColor={"gray.500"} p={15} key={i} textAlign={'center'} boxSize={'full'} >{char}</Box>
            ))}
        </SimpleGrid>
    </Center>);
}
export default CustomGrid;