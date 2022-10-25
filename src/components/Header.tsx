import { HStack, Stack, Input, Icon, Button, Text } from '@chakra-ui/react';
import React from 'react'
import { BsClock } from 'react-icons/bs';

interface HeaderProps {
    generateGrid: "generate" | "pause" | "disabled";
    setGenerateGrid: React.Dispatch<React.SetStateAction<"generate" | "pause" | "disabled">>;
    inputValue: string;
    inputState: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = ({ generateGrid, setGenerateGrid, inputValue, inputState, handleInputChange }: HeaderProps) => {
    return (<>
        <HStack justifyContent={'space-between'} p={5}>
            <Stack spacing={1}>
                <Text mb='8px'>Character</Text>
                <Input
                    placeholder='Here is a sample placeholder'
                    size='sm'
                    borderRadius={'50'}
                    value={inputValue}
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
        </HStack>
    </>);
}
export default Header;