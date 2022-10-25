import { Button, chakra, Flex, HStack, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';



const Navbar = ({ }: NavbarProps) => {
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
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
            <Flex alignItems="center" justifyContent="space-between" mx="auto">
                <Flex>
                    <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                        Grid Generator
                    </chakra.h1>
                </Flex>
                <HStack display="flex" alignItems="center" spacing={1}>
                    <HStack
                        spacing={1}
                        mr={1}
                        color="brand.500"
                    >
                        <NextLink href="/" passHref>
                            <Button variant="ghost">Grid</Button>
                        </NextLink>
                        <NextLink href="/payments" passHref>
                            <Button variant="ghost">Payments</Button>
                        </NextLink>
                    </HStack>
                </HStack>
                <HStack>

                    <Button onClick={toggleColorMode}> Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
                    <Button
                        onClick={sessionData ? () => signOut() : () => signIn()}
                    >
                        {sessionData ? 'Sign out' : 'Sign in'}
                    </Button>
                </HStack>
            </Flex>
        </chakra.header>

    </>);
}
export default Navbar;