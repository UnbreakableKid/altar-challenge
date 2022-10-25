import { SimpleGrid, Code, Box, Center } from '@chakra-ui/react';
import React from 'react'

interface CustomGridProps {
    code: string[] | undefined;
    isDebugTable?: boolean;
    size?: string;
}

const CustomGrid = ({ code, isDebugTable = false, size }: CustomGridProps) => {
    return (<Center>
        <SimpleGrid columns={10} border={'1px'} w={size ?? isDebugTable ? 'container.sm' : 'container.lg'} h={'container'} m={10}>
            {code?.map((char, i) => (
                <Box bg={"white.100"} border={"1px"} boxShadow='sm' borderColor={"gray.500"} p={15} key={i} textAlign={'center'} boxSize={'full'} >{char}</Box>
            ))}
        </SimpleGrid>
    </Center>);
}
export default CustomGrid;