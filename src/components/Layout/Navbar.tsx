import { Button, chakra, Flex, HStack, Icon, Link, Text, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { BsCurrencyDollar, BsHouse, BsMoon, BsSun } from 'react-icons/bs';



const Navbar = () => {
    const bg = useColorModeValue("white", "gray.800");
    const { colorMode, toggleColorMode } = useColorMode();
    const { data: sessionData } = useSession();

    return (<>
        <chakra.header
            bg={bg}
            w="full"
            px={{
                base: 2,
                sm: 4,
            }}
            py={4}
            shadow="md"
        >
            <HStack justifyContent="space-between" mx="auto">
                <HStack
                    spacing={10}
                    mr={1}
                    color="brand.500"
                >
                    <Text fontSize="xl" fontWeight="bold" ml="2">
                        Grid Generator
                    </Text>
                    <NextLink href="/" passHref >
                        <Button variant={'ghost'} leftIcon={<BsHouse />}>Grid Page</Button>
                    </NextLink>
                    {sessionData?.user?.email &&
                        <NextLink href="/payments" passHref>
                            <Button leftIcon={<BsCurrencyDollar />} variant="ghost">Payments Page</Button>
                        </NextLink>
                    }
                </HStack>
                <HStack>
                    {sessionData && <Text>Hi {sessionData.user?.name} 👋</Text>}
                    <Button
                        onClick={sessionData ? () => signOut() : () => signIn()}
                        variant="ghost"
                    >
                        {sessionData ? 'Sign out' : 'Sign in'}
                    </Button>
                    <Button variant={'ghost'} onClick={toggleColorMode}> {colorMode === 'light' ? <Icon as={BsMoon} /> : <Icon as={BsSun} />}</Button>
                </HStack>
            </HStack>
        </chakra.header>

    </>);
}
export default Navbar;