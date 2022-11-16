import { HStack, Icon, Text } from "@chakra-ui/react";
import { VscCircleFilled } from "react-icons/vsc";

interface GenerationStatusProps {
    generateGrid: "generate" | "pause" | "disabled";
}

const GenerationStatus = ({ generateGrid }: GenerationStatusProps) => {
    return (<>
        <HStack spacing={1} p={2}>
            {generateGrid === 'generate' ?
                <>
                    <Icon as={VscCircleFilled} color="red" />
                    <Text fontWeight={'bold'}>Live</Text>
                </>
                :
                <>
                    <Icon as={VscCircleFilled} color="green" />
                    <Text fontWeight={'bold'}>Paused</Text>
                </>
            }
        </HStack>
    </>);
}
export default GenerationStatus;