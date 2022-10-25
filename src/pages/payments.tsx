import { Button, useToast, Center, FormControl, FormErrorMessage, Text, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useAtom } from "jotai";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import CodeBox from "../components/CodeBox";
import { generationState, gridState, codeState } from "../utils/jotai";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { BsPlus, BsTrash } from "react-icons/bs";
import { useState } from "react";
import CustomGrid from "../components/CustomGrid";

const Payments: NextPage = () => {

    const [generateGrid, setGenerateGrid] = useAtom(generationState)
    const toast = useToast();
    const [toDelete, setToDelete] = useState('');
    const [grid, setGrid] = useAtom(gridState)
    const [code, setCode] = useAtom(codeState)
    const { data: Grid } = trpc.grid.generate.useQuery(undefined, {
        refetchInterval: 2000, enabled: generateGrid === 'generate', onSuccess: (data) => {
            setGrid(data)
        }
    });
    const { } = trpc.code.generate.useQuery({ grid: Grid }, {
        enabled: !!Grid && generateGrid === 'generate', onSuccess: (data) => {
            const { value, firstChar, firstVal, lastVal, grid, secondChar, seconds } = data;
            setCode({ value: value, firstChar: firstChar!, secondChar: secondChar!, firstVal: firstVal!, lastVal: lastVal!, seconds: seconds!, grid: grid! })
        }
    });

    const session = useSession();

    const { data: UserPayments, refetch, isLoading: LoadingPayments } = trpc.user.getPayments.useQuery({ userId: session.data!.user!.id });

    const { mutate, isLoading } = trpc.user.createPayment.useMutation({
        onSuccess: () => {
            refetch();
            toast({
                title: "Payment created.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
        }
    });
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { mutate: DeletePayment, isLoading: isLoadingDelete } = trpc.user.deletePayment.useMutation({
        onSuccess: async () => {
            await refetch();
            onClose();
            toast({
                title: "Payment deleted.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
        }
    })

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    function onSubmit(values: any) {
        mutate({ code: code.value, grid, amount: values.amount, payment: values.payment });
    }

    function onOpenModal(paymentId: string) {
        onOpen();
        setToDelete(paymentId);
    }

    return (
        <>
            <Head>
                <title>Payments</title>
                <meta name="description" content="Payment page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Stack spacing={10}>
                {!grid || !code ? <Center p={10}><Text as={"h1"}>Generate a Grid first to add to the table</Text></Center> :
                    <>
                        <CodeBox Code={code} generateGrid={generateGrid} isDevEnv={false} />
                        <HStack as={'form'} onSubmit={handleSubmit(onSubmit)} p={10} w={"container.sm"} mt="auto">
                            <FormControl >
                                <HStack>
                                    <Stack>
                                        <FormLabel htmlFor='payment'>Payment Name</FormLabel>
                                        <Input
                                            id='payment'
                                            placeholder='Name'
                                            {...register('payment')}
                                            isInvalid={!!errors.payment}
                                            isRequired
                                        />
                                    </Stack>
                                    <Stack>
                                        <FormLabel htmlFor='amount'>Amount</FormLabel>
                                        <Input
                                            id='amount'
                                            {...register('amount', {
                                                valueAsNumber: true,
                                            })}
                                            type='number'
                                            placeholder="0"
                                            isRequired
                                            isInvalid={!!errors.amount}
                                        />
                                    </Stack>
                                    <Button leftIcon={<BsPlus />} mt={4} colorScheme='teal' isLoading={isLoading} type='submit' w={100} alignSelf={'end'}>
                                        Add
                                    </Button>
                                </HStack>
                                <FormErrorMessage>
                                    <ErrorMessage errors={errors} name="payment" />
                                </FormErrorMessage>
                            </FormControl>
                        </HStack>
                    </>
                }
                <Center>
                    {LoadingPayments ? <Spinner /> : (
                        UserPayments && UserPayments.length > 0 && (
                            <TableContainer w={'fit-content'}>
                                <Table variant='simple'>
                                    <TableCaption >Your Payments</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th isNumeric>Amount</Th>
                                            <Th isNumeric>Code</Th>
                                            <Th><Center>
                                                Grid
                                            </Center>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {UserPayments?.map((payment) => (
                                            <Tr key={payment.id}>
                                                <Td>{payment.name}</Td>
                                                <Td isNumeric>{payment.amount}</Td>
                                                <Td isNumeric scale={0.5}>{payment.code} </Td>
                                                <Td>
                                                    <CustomGrid code={payment.grid.split('')} size={'container'} />
                                                </Td>
                                                <Td><Button isDisabled={isLoadingDelete} leftIcon={<BsTrash />} variant={'solid'} color='red.200' onClick={() => onOpenModal(payment.id)} >Delete Payment</Button></Td>
                                            </Tr>
                                        ))}
                                        {isLoading &&
                                            <Center>
                                                <Spinner />
                                            </Center>
                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        ))}
                </Center>
            </Stack >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' color={'red.300'} isLoading={isLoadingDelete} onClick={() => DeletePayment({ paymentId: toDelete })}>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Payments;

export const getServerSideProps: GetServerSideProps = async (
    context
) => {
    const session = await getServerAuthSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
}
