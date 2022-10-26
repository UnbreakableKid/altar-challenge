import { Stack, Input, Icon, Button, Text, Flex } from '@chakra-ui/react';
import { SetStateAction } from 'jotai';
import React from 'react'
import { BsClock } from 'react-icons/bs';

interface HeaderProps {
    generateGrid: "generate" | "pause" | "disabled";
    setGenerateGrid: (update: SetStateAction<"generate" | "pause" | "disabled">) => void;
    inputValue: string | null;
    inputState: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = ({ generateGrid, setGenerateGrid, inputValue, inputState, handleInputChange }: HeaderProps) => {
    return (<>
        <Flex justifyContent={'space-between'} py={5} px={100} alignItems="center">
            <Stack spacing={1}>
                <Text mb='8px'>Character</Text>
                <Input
                    placeholder='Insert a character'
                    size='sm'
                    borderRadius={'50'}
                    value={inputValue ? inputValue : ''}
                    onChange={(e) => handleInputChange(e)}
                    isDisabled={!inputState}
                />
            </Stack>
            <Icon as={BsClock} w={8} h={8} />
            {generateGrid === 'generate' &&
                <Button onClick={() => setGenerateGrid('pause')} w={185}>Pause Generating</Button>
            }
            {generateGrid === 'pause' &&
                <Button onClick={() => setGenerateGrid('generate')} w={185}>Resume Generating</Button>
            }
            {generateGrid === 'disabled' &&
                <Button onClick={() => setGenerateGrid('generate')} w={185}>Generate Grid</Button>
            }
        </Flex>
    </>);
}
export default Header;